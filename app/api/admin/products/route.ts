import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(5, 'Description is required'),
  price: z.number().min(0.01, 'Price must be positive'),
  fragrance: z.string().optional(),
  stock: z.number().min(0),
  imageUrl: z.string().min(1, 'Product image is required'),
});

export async function GET() {
  try {
    const products = await db.product.findMany({
      include: { images: true },
      orderBy: { id: 'asc' },
    });
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = productSchema.parse(body);

    // Create product
    const product = await db.product.create({
      data: {
        title: validatedData.title,
        slug: validatedData.slug,
        description: validatedData.description,
        price: validatedData.price,
        fragrance: validatedData.fragrance || null,
        stock: validatedData.stock,
      },
    });

    // Create primary product image
    await db.productImage.create({
      data: {
        url: validatedData.imageUrl,
        productId: product.id,
      },
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error('Product creation error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

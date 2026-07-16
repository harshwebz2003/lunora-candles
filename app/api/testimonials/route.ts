import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const testimonialSchema = z.object({
  author: z.string().min(1, 'Name is required'),
  content: z.string().min(5, 'Review must be at least 5 characters long'),
  rating: z.number().min(1).max(5),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = testimonialSchema.parse(body);

    const testimonial = await db.testimonial.create({
      data: {
        author: validatedData.author,
        content: validatedData.content,
        rating: validatedData.rating,
        approved: false, // Must be approved by admin
      },
    });

    return NextResponse.json({ success: true, testimonial }, { status: 201 });
  } catch (error) {
    console.error('Testimonial submission error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

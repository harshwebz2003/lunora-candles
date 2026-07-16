import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

async function main() {
  console.log('Seeding database...');

  // 1. Clear database
  await prisma.siteSetting.deleteMany({});
  await prisma.inquiry.deleteMany({});
  await prisma.galleryImage.deleteMany({});
  await prisma.testimonial.deleteMany({});
  await prisma.blogPost.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. Create Users
  const adminPassword = hashPassword('admin123');
  const admin = await prisma.user.create({
    data: {
      email: 'harshwebz2003@gmail.com',
      name: 'Harshana (Admin)',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  const userPassword = hashPassword('user123');
  await prisma.user.create({
    data: {
      email: 'user@example.com',
      name: 'John Doe',
      password: userPassword,
      role: 'USER',
    },
  });

  console.log('Created users...');

  // 3. Create Products with actual assets
  const productsData = [
    {
      title: 'Lavender Breeze',
      slug: 'lavender-breeze',
      description: 'Indulge in a sense of serenity with our premium French Lavender soy candle. Infused with natural essential oils of calming lavender, chamomile, and soft white musk, this candle is designed to melt away stress and invite pure relaxation into your home.',
      price: 25.00,
      fragrance: 'Calming French Lavender, Chamomile, White Musk',
      stock: 45,
      images: ['/assets/552807669_1339286778208115_6571929007844017528_n.jpg'],
    },
    {
      title: 'Vanilla Amberwood',
      slug: 'vanilla-amberwood',
      description: 'A cozy, rich blend of Madagascar vanilla beans, warm golden amber, and toasted sandalwood. Creating a warm, sweet, and slightly woody atmosphere, this candle is the perfect companion for quiet evenings and comfortable reading sessions.',
      price: 28.00,
      fragrance: 'Madagascar Vanilla, Golden Amber, Sandalwood',
      stock: 30,
      images: ['/assets/553805204_1339286811541445_7449795635161896691_n.jpg'],
    },
    {
      title: 'Cinnamon Spice',
      slug: 'cinnamon-spice',
      description: 'Fill your space with the mouthwatering, inviting aroma of fresh cinnamon sticks, ground cloves, and a touch of sweet nutmeg. Ideal for bringing a festive, warm, and cozy holiday vibe to any room, any time of the year.',
      price: 24.00,
      fragrance: 'Cinnamon Bark, Ground Clove, Nutmeg',
      stock: 25,
      images: ['/assets/554797110_1339286851541441_8366442550545946149_n.jpg'],
    },
    {
      title: 'Sage & Sea Salt',
      slug: 'sage-sea-salt',
      description: 'Earthy, fresh, and complex. This signature scent blends mineral notes of rugged sea salt with the herbal warmth of woodsy sage, dry moss, and driftwood. Bring the wild Sri Lankan coastline indoors.',
      price: 26.50,
      fragrance: 'Sea Salt, Sage, Ambrette Seed, Driftwood',
      stock: 50,
      images: ['/assets/631734611_17911290213317246_3639787322669815310_n.jpg'],
    },
    {
      title: 'Blush Rose',
      slug: 'blush-rose',
      description: 'Capture the timeless essence of a blooming English rose garden. Infused with soft geranium, dewy green leaves, and delicate rose petals, this light and romantic floral scent creates an elegant ambience.',
      price: 27.00,
      fragrance: 'Rose Petals, Geranium, Green Ivy',
      stock: 35,
      images: ['/assets/631825283_17911451328317246_8620884724096749501_n.jpg'],
    },
    {
      title: 'Sandalwood & Honey',
      slug: 'sandalwood-honey',
      description: 'An exotic, creamy luxury fragrance featuring rich, warm Indian sandalwood sweetened with notes of organic wild honey, spun sugar, and dark patchouli. Perfect for meditative spaces and luxurious baths.',
      price: 29.50,
      fragrance: 'Indian Sandalwood, Wild Honey, Patchouli',
      stock: 20,
      images: ['/assets/632129514_17911290222317246_1212543984744105027_n.jpg'],
    },
    {
      title: 'Eucalyptus Mint',
      slug: 'eucalyptus-mint',
      description: 'An invigorating, fresh fragrance that energizes the mind and clears the senses. Combining therapeutic eucalyptus leaves, crushed garden mint, and a touch of zesty lemon peel, it creates a spa-like freshness.',
      price: 25.50,
      fragrance: 'Eucalyptus, Peppermint, Spearmint, Lemon Peel',
      stock: 40,
      images: ['/assets/632156505_17911290231317246_2806134531291435844_n.jpg'],
    },
  ];

  for (const prod of productsData) {
    const product = await prisma.product.create({
      data: {
        title: prod.title,
        slug: prod.slug,
        description: prod.description,
        price: prod.price,
        fragrance: prod.fragrance,
        stock: prod.stock,
      },
    });

    for (const imgUrl of prod.images) {
      await prisma.productImage.create({
        data: {
          url: imgUrl,
          productId: product.id,
        },
      });
    }
  }

  console.log('Created products...');

  // 4. Create Blog Posts
  await prisma.blogPost.create({
    data: {
      title: 'How to Get the Perfect Burn: A Candle Care Guide',
      slug: 'perfect-burn-candle-care-guide',
      content: JSON.stringify([
        { type: 'paragraph', children: 'Did you know that candles have memory? To get the most out of your handmade soy candles and prevent tunneling, follow our complete guide to proper candle burning.' },
        { type: 'heading', level: 2, children: 'The First Burn is Everything' },
        { type: 'paragraph', children: 'The first time you light your candle, let it burn until the pool of melted wax reaches the very edges of the jar. This usually takes 2-3 hours and sets the candle memory, ensuring an even burn down to the bottom.' },
        { type: 'heading', level: 2, children: 'Always Trim Your Wick' },
        { type: 'paragraph', children: 'Trim the cotton or wood wick to 1/4 inch before every single burn. This prevents smoking, keeps the flame under control, and maximizes the fragrance release.' }
      ]),
      authorId: admin.id,
      publishedAt: new Date(),
    },
  });

  await prisma.blogPost.create({
    data: {
      title: 'The Psychology of Scent: Choosing the Right Fragrance for Your Space',
      slug: 'psychology-of-scent-choosing-fragrance',
      content: JSON.stringify([
        { type: 'paragraph', children: 'Fragrance has the unique ability to trigger memories and shift our moods. In this post, we explore how different scents impact your space and mind.' },
        { type: 'heading', level: 2, children: 'Relaxation: Lavender & Chamomile' },
        { type: 'paragraph', children: 'For bedrooms and quiet corners, lavender-based scents slow the heart rate and calm the nervous system, helping you transition into a restful night.' },
        { type: 'heading', level: 2, children: 'Productivity & Focus: Eucalyptus & Peppermint' },
        { type: 'paragraph', children: 'For workspaces, crisp mint and clinical eucalyptus improve cognitive performance and alertness, keeping you focused.' }
      ]),
      authorId: admin.id,
      publishedAt: new Date(),
    },
  });

  console.log('Created blogs...');

  // 5. Create Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        author: 'Sarah Perera',
        content: 'Lunora Candles are absolute luxury! The Lavender Breeze candle burns so clean and fills my entire living room with a relaxing fragrance. The branding and packaging are beautiful!',
        rating: 5,
        approved: true,
      },
      {
        author: 'Dilan Silva',
        content: 'I ordered custom candles for our wedding favors in Galle. The team was extremely accommodating, and our guests absolutely loved the customized fragrance and design.',
        rating: 5,
        approved: true,
      },
      {
        author: 'Emily Watson',
        content: 'The Vanilla Amberwood scent is perfect. Cozy and not overpowering at all. I love the amber jar aesthetic, it fits my interior perfectly.',
        rating: 5,
        approved: true,
      },
      {
        author: 'Ruwan Kumara',
        content: 'Fast shipping and great customer support. Highly recommend the Sage & Sea Salt!',
        rating: 4,
        approved: true,
      },
    ],
  });

  console.log('Created testimonials...');

  // 6. Create Gallery Images
  await prisma.galleryImage.createMany({
    data: [
      { url: '/assets/552807669_1339286778208115_6571929007844017528_n.jpg', altText: 'Handcrafting soy candles in our Galle studio' },
      { url: '/assets/553805204_1339286811541445_7449795635161896691_n.jpg', altText: 'Pouring hot wax infused with natural lavender oils' },
      { url: '/assets/554797110_1339286851541441_8366442550545946149_n.jpg', altText: 'Our natural wooden wicks cracking softly' },
      { url: '/assets/631734611_17911290213317246_3639787322669815310_n.jpg', altText: 'Premium amber glass jar collection packaging' },
    ],
  });

  console.log('Created gallery...');

  // 7. Create Site Settings
  await prisma.siteSetting.createMany({
    data: [
      { key: 'phone', value: '+94 76 941 0682' },
      { key: 'email', value: 'lunoracandles.info@gmail.com' },
      { key: 'address', value: 'No.470/B, Matara Rd, Dowata, Galle, Sri Lanka 80000' },
      { key: 'facebook', value: 'https://facebook.com/lunoracandles' },
      { key: 'instagram', value: 'https://instagram.com/lunoracandles' },
      { key: 'siteName', value: 'Lunora Candles' },
      { key: 'siteDescription', value: 'Premium handcrafted scented soy candles from Galle, Sri Lanka.' },
    ],
  });

  console.log('Created settings...');
  console.log('Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

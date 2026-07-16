import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

function getDatabaseUrl(): string {
  // On Vercel serverless, /var/task is read-only. Copy DB to /tmp (writable).
  if (process.env.VERCEL) {
    const tmpPath = '/tmp/dev.db';
    if (!fs.existsSync(tmpPath)) {
      const bundled = path.join(/* turbopackIgnore: true */ process.cwd(), 'prisma', 'dev.db');
      if (fs.existsSync(bundled)) {
        fs.copyFileSync(bundled, tmpPath);
      }
    }
    return `file:${tmpPath}`;
  }
  // Local development
  return process.env.DATABASE_URL ?? `file:${path.join(process.cwd(), 'prisma', 'dev.db')}`;
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: { db: { url: getDatabaseUrl() } },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

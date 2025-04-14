export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { promises as fs } from 'fs';
import { type NextRequest, NextResponse } from 'next/server';
import { resolve } from 'path';

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  const root = process.cwd();
  const uploadsDir = resolve(root, 'uploads');
  const safePath = resolve(uploadsDir, ...params.path);

  const normalizedPath = safePath.replace(/\\/g, '/');

  if (!normalizedPath.startsWith(uploadsDir.replace(/\\/g, '/'))) {
    throw new Error('Invalid file path');
  }

  try {
    const stats = await fs.stat(safePath || "");

    if (!stats.isFile()) {
      throw new Error('Not a file');
    }

    const fileBuffer = await fs.readFile(safePath || "");

    const extension = safePath.split('.').pop() ?? '';
    const contentType = {
      jpg: 'image/jpeg',
      png: 'image/png',
      webp: 'image/webp',
      mp4: 'video/mp4',

    }[extension] || 'application/octet-stream';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
      },
    });
  } catch {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}
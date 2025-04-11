export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { type MediaItem } from '@/features/media/types';
import { NextResponse } from 'next/server';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export async function GET(request: Request): Promise<NextResponse<MediaItem[] | { error: string }>> {
  try {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('searchTerm')?.toLowerCase() || '';

    // Open the SQLite database
    const db = await open({
      filename: './public/uploads.db',
      driver: sqlite3.Database,
    });

    // Query the database for media items
    const rows = await db.all('SELECT id, fileName, originalFileName, fileType, filePath, fileSize, url FROM media');

    // Filter and map the rows to the MediaItem type
    const mediaItems: MediaItem[] = rows
      .filter(row => row.fileName.toLowerCase().includes(searchTerm))
      .map(row => ({
        id: row.id,
        title: row.fileName,
        description: "idk something",
        src: `/api/media/serve/${row.filePath.split('/').slice(2).join('/')}`,
        type: row.fileType,
        alt: row.fileName,
      }));

    // Close the database connection
    await db.close();

    return NextResponse.json(mediaItems);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching media from database:', error);
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
  }
}

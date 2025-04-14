import { withErrorHandling } from '@/config/api-error-middleware';
import { access, unlink } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

// The actual handler logic separated out
async function deleteMediaHandler(request: Request) {
  const db = await open({
    filename: './public/uploads.db',
    driver: sqlite3.Database,
  });

  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'No ID provided' },
        { status: 400 }
      );
    }

    // Query the database for the file path associated with the ID
    const fpquery = db.get('SELECT filePath FROM media WHERE id = ?', [id]).then(
      (row: { filePath: string }) => {
        return row ? row.filePath : null;
      }
    )

    const filePath = await fpquery;

    if (!filePath) {
      return NextResponse.json(
        { error: 'File not found in database' },
        { status: 404 }
      );
    }

    const filePathParts = filePath.split('/');
    const uploadDir = path.join(process.cwd(), 'uploads');
    const absolutePath = path.join(uploadDir, filePathParts[2]);

    try {
      await access(absolutePath);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e: unknown) {
      return NextResponse.json(
        { error: 'File not found on disk' },
        { status: 404 }
      );
    }

    await unlink(absolutePath);

    // Delete the record from the database
    await db.run('DELETE FROM media WHERE id = ?', [id]);

    // Return success response
    return NextResponse.json({
      success: true,
      message: `File with ID ${id} deleted successfully`
    });

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error deleting file:', error);
    return NextResponse.json(
      { error: 'Error deleting file' },
      { status: 500 }
    );
  }
}

export const DELETE = withErrorHandling(deleteMediaHandler);

export const runtime = 'nodejs';
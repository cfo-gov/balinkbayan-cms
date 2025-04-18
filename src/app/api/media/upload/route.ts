import { withErrorHandling } from '@/config/api-error-middleware';
import { mkdir, writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { v4 as uuidv4 } from 'uuid';

async function initializeDatabase() {
  const dbPath = path.join(process.cwd(), 'public', 'uploads.db');
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });


  await db.exec(`
    CREATE TABLE IF NOT EXISTS media (
      id TEXT PRIMARY KEY NOT NULL,
      fileName TEXT NOT NULL,
      fileDescription TEXT NOT NULL,
      originalFileName TEXT NOT NULL,
      fileType TEXT NOT NULL,
      filePath TEXT NOT NULL,
      fileSize INTEGER NOT NULL,
      url TEXT NOT NULL,
      uploadedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
}

async function uploadHandler(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title')
    const description = formData.get('description')

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Check if file is an image
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'video/quicktime'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'File must be an image (JPEG, PNG, GIF, WEBP) or video (MP4, WebM, QuickTime)' },
        { status: 400 }
      );
    }



    // Convert the file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const fileName = title as string;
    const fileDescription = description as string;

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'uploads');
    await mkdir(uploadDir, { recursive: true });

    // Save the file
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    // Save record to database
    const db = await initializeDatabase();
    await db.run(
      `INSERT INTO media (id, fileName, fileDescription, originalFileName, fileType, filePath, fileSize, url) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        uuidv4(),
        fileName,
        fileDescription,
        file.name,
        file.type,
        `/uploads/${fileName}`,
        buffer.length,
        `/uploads/${fileName}`
      ]
    );

    await db.close();

    return NextResponse.json({
      success: true,
      fileName,
      fileDescription,
      url: `/uploads/${fileName}`
    });

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
}

export const POST = withErrorHandling(uploadHandler);
export const runtime = 'nodejs';

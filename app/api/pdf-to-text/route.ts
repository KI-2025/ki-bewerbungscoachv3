import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const buffer = Buffer.from(await file.arrayBuffer());
  const extractedText = 'Beispieltext aus dem hochgeladenen PDF';
  return NextResponse.json({ text: extractedText });
}
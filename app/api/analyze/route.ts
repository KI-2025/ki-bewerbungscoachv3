import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const result = `Analyse und Anschreiben basierend auf deinem Prompt:\n\n${prompt}\n\n👉 Dies ist eine simulierte Antwort.`;
  return NextResponse.json({ result });
}
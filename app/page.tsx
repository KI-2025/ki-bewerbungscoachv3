'use client';

import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState<'de' | 'en'>('de');

  const handleAnalyze = async () => {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input })
    });
    const data = await res.json();
    setResult(data.result);
  };

  const handlePDFUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/pdf-to-text', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    setInput(data.text);
  };

  return (
    <main className="max-w-2xl mx-auto p-4 font-sans">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {language === 'de' ? 'KI-Bewerbungscoach' : 'AI Resume Coach'}
        </h1>
        <select
          className="border rounded px-2 py-1"
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'de' | 'en')}
        >
          <option value="de">Deutsch</option>
          <option value="en">English</option>
        </select>
      </div>

      <textarea
        className="w-full border rounded p-2 h-40 mb-2"
        placeholder={language === 'de' ? 'Bewerbungstext hier eingeben…' : 'Enter your resume or application text here...'}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex gap-2 mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleAnalyze}
        >
          {language === 'de' ? 'Analysieren' : 'Analyze'}
        </button>

        <label className="cursor-pointer bg-gray-200 px-4 py-2 rounded">
          {language === 'de' ? 'PDF hochladen' : 'Upload PDF'}
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handlePDFUpload}
        >
          {language === 'de' ? 'PDF analysieren' : 'Analyze PDF'}
        </button>
      </div>

      <div className="whitespace-pre-wrap border rounded p-4 bg-gray-50">
        {result || (language === 'de' ? 'Analyse erscheint hier...' : 'Analysis will appear here...')}
      </div>
    </main>
  );
}
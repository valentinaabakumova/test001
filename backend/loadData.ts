// backend/loadData.ts
import fs from 'fs';
import path from 'path';

export function loadData() {
  const encodedPath = path.join(__dirname, 'data', 'gibberish.enc');
  const decodedPath = path.join(__dirname, 'data', 'gibberish-decoded.json');

  try {
    // decoding .enc 
    const encoded = fs.readFileSync(encodedPath, 'utf-8');
    const buffer = Buffer.from(encoded, 'base64');
    const decoded = JSON.parse(buffer.toString('utf-8'));
    console.log('✅ Data loaded gibberish.enc');
    return decoded;
  } catch (e) {
    // decoded JSON
    console.warn('⚠️ Cant load gibberish.enc, use JSON');
    const decodedFallback = fs.readFileSync(decodedPath, 'utf-8');
    return JSON.parse(decodedFallback);
  }
}

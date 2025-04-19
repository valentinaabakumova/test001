
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import environment from '../environment/environment.json';
import { loadData } from '../loadData';

const app = express();
const PORT = 1337;

app.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type', 'x-api-key', 'x-signature'],
}));
app.use(express.json());

(globalThis as any).database = loadData();

app.get('/', (_, res) => {
  res.send('🚀 Server is running!');
});

app.get('/messages', (_, res) => {
  res.json((globalThis as any).database);
});

app.post('/messages', (req, res) => {
  const apiKey = req.headers['x-api-key'] as string;
  const signature = req.headers['x-signature'] as string;
  const bodyString = JSON.stringify(req.body);

  console.log("🔑 Received API key:", apiKey);
  console.log("🔑 Expected API key:", environment.API_KEY);
  console.log("🔐 Received signature:", signature);
  console.log("📦 Received body:", req.body);

  if (!apiKey || !signature) {
    return res.sendStatus(403);
  }

  if (apiKey !== environment.API_KEY) {
    console.log("❌ Invalid API key");
    return res.sendStatus(403);
  }

  if (!verifySignature(bodyString, signature)) {
    console.log("❌ Invalid signature");
    return res.sendStatus(403);
  }

  const message = req.body;
  const messageWithTimestamp = {
    ...message,
    sentAt: Date.now(),
  };

  (globalThis as any).database.push(messageWithTimestamp);

  const filePath = path.resolve(__dirname, '../gibberish-decoded.json');
  fs.writeFile(filePath, JSON.stringify((globalThis as any).database, null, 2), err => {
    if (err) {
      console.error('❌ Failed to save file:', err);
      return res.status(500).send('Server error saving message');
    }

    console.log("✅ Message saved");
    res.status(201).json(messageWithTimestamp);
  });
});

function verifySignature(payload: string, signature: string): boolean {
  const hmac = crypto.createHmac('sha256', environment.SECRET_KEY);
  const digest = hmac.update(payload).digest('hex');
  return digest === signature;
}

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});

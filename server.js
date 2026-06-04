import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.send('Server running');
});

app.get('/api/summary', (req, res) => {
  const summaryPath = path.join(__dirname, 'allure-report', 'widgets', 'summary.json');

  if (fs.existsSync(summaryPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
      res.json({ available: true, data });
    } catch (e) {
      res.status(500).json({ available: false, error: 'Parse error' });
    }
  } else {
    res.json({ available: false, message: 'No report found' });
  }
});

app.use('/report', express.static(path.join(__dirname, 'allure-report')));

app.get('/', (req, res) => {
  res.redirect('/report');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

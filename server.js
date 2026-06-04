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

app.get('/api/summary', (req, res) => {
  const summaryPath = path.join(
    __dirname,
    'allure-report',
    'widgets',
    'summary.json'
  );

  if (fs.existsSync(summaryPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));

      res.json({
        available: true,
        data
      });
    } catch (error) {
      res.status(500).json({
        available: false,
        error: 'Failed to parse report summary'
      });
    }
  } else {
    res.json({
      available: false,
      message: 'No test execution report found.'
    });
  }
});

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'allure-report', 'index.html');

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.send(`
      <h2>Report not found</h2>
      <p>Allure report is not generated on server.</p>
    `);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const PUBLIC_DIR = path.join(__dirname, 'public');

// Supported languages based on existing files
const getSupportedLanguages = async () => {
  const files = await fs.readdir(PUBLIC_DIR);
  return files
    .filter(f => f.startsWith('reviews_') && f.endsWith('.json'))
    .map(f => f.replace('reviews_', '').replace('.json', ''));
};

// Simple scraping for Airbnb
const extractReviewData = async (url: string) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(data);
    
    // Attempt to extract data (selectors might need adjustment as Airbnb changes)
    const name = $('h3').first().text().trim() || 'Ospite';
    const date = $('span').filter((_, el) => $(el).text().includes('202')).first().text().trim() || 'Recent';
    const quote = $('span[data-testid="pdp-review-text"]').text().trim() || 
                  $('div[data-review-id] span').text().trim() || 
                  '';
    
    return { name, date, quote, platform: 'Airbnb', stars: 5 };
  } catch (error) {
    console.error('Extraction error:', error);
    throw new Error('Failed to extract data from link');
  }
};

// Mock translation (replace with real API if available)
const translateText = async (text: string, targetLang: string) => {
  if (targetLang === 'it') return text; // Keep original for Italian
  
  try {
    // Using a free translation API (mymemory.translated.net is a common free one)
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=it|${targetLang}`;
    const { data } = await axios.get(url);
    return data.responseData.translatedText || text;
  } catch (err) {
    console.error(`Translation error for ${targetLang}:`, err);
    return text; // Fallback to original
  }
};

app.get('/api/languages', async (req, res) => {
  try {
    const langs = await getSupportedLanguages();
    res.json(langs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list languages' });
  }
});

app.post('/api/extract', async (req, res) => {
  const { url } = req.body;
  try {
    const data = await extractReviewData(url);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to extract data' });
  }
});

app.post('/api/add', async (req, res) => {
  const { review, autoTranslate } = req.body;
  try {
    const langs = await getSupportedLanguages();
    
    for (const lang of langs) {
      const filePath = path.join(PUBLIC_DIR, `reviews_${lang}.json`);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const reviews = JSON.parse(fileContent);
      
      let translatedQuote = review.quote;
      if (autoTranslate && lang !== 'it') {
        translatedQuote = await translateText(review.quote, lang);
      }
      
      const newReview = {
        ...review,
        quote: translatedQuote,
        id: Date.now().toString() // Optional: add ID if needed by frontend
      };
      
      reviews.unshift(newReview);
      await fs.writeFile(filePath, JSON.stringify(reviews, null, 2));
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ error: 'Failed to save review' });
  }
});

app.post('/api/delete', async (req, res) => {
  const { id } = req.body;
  try {
    const langs = await getSupportedLanguages();
    for (const lang of langs) {
      const filePath = path.join(PUBLIC_DIR, `reviews_${lang}.json`);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const reviews = JSON.parse(fileContent);
      const filtered = reviews.filter((r: any) => r.id !== id);
      await fs.writeFile(filePath, JSON.stringify(filtered, null, 2));
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

app.listen(port, () => {
  console.log(`Review Management Server running at http://localhost:${port}`);
});

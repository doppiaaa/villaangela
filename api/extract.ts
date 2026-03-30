import axios from 'axios';
import * as cheerio from 'cheerio';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const $ = cheerio.load(data);
    
    const name = $('h3').first().text().trim() || 'Ospite';
    const date = $('span').filter((_, el) => $(el).text().includes('202')).first().text().trim() || 'Recent';
    const quote = $('span[data-testid="pdp-review-text"]').text().trim() || 
                  $('div[data-review-id] span').text().trim() || 
                  '';
    
    return res.status(200).json({ 
      name, 
      date, 
      quote, 
      platform: 'Airbnb', 
      stars: 5 
    });
  } catch (error) {
    console.error('Extraction error:', error);
    return res.status(500).json({ error: 'Failed to extract data from link' });
  }
}

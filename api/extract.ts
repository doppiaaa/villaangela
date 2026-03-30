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
    let name = 'Ospite';
    let date = 'Recent';
    let quote = '';
    let platform = 'Airbnb';

    // Platform detection and extraction logic
    if (url.includes('google.com/maps') || url.includes('g.page') || url.includes('goo.gl/maps')) {
      platform = 'Google';
      name = $('div.fontHeadlineSmall').first().text().trim() || 
             $('.d4r55').first().text().trim() || 'Ospite Google';
      quote = $('.wiTb7').first().text().trim() || 
              $('.MyEned span').first().text().trim() || '';
    } else if (url.includes('booking.com')) {
      platform = 'Booking.com';
      name = $('.bui-avatar-block__title').first().text().trim() || 
             $('.review_item_reviewer h4').first().text().trim() || 'Ospite Booking';
      quote = $('.c-review__body').first().text().trim() || 
              $('.review_item_review_content p').first().text().trim() || '';
    } else if (url.includes('tripadvisor')) {
      platform = 'TripAdvisor';
      name = $('.ui_header_link').first().text().trim() || 'Ospite TripAdvisor';
      quote = $('.partial_entry').first().text().trim() || '';
    } else {
      // Default: Airbnb
      name = $('h3').first().text().trim() || 'Ospite';
      date = $('span').filter((_, el) => $(el).text().includes('202')).first().text().trim() || 'Recent';
      quote = $('span[data-testid="pdp-review-text"]').text().trim() || 
              $('div[data-review-id] span').text().trim() || '';
    }
    
    return res.status(200).json({ 
      name, 
      date, 
      quote, 
      platform, 
      stars: 5 
    });
  } catch (error) {
    console.error('Extraction error:', error);
    return res.status(500).json({ error: 'Failed to extract data from link' });
  }
}

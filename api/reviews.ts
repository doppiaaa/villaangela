import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const SUPPORTED_LANGS = ['en', 'it', 'fr', 'es', 'de', 'pl', 'zh', 'ar', 'da', 'sv'];

async function translateText(text: string, targetLang: string) {
  if (targetLang === 'it') return text;
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=it|${targetLang}`;
    const { data } = await axios.get(url);
    return data.responseData.translatedText || text;
  } catch (err) {
    console.error(`Translation error for ${targetLang}:`, err);
    return text;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Common CORS headers (Vercel handles some but we're explicit)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method } = req;

  try {
    switch (method) {
      case 'GET': {
        const { lang } = req.query;
        let query = supabase.from('reviews').select('*').order('date', { ascending: false });
        
        if (lang) {
          query = query.eq('lang', lang);
        }

        const { data, error } = await query;
        if (error) throw error;
        return res.status(200).json(data);
      }

      case 'POST': {
        const { action, id, review, autoTranslate } = req.body;

        if (action === 'delete') {
          // Delete all translations of this review (linked by something, but here use name+date or a specific group id)
          // For simplicity, if we have a specific ID, let's delete that.
          // In a more robust setup, we'd have a review_group_id.
          const { error } = await supabase.from('reviews').delete().eq('id', id);
          if (error) throw error;
          return res.status(200).json({ success: true });
        }

        // Default ADD action
        if (!review) return res.status(400).json({ error: 'Review data required' });

        const reviewGroupId = Date.now().toString();
        const reviewsToInsert = [];

        for (const lang of SUPPORTED_LANGS) {
          let translatedQuote = review.quote;
          if (autoTranslate && lang !== 'it') {
            translatedQuote = await translateText(review.quote, lang);
          }

          reviewsToInsert.push({
            name: review.name,
            platform: review.platform,
            date: review.date,
            stars: review.stars,
            quote: translatedQuote,
            lang: lang,
            group_id: reviewGroupId
          });
        }

        const { error } = await supabase.from('reviews').insert(reviewsToInsert);
        if (error) throw error;
        
        return res.status(200).json({ success: true, group_id: reviewGroupId });
      }

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

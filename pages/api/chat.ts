// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const message = req.body.message;

  if (req.method !== 'POST' || !message) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'deepseek/deepseek-r1:free',
        messages: [
          { role: 'system', content: 'You are a helpful AI assistant.' },
          { role: 'user', content: message }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('OpenRouter API Full Response:', response.data); // 🔍 Debug

    if (!response.data.choices || !response.data.choices[0]) {
      return res.status(500).json({ error: 'No valid response from model.' });
    }

    const reply = response.data.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (err: any) {
    console.error('OpenRouter API Error:', err?.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch response from OpenRouter.' });
  }
}

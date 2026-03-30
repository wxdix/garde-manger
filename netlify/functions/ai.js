export default async (req, context) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  try {
    const body = await req.json();
    const userMessage = body.messages?.[0]?.content || '';

    if (!process.env.GEMINI_API_KEY) {
      return new Response(JSON.stringify({ 
        content: [{ type: 'text', text: 'Erreur : clé GEMINI_API_KEY manquante sur le serveur.' }] 
      }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const geminiBody = {
      contents: [{ parts: [{ text: userMessage }] }],
      generationConfig: { maxOutputTokens: 2000, temperature: 0.7 },
    };

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiBody),
    });

    const data = await response.json();

    if (data.error) {
      return new Response(JSON.stringify({ 
        content: [{ type: 'text', text: `Erreur Gemini : ${data.error.message}` }] 
      }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Réponse vide.';

    return new Response(JSON.stringify({ content: [{ type: 'text', text }] }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });

  } catch (err) {
    return new Response(JSON.stringify({ 
      content: [{ type: 'text', text: `Exception : ${err.message}` }]
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
};

export const config = { path: '/api/ai' };

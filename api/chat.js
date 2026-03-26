export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    const response = await fetch(
      'https://api-inference.huggingface.co/models/TheBloke/Llama-3-7B-Chat-GGML', 
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HF_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: messages[messages.length - 1].content, // send last user message
          parameters: { max_new_tokens: 500 }
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error });
    }

    // Hugging Face returns text in 'generated_text'
    return res.status(200).json({ reply: data[0]?.generated_text || "No reply generated." });

  } catch (error) {
    return res.status(500).json({
      error: 'Something went wrong with the Hugging Face API.',
      details: error.message
    });
  }
}
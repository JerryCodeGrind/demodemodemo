import { OpenAI } from 'openai';

// Initialize OpenAI client with API key from environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Define the system prompt that sets the behavior of the AI
const systemPrompt = {
  role: 'system',
  content: 'You are a helpful, knowledgeable assistant. Provide accurate, concise, and relevant information. Be friendly and conversational in your responses.'
};

export async function POST(req: Request) {
  try {
    const { message, history = [] } = await req.json();

    // Prepare messages with system prompt and history
    const messages = [
      systemPrompt,
      ...history,
      { role: 'user', content: message }
    ];

    // Create a streaming response with OpenAI
    const stream = await openai.chat.completions.create({
      model: "ft:gpt-4.1-nano-2025-04-14:personal:vguvjhb:Brrr97AW",
      messages,
      stream: true,
      temperature: 0.7,
    });

    // Create a readable stream for the browser
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || '';
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (error) {
          console.error('Stream error:', error);
        } finally {
          controller.close();
        }
      }
    });

    return new Response(readableStream);
  } catch (error) {
    console.error('Error in chat API route:', error);
    return new Response(JSON.stringify({ error: 'Failed to process the request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} //placeholder
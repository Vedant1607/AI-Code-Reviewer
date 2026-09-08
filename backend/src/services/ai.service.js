import OpenAI from "openai";
import dotenv from 'dotenv';
// dotenv.config();

function getClient() {
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("Missing API key: set OPENROUTER_API_KEY or GOOGLE_API_KEY in your environment");
  }
  return new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey,
  });
}

export async function generateContent(code) {
  const openai = getClient();

  const systemPrompt =
    "You are a senior code reviewer. Provide concise, actionable feedback on correctness, security, performance, readability, and best practices. Suggest improved code when helpful.";

  const modelsToTry = [
    process.env.AI_MODEL,
    "google/gemini-3.6-flash",
    "google/gemini-2.5-flash",
    "meta-llama/llama-3.3-70b-instruct:free"
  ].filter(Boolean);

  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const completion = await openai.chat.completions.create({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: code },
        ],
        max_tokens: 2048,
      });

      const message = completion.choices?.[0]?.message;
      const text = message?.content || message?.reasoning || "";
      if (text) {
        return text;
      }
    } catch (err) {
      console.warn(`Model ${model} failed:`, err.message || err);
      lastError = err;
    }
  }

  throw lastError || new Error("Failed to generate code review from AI models.");
}

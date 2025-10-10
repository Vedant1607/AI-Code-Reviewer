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

  const completion = await openai.chat.completions.create({
    model: "anthropic/claude-sonnet-4.5",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: code },
    ],
  });

  const text = completion.choices?.[0]?.message?.content ?? "";
  console.log(text)
  return text;
}

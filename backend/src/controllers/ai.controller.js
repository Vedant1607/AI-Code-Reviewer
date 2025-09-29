import { generateContent } from '../services/ai.service.js';

const getResponse = async (req, res) => {
    const prompt = req.query.prompt;

    if (!prompt) {
        return res.status(400).send("Prompt is required");
    }

    try {
        const response = await generateContent(prompt);
        res.send(response);
    } catch (err) {
        console.error("AI generation failed:", err);
        res.status(500).send("Failed to generate response");
    }
}

export default getResponse;

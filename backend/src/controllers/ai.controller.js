import { generateContent } from '../services/ai.service.js';

const getReview = async (req, res) => {
    const code = req.body.code;

    if (!code) {
        return res.status(400).send("code is required");
    }

    try {
        const response = await generateContent(code);
        res.send(response);
    } catch (err) {
        console.error("AI generation failed:", err);
        res.status(500).send("Failed to generate response");
    }
}

export default getReview;

import express from 'express';
import aiRoutes from './routes/ai.routes.js';

export const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use('/ai', aiRoutes);

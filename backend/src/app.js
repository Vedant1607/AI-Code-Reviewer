import express from 'express';
import aiRoutes from './routes/ai.routes.js';

export const app = express();

app.use(express.json());

app.use('/ai', aiRoutes);

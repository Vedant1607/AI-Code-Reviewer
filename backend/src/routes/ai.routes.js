import { Router } from 'express';
import getResponse from '../controllers/ai.controller.js';

const router = Router();

router.get("/get-response", getResponse);

export default router;

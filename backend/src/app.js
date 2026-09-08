import express from 'express';
import aiRoutes from './routes/ai.routes.js';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

export const app = express();

// Security headers
app.use(helmet());

// CORS configuration
const envOrigins = process.env.ALLOWED_ORIGINS?.split(',').map(o => o.trim()).filter(Boolean);
const allowedOrigins = (envOrigins && envOrigins.length > 0 ? envOrigins : [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000"
]).map(o => o.replace(/\/$/, "")); // remove trailing slash

app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server, postman, or curl (no origin)
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.some(o => 
      o === '*' || 
      origin === o || 
      origin.endsWith('.vercel.app') || 
      o.replace(/\/$/, '') === origin
    );

    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/ai', limiter);

// Body parsing with size limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health checks
app.get('/', (req, res) => res.json({ status: 'ok', message: 'AI Code Reviewer API Service' }));
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/ai', aiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message
  });
});
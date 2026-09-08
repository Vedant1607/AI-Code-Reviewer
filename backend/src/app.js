import express from 'express';
import aiRoutes from './routes/ai.routes.js';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

export const app = express();

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
const envOrigins = process.env.ALLOWED_ORIGINS?.split(',').map(o => o.trim()).filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);

    // If ALLOWED_ORIGINS is not set or contains *, allow all origins dynamically
    if (!envOrigins || envOrigins.length === 0 || envOrigins.includes('*')) {
      return callback(null, true);
    }

    // Check against configured envOrigins or any .vercel.app deployment or localhost
    const isAllowed = envOrigins.some(o => 
      o === '*' || 
      origin === o || 
      origin.replace(/\/$/, '') === o.replace(/\/$/, '')
    ) || origin.endsWith('.vercel.app') || origin.includes('localhost') || origin.includes('127.0.0.1');

    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn("Blocked by CORS:", origin);
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/ai', limiter);
app.use('/get-review', limiter);

// Body parsing with size limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health checks
app.get('/', (req, res) => res.json({ status: 'ok', message: 'AI Code Reviewer API Service' }));
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/ai', aiRoutes);
app.use('/', aiRoutes);

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
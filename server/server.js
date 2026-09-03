import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDB, getIsConnected } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import recordRoutes from './routes/recordRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { apiGeneralLimiter } from './middleware/rateLimiter.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Security Header Configuration
app.use(helmet());

// CORS Configuration
const allowedOrigins = [
  CLIENT_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000'
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl) or if origin is allowed
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        callback(new Error('Blocked by CORS policy'));
      }
    },
    credentials: true
  })
);

app.use(express.json({ limit: '100kb' }));
app.use(apiGeneralLimiter);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    mongodb: getIsConnected() ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Phase 1 Protection Middleware
const phase1Guard = (req, res, next) => {
  const restrictedPrefixes = ['/api/games', '/api/quotes', '/api/themes'];
  for (const prefix of restrictedPrefixes) {
    if (req.path.startsWith(prefix)) {
      return res.status(403).json({
        success: false,
        message: 'UNDER DEVELOPMENT: This API feature is locked in Phase 1.'
      });
    }
  }
  next();
};
app.use(phase1Guard);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route Not Found: ${req.originalUrl}`
  });
});

// Global Error Handler
app.use(errorHandler);

// Start Server & DB
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
});
app.set('io', io);

io.on('connection', (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`);
  
  socket.on('session:start', (data) => {
    console.log(`[${socket.id}] Session started`, data?.sessionId);
  });
  
  socket.on('session:update', (data) => {
    // Throttled updates can be validated or broadcasted here
  });
  
  socket.on('session:pause', (data) => {
    console.log(`[${socket.id}] Session paused`, data?.sessionId);
  });
  
  socket.on('session:resume', (data) => {
    console.log(`[${socket.id}] Session resumed`, data?.sessionId);
  });
  
  socket.on('session:finish', (data) => {
    console.log(`[${socket.id}] Session finished`, data?.sessionId);
  });
  
  socket.on('disconnect', () => {
    console.log(`🔌 Client disconnected: ${socket.id}`);
  });
});

const startServer = async () => {
  await connectDB();
  httpServer.listen(PORT, () => {
    console.log(`🌲 Forest Type Server running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
    console.log(`🌿 CORS allowed for: ${CLIENT_URL}`);
  });
};

startServer();

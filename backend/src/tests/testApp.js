import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from '../routes/auth.routes.js';
import taskRoutes from '../routes/task.routes.js';
import { notFound, errorHandler } from '../middleware/errorHandler.js';

// Create a test app instance
const createTestApp = () => {
  const app = express();
  
  app.use(express.json());
  app.use(cookieParser());
  
  // Routes
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/tasks', taskRoutes);
  
  // Health check
  app.get('/api/v1/health', (req, res) => {
    res.json({ success: true, status: 'ok' });
  });
  
  // Error handling
  app.use(notFound);
  app.use(errorHandler);
  
  return app;
};

export default createTestApp;

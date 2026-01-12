import app from '../src/app.js';
import config from '../src/app/config/index.js';
import mongoose from 'mongoose';

// Connect to MongoDB
mongoose.connect(config.database_url as string)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));
export default app;
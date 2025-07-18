import app from './app';
import './index.css';
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './config/db';

const PORT = process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
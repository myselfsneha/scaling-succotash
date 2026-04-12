import app from './app.js';
import { db } from './config/db.js';
import { env } from './config/env.js';

const start = async () => {
  try {
    await db.getConnection();
    app.listen(5000, () => {
      console.log(`Backend running on http://localhost:5000`);
    });
  } catch (error) {
    console.error('Unable to connect to database:', error.message);
    process.exit(1);
  }
};

start();

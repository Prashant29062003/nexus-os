import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import dotenv from 'dotenv';
import routes from '#core/routes/index.js';

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(cors());
app.use(express.json());

// Routes
routes(app);

// Basic Route for testing
app.get('/', (req, res) => res.send('NexusOS API Running'));

// Database Connection
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});

export default app;

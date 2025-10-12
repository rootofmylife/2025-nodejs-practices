import app from './server.js';
import dotenv from 'dotenv';

// Load environment-specific config file
const nodeEnv = process.env.NODE_ENV || 'development';
dotenv.config({
    path: `.env.${nodeEnv}`
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

import express from 'express';

const app = express();

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        message: 'Server is running'
    });
});

export default app;

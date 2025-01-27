import express from 'express';
import { getPool, closePool } from './utils';
import { selectNow } from './advSQL/1select';

const app = express();

// Initialize the database pool
getPool();

// Handle graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    await closePool();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('SIGINT received. Shutting down gracefully...');
    await closePool();
    process.exit(0);
});

// Handle uncaught exceptions
process.on('uncaughtException', async (error) => {
    console.error('Uncaught Exception:', error);
    await closePool();
    process.exit(1);
});

app.listen(3000, async() => {
    console.log('Server is running on port 3000 🎉');
    await selectNow().then(() => {
        process.exit(1);
    });
});

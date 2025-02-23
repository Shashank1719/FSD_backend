const redis = require('redis');
import dotenv from 'dotenv'
dotenv.config()

let redisClient;

// Function to get Redis client (connects if needed)
async function getRedisClient() {
    if (!redisClient || !redisClient.isOpen) {
        redisClient = redis.createClient({
            url: `redis://redis:${process.env.REDIS_PORT}`
        });

        // Reconnect logic
        redisClient.on('error', (err) => {
            console.error('Redis error:', err);
            redisClient.quit();  // Close faulty client
            redisClient = null;  // Reset client for future reconnect
        });

        redisClient.on('connect', () => {
            console.log('Connected to Redis...');
        });

        redisClient.on('end', () => {
            console.warn('Redis connection ended');
            redisClient = null;
        });

        // Await connection
        await redisClient.connect();
    }
    return redisClient;
}

module.exports = { getRedisClient };

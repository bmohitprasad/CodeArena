import redis from "./redisClient";
export async function getCache(key) {
    try {
        return await redis.get(key);
    }
    catch (error) {
        console.error('Redis get error:', error);
        return null;
    }
}
export async function setCache(key, value, ttlSeconds = 600) {
    try {
        await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    }
    catch (error) {
        console.error('Reddis set error:', error);
    }
}

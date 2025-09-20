import redis from "./redisClient";

export async function getCache(key: string): Promise<string | null> {
    try {
        return await redis.get(key);
    } catch (error) {
        console.error('Redis get error:', error);
        return null;
    }
}

export async function setCache(key: string, value: any, ttlSeconds = 600) {
    try {
        await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    } catch (error) {
        console.error('Reddis set error:', error);
    }
}
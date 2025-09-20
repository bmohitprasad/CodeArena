import Redis from 'ioredis';

const redis = new Redis({
    host: 'localhost',
    port: 6379,
})

redis.on('connect', () => console.log('Redis Connected'));
redis.on('error', (err: any) => console.error('Redis error', err));

export default redis;
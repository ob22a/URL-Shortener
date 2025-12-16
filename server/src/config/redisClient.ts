import {createClient} from 'redis';

const redisUrl = process.env.REDIS_URL;
if(!redisUrl) throw new Error('REDIS_URL is not defined in environment variables');

const redisClient = createClient({
    url: redisUrl
})

redisClient.on('error', (err) => console.error('Redis Client Error', err));

export default redisClient;
import redisClient from "../config/redisClient.js";

const CACHE_TTL = 3600; // Cache Time-To-Live in seconds (1 hour)

export const getCachedUrl = async (shortCode:string): Promise<string|null> =>{
    return await redisClient.get(shortCode);
}

export const setCachedUrl = async (shortCode:string, originalUrl:string): Promise<void> =>{
    await redisClient.set(shortCode, originalUrl,{
        EX: CACHE_TTL
    });
}
import { type Request, type Response } from "express";
import { getCachedUrl, setCachedUrl } from "../cache/urlCache.js";
import urlModel from "../model/urlModel.js";
import logModel from "../model/logModel.js";
import getIP from "../utils/getIP.js";
import incrementClickCount from "../utils/increment.js";

export const redirectToOriginal = async (req:Request, res:Response): Promise<void|Response<any, Record<string, any>>> => {
    const { shortCode } = req.params;
    if(!shortCode) return res.status(400).json({ message: "Short code is required" });

    try{
        // First try redis
        const cachedUrl = await getCachedUrl(shortCode);
        if(cachedUrl){
            await logModel.create({ shortCode, ipAddress: await getIP(), userAgent: req.get("User-Agent") || "Unknown" });
            incrementClickCount(shortCode);

            return res.redirect(cachedUrl);
        }

        // Query MongoDB
        const urlEntry = await urlModel.findOne({ shortCode });
        if(!urlEntry){
            return res.status(404).json({ message: "Short URL not found" });
        }
        
        // Check expiration
        if(urlEntry.expiresAt && urlEntry.expiresAt < new Date()){
            return res.status(410).json({ message: "Short URL has expired" });
        }

        // Log the access
        await logModel.create({ shortCode, ipAddress: await getIP(), userAgent: req.get("User-Agent") || "Unknown" });

        // Cache in Redis
        await setCachedUrl(shortCode, urlEntry.originalUrl);
        
        // Update click count
        incrementClickCount(shortCode);

        return res.redirect(urlEntry.originalUrl);

    } catch(error){
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
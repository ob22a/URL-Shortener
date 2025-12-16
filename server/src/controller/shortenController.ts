import { type Request, type Response } from "express";
import urlModel from "../model/urlModel.js";
import generateShortCode from "../utils/generateShortCode.js";

export const shortenUrl = async (req: Request, res: Response): Promise<void|Response<any, Record<string, any>>>=> {
    try {
        const { originalUrl, expiresAt }: { originalUrl: string, expiresAt?: string }= req.body;
        if(!originalUrl) return res.status(400).json({ error: "Long URL is required" });

        console.log("Received long URL:", originalUrl);

        const exists = await urlModel.findOne({ originalUrl });
        if(exists) {
            console.log("URL already shortened:", exists.shortCode);
            return res.status(200).json({
                message: "URL already shortened",
                shortCode: exists.shortCode
            });
        }
        
        const shortCode = await generateShortCode();
        console.log("Generated short code:", shortCode);

        const newUrl = new urlModel({
            originalUrl,
            shortCode,
            expiresAt: expiresAt ? new Date(expiresAt) : null
        });
        await newUrl.save();
        res.status(201).json({
            message: "URL shortened successfully",
            shortCode
        });
    } catch (error) {
        res.status(500).json({ error: `Failed to shorten URL. ${error}` });
    }
}
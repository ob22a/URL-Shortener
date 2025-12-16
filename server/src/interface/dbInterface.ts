import { Document } from "mongoose";

export interface UrlInterface extends Document {
    shortCode: string;
    originalUrl: string;
    createdAt: Date;
    expiresAt: Date | null;
    clickCount: number;
}

export interface logInterface extends Document {
    shortCode: string;
    timestamp: Date;
    ipAddress: string;
    userAgent: string;
}
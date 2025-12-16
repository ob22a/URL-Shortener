import { Schema, model } from "mongoose";
import { type logInterface } from "../interface/dbInterface.js";

const logSchema = new Schema<logInterface>({
    shortCode: { type: String, required: true },
    ipAddress: { type: String, required: true },
    userAgent: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

logSchema.index(
    {createdAt: 1},
    {expireAfterSeconds: 60 * 60 * 24 * 7} // Logs expire after a week
)

const logModel = model<logInterface>("Log", logSchema);

export default logModel;
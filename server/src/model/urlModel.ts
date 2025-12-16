import {Schema, model} from "mongoose";
import {type UrlInterface} from "../interface/dbInterface.js";


const urlSchema = new Schema<UrlInterface>({
    shortCode: { type: String, required: true, unique: true, index: true },
    originalUrl: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: null },
    clickCount: { type: Number, default: 0 },
});

urlSchema.index(
    {expiresAt: 1},
    {expireAfterSeconds: 0} // Automatically remove expired URLs
)


const urlModel = model<UrlInterface>("Url", urlSchema);

export default urlModel;
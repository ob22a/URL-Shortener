import express from 'express';
import { type Request, type Response } from 'express';
import router from './routes/redirectRoute.js';
import connectDB from './config/db.js';
import redisClient from './config/redisClient.js';
import mongoose from 'mongoose';
import { corsOptions } from './config/cors.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.get("/health",(req:Request, res:Response)=>{
    res.status(200).send("Server is healthy");
})

app.use('/', router);

const startServer = async ()=>{
    try{
        await connectDB();
        console.log("Connected to MongoDB");

        if(!redisClient.isOpen){
            await redisClient.connect();
            console.log("Connected to Redis");
        }

        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`);
        });
    } catch(error){
        console.error("Error starting server:", error);
        process.exit(1);
    }
}

process.on("SIGINT", async () => {
  console.log("Shutting down...");
  await mongoose.disconnect();
  if (redisClient.isOpen) await redisClient.quit();
  process.exit(0);
});

startServer();

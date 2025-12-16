import mongoose from 'mongoose';

const mongoDBURI:string|undefined = process.env.MONGODB_URI;

if(!mongoDBURI) throw new Error('MONGODB_URI is not defined in environment variables');

const connectDB = async ()=>{
    try{
        await mongoose.connect(mongoDBURI);
        console.log('MongoDB connected successfully');
    }catch(error){
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

export default connectDB;
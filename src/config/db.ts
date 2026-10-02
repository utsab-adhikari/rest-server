import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
    try {
        const uri = process.env.MONGO_URI 
        if (!uri) {
            throw new Error(`MONGO_URI is missing`);
        }

        const conn = await mongoose.connect(uri, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}:${conn.connection.port}`);
    } catch (error) {
        console.error(`Database Connection Error: ${error}`);
        process.exit(1);
    }
}
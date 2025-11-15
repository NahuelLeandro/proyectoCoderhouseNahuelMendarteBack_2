import mongoose from "mongoose";

export default async function connectMongo(MONGO_URI) {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ Database connected!");
    } catch (error) {
        console.error("❌ Error connecting DB:", error);
    }
}
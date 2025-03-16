import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const instance = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB Connected: ${instance.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;

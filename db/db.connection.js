import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const instance = await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "Chat-Application",
        });
        console.log(`MongoDB Connected: ${instance.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    };
}
export default connectDB;

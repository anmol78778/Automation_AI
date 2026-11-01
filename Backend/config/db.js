import mongoose from "mongoose";
const connectDb = async () => {
    try {   
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`MongoDB Connected`);
    }   
    catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}


export default connectDb;
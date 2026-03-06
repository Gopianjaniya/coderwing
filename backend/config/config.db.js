import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect(`${process.env.BACKEND_URL}`);
        console.log("Connect Successefully");
    } catch (error) {
        console.log("Connect Failed");
        console.log("Error", error.message);
    }
};
export default connectDB;
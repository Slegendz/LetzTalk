import mongoose from "mongoose";

const connectDb = async() => {
    try{
        await mongoose.connect(process.env.DATABASE_URI);
        console.log("Connected to MongoDb");
    } catch(err){
        console.log(err.message);
    }
}

export default connectDb;
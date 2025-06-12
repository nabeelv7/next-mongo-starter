import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    console.log("❌ Error connecting to MongoDB:", err.message);
  }
};

export default connectMongo;

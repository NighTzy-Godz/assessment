import mongoose from "mongoose";
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/inventi";

const connectToDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("MongoDB connection successful");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

export default connectToDB;

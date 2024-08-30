import mongoose from "mongoose";

const connectMonogDB = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);
    console.log("Conencted to MongoDb");
  } catch (error) {
    console.log(error);
  }
};

export default connectMonogDB;

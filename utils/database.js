import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  // If already connected, return early
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    // Ensure a valid URI is used
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not set.");
    }

    // Connect to MongoDB using the URI in the environment variable
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      serverSelectionTimeoutMS: 5000, // increase this if needed
      connectTimeoutMS: 10000, // increase this if needed
    });

    // Mark as connected
    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    // Log the error with more detailed information
    console.error("Error connecting to MongoDB:", error.message);
    throw new Error("Failed to connect to MongoDB");
  }

  // Additional event listeners (optional)
  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB connection lost. Reconnecting...");
    isConnected = false; // Reset connection status
  });

  mongoose.connection.on("reconnected", () => {
    console.log("MongoDB reconnected.");
    isConnected = true;
  });
};

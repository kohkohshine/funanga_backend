import mongoose from "mongoose";
import chalk from "../lib/chalk.js";

try {
    const dbClient = await mongoose.connect(process.env.MONGO_URI);
    chalk(`cyan`, `Connected to MongoDB @ ${dbClient.connection.host}`);
    dbClient.connection.on('disconnect', () => {
      throw new Error(`Lost connection to MongoDB @ ${dbClient.connection.host}`);
    });
  } catch (error) {
    chalk(`red`, `Error!` + error);
    process.exit(0);
  }
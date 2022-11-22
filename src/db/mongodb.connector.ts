import mongoose from "mongoose";
import { IDbConnector } from "./IDbConnector";

export class MongodbConnector implements IDbConnector {
  constructor(private dbUrls: string) {}
  async connect() {
    console.log("Connecting to Mongo DB");
    try {
      await mongoose.connect(this.dbUrls);
      console.log("Mongo connected");
    } catch (error) {
      console.log(error);
      throw new Error("Connection to Mongo DB failed due to error: " + error);
    }
  }
}

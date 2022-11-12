import mongoose from "mongoose";
import { IDbConnector } from "./IDbConnector";

export class MongodbConnector implements IDbConnector {
  constructor(private dbUrls: string) {}
  async connect() {
    await mongoose.connect(this.dbUrls);
    // dodać error domenowy
  }
}

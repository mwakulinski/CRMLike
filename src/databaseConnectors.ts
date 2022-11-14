import "dotenv/config";
import mongoose, { Mongoose } from "mongoose";
import { IDbConnector } from "./db/IDbConnector";
import { MongodbConnector } from "./db/mongodb.connector";

const mongodbUrl = process.env.MONGODB_URL || "";

export const appDatabaseConnectors: IDbConnector[] = [
  new MongodbConnector(mongodbUrl),
];

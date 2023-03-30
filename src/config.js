import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 27017;
// export const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://nekocreativo:PC*****20**@clusternekocrea.bqvbrhr.mongodb.net/?retryWrites=true&w=majority";

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://mongodb:$exterNO2024@mongodb-q06w:27017/DB_PASSWORD"


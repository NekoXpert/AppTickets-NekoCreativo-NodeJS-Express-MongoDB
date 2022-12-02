import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000;
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://nekocreativo:PC*****20**@clusternekocrea.bqvbrhr.mongodb.net/?retryWrites=true&w=majority";

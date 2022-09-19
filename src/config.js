import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000;
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://nekocreativo:PCGAMER2024@cluster0.ldxp9.mongodb.net/?retryWrites=true&w=majority";

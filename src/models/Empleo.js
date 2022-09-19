import mongoose from "mongoose";

const EmpleoSchema = new mongoose.Schema(
    {

        email: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Empleo", EmpleoSchema);
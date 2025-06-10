import mongoose from "mongoose";

const TreasurySchema = mongoose.Schema({
    position: {
        type: String,
        required: true
    },
    name: {
        type: String, 
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    email_id: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true,
    },
    linkedin: {
        type: String
    }
})

export const treasurycollection = new mongoose.model("treasurycollection", TreasurySchema);
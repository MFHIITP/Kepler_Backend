import mongoose from "mongoose";

const TeamMemberSchema = new mongoose.Schema({
    teamName: {
        type: [String],
        required: true,
        index: true
    },
    position: {
        type: String,
        required: true
    },
    name: {
        type: String, 
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
        index: true
    },
    degree: {
        type: String,
        required: true,
    },
    linkedIn: {
        type: String
    }
})

export const TeamMembersCollection = mongoose.model("teammemberschema", TeamMemberSchema);
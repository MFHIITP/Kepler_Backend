import mongoose from "mongoose";
var admittedCoursesSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true,
    },
    admittedCourses: {
        type: [String],
        index: true
    },
    visibleGroups: {
        type: [String]
    },
    selectedCourses: {
        type: [String]
    },
})

export const admittedCoursesModel = mongoose.model('admittedCoursesModel', admittedCoursesSchema);
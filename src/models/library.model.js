import mongoose from 'mongoose';

var librarySchema = new mongoose.Schema({
    course: {
        type: String,
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
})

const librarycollection = mongoose.model('librarycollection', librarySchema)
export default librarycollection;
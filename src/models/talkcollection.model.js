import mongoose from 'mongoose'

const talkschema = new mongoose.Schema({
    group_id: {
        type: Number || String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
    image: {
        type: String
    },
    image_title:{
        type: String
    },
    date:{
        type: String
    }
})

const talkcollection = mongoose.model('talkcollection', talkschema);
export default talkcollection
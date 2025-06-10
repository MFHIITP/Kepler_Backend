import mongoose from "mongoose";
var Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
  },
  college:{
    type: String
  },
  college_stream: {
    type: String
  },
  college_year: {
    type: String
  },
  school: {
    type: String
  },
  school_year: {
    type: String
  },
  refercode: {
    type: String || Number,
    required: true
  },
  usenumber:{
    type: Number,
    required: true
  },
  isvalid: {
    type: Number,
    required: true
  }
});

export const collection = mongoose.model("collection", Schema);
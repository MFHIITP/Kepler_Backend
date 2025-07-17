import mongoose from "mongoose";

const detailItem = new mongoose.Schema(
    {
        name: String,
        value: String,
        copy: Boolean,
        color: String,
        salutation: String,
    },
    {_id: false}
)

var admittedCoursesSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  admittedCourses: {
    type: [String],
    index: true,
  },
  visibleGroups: {
    type: [String],
  },
  selectedCourses: {
    type: [String],
  },
  transaction_details: {
    type: [detailItem],
  },
  payment_details: {
    type: [detailItem],
  },
  upcoming_payment_details: {
    type: [detailItem],
  },
  log_details: [{
    name: String,
    value1: String,
    value2: String,
    value3: String
  }],
  paidForMonth: {
    type: Boolean
  },
  paidMonth: {
    type: Number,
    min: 1,
    max: 12
  },
  lastDate: {
    type: Date
  }
});

export const admittedCoursesModel = mongoose.model("admittedCoursesModel", admittedCoursesSchema);

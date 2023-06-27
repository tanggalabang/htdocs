const mongoose = require('mongoose');

let contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, 
      index:true
    },
    mobile: {
      type: String,
      required: true, 
    },
    subject: {
      type: String,
      required: true, 
    },
    profession: {
      type: String,
      required: true, 
    },
    comment: {
      type: String,
      required: true, 
    },
    status: {
      type: String,
      default: "Submitted",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);

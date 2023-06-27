const mongoose = require('mongoose');

let tutorialSchema = new mongoose.Schema(
  {
    title: {
      unique: true,
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true, 
      unique: true,
      index: true,
    },
    tutorialCategory: {
      type: String,
      required: true,
    },
    tutorialCategorySlug: {
      type: String,
      required: true,
    },
    topicName: {
      unique: true,
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    keywords: {
      type: [],
      required: true,
    },  
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tutorial", tutorialSchema);

const { object } = require("@hapi/joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    categories: {
      type: Array,
    },
    location: {
      x: Number,
      y: Number,
    },
    images: {
      type: Object,
    },
    createdByUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    collection: "posts",
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);

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
      type: Array,
    },
    images: {
      type: Array,
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

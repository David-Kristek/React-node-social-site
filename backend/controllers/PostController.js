const User = require("../modules/User");
const Post = require("../modules/Post");
const multer = require("multer");
const Validation = require("../lib/validation");
const { array } = require("@hapi/joi");

const validate = new Validation();
class CategoryController {
  async add(req, res) {
    if (req.body.images)
      req.body.images = req.body.images.map((file) => file.filename); //to array
    var locationCoors;
    if (req.body.location) {
      locationCoors = {
        x: parseFloat(req.body.location[0]),
        y: parseFloat(req.body.location[1]),
        label: req.body.place,
      };
    }
    console.log(typeof req.body.categories);
    var categoriesArr = req.body.categories;
    if (typeof req.body.categories === "string")
      categoriesArr = [categoriesArr];

    const post = new Post({
      name: req.body.name,
      description: req.body.description,
      categories: req.body.categories,
      p: categoriesArr,
      location: locationCoors,
      images: req.body.images,
      createdByUser: req.user._id,
    });
    try {
      const save = await post.save();
      return res.json({ msg: "Post added" });
    } catch (err) {
      console.log(err, "error");
      return res.json({ err: err });
    }
  }
  async get(req, res) {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "categories",
        select: ["name"],
      })
      .populate("createdByUser")
      .populate({
        path: "likedByUsers",
        select: ["email"],
      })
      .populate("comments.commentedByUser");
    return res.send(posts);
  }
  upload_image(req, res, next) {
    if (!req.user) return;
    console.log(req.body);
    const { error } = validate.post(req.body);
    if (error) {
      console.log(error);
      return res.status(200).json({ err: error.details[0].message });
    }
    const files = req.files;
    if (!files) {
      req.body.images = false;
    }
    req.body.images = files;
    next();
  }
  async like_post(req, res) {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) return res.json({ err: true });
    if (post.likedByUsers.length > 0) {
      if (post.likedByUsers.includes(req.user._id)) {
        try {
          await Post.updateOne(
            { _id: postId },
            { $pull: { likedByUsers: req.user._id } }
          );
          return res.json({ msg: "unlike" });
        } catch (err) {
          console.log(err);
          return res.json({ err: true });
        }
      }
    }
    try {
      await Post.updateOne(
        { _id: postId },
        { $push: { likedByUsers: req.user._id } }
      );
    } catch (err) {
      console.log(err);
      return res.json({ err: true });
    }

    return res.json({ msg: "like" });
  }
  async comment_post(req, res) {
    const text = req.body.text;
    if (!text) return res.json({ err: "true1" });
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) return res.json({ err: "true2" });
    try {
      await Post.updateOne(
        { _id: postId },
        { $push: { comments: { commentedByUser: req.user._id, text: text } } }
      );
    } catch (err) {
      console.log(err);
      return res.json({ err: "true3" });
    }
    return res.json({ msg: "commented" });
  }
}
module.exports = CategoryController;

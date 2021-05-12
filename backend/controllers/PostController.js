const User = require("../modules/User");
const Post = require("../modules/Post");
const multer = require("multer");
const Validation = require("../lib/validation");

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
    const post = new Post({
      name: req.body.name,
      description: req.body.description,
      categories: req.body.categories,
      p: req.body.categories,
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
      .populate({
        path: "categories",
        select: ["name"],
      })
      .populate("createdByUser")
      .populate({
        path: "likedByUsers",
        select: ["email"],
      });
    return res.send(posts);
  }
  upload_image(req, res, next) {
    if (!req.user) return;
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
}
module.exports = CategoryController;

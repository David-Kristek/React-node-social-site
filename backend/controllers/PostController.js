const User = require("../modules/User");
const Post = require("../modules/Post");

const Validation = require("../lib/validation");

const validate = new Validation();
class CategoryController {
  async add(req, res) {
    const { error } = validate.post(req.body); //dodelat uploadnuti obrazku
    if (error) return res.status(200).send(error.details[0].message);

    const post = new Post({
      name: req.body.name,
      description: req.body.description,
      p: req.body.categories,
      location: req.body.location,
      images: req.body.images,
      createdByUser: req.user._id,
    });

    try {
      const save = await post.save();
      return res.send("Post added");
    } catch (err) {
      console.log(err, "error");
      return res.send(err);
    }
  }
  async get(req, res) {
    const posts = await Post.find();
    return res.send(posts);
  }
}
module.exports = CategoryController;

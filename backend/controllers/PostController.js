const User = require("../modules/User");
const Post = require("../modules/Post");
const multer = require("multer");
const Validation = require("../lib/validation");

const validate = new Validation();

class CategoryController {
  async add(req, res) {
    console.log("post");
    if(req.body.images) req.body.images = req.body.images.map((file) => file.filename); //to array
    var locationCoors; 
    if(req.body.location){
      locationCoors = {
        x: parseFloat(req.body.location[0]),
        y: parseFloat(req.body.location[1]),
      }
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
    console.log(post);
    try {
      const save = await post.save();
      return res.json({ msg: "Post added" });
    } catch (err) {
      console.log(err, "error");
      return res.json({ err: err });
    }
  }
  async get(req, res) {
    const posts = await Post.find();
    return res.send(posts);
  }
}
module.exports = CategoryController;

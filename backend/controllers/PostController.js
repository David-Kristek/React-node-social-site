const User = require("../modules/User");
const Post = require("../modules/Post");
const multer = require("multer");
const Validation = require("../lib/validation");

const validate = new Validation();

const DIR = "./public/uploaded-images";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

class CategoryController {
  async add(req, res) {
    console.log("post");

    req.body.images = req.body.images.map((file) => file.filename); //to array
    const { error } = validate.post(req.body);
    if (error) {
      console.log(error);
      return res.status(200).send(error.details[0].message);
    }
    var post;
    post = new Post({
      name: req.body.name,
      description: req.body.description,
      categories: req.body.categories,
      p: req.body.categories,
      location: {
        x: parseFloat(req.body.location[0]),
        y: parseFloat(req.body.location[1]),
      },
      images: req.body.images,
      createdByUser: req.user._id,
    });
    console.log(post);
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

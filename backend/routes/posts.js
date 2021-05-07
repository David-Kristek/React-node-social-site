const router = require("express").Router();
const PostController = require("../controllers/PostController");
const checkAuth = require("../lib/chectAuth");
const multer = require("multer");

const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOAD_IMAGE_LOCATION); //env - image location
  },
  filename: function (req, file, cb) {
    cb(null, Date.now().toString() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });

const post = new PostController();

router.get("/", post.get);
// router.post("/add",post.add);
router.post("/add", upload.single("image"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return res.send(error);
  }
  req.body.file = file; 
  next(); 
}, post.add);

module.exports = router;

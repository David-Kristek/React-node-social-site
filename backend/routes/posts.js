const router = require("express").Router();
const PostController = require("../controllers/PostController");
const checkAuth = require("../lib/chectAuth");
const multer = require("multer");
const Validation = require("../lib/validation");
const validate = new Validation();

const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOAD_IMAGE_LOCATION); //env - image location
  },
  filename: function (req, file, cb) {
    cb(null, Date.now().toString() + "-" + file.originalname);
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
      return res.json({err: "Only .png, .jpg and .jpeg format allowed!"})
      // return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

const post = new PostController();

router.get("/", post.get);
// router.post("/add",post.add);
router.post(
  "/add",
  checkAuth,
  upload.array("images", 5),
  (req, res, next) => {
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
  },
  post.add
);

module.exports = router;

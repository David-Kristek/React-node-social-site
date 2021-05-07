const router = require("express").Router();
const PostController = require("../controllers/PostController"); 
const checkAuth = require("../lib/chectAuth");

const post = new PostController(); 

router.get("/", post.get)
// router.post("/add",post.add); 
router.post("/add", post.add); 

module.exports = router;
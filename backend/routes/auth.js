const router = require("express").Router();
const GoogleAuthController = require("../controllers/googleAuthController");
const checkAuth = require("../lib/chectAuth");

const googleAuth = new GoogleAuthController();
router.post("/googlelogin", googleAuth.login);
router.get("/is_logged", checkAuth, googleAuth.isLogged);

module.exports = router;

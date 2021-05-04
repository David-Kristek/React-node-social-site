const bcrypt = require("bcryptjs");
const User = require("../modules/User");
const jwt = require("jsonwebtoken");
const Validation = require("../lib/validation");
//comment
const validate = new Validation();

class AuthController {
  async register(req, res) {
    req.body = await JSON.parse(req.body.body);
    console.log(req.body);
    const { error } = validate.register(req.body); //dodelat uploadnuti obrazku
    if (error) return res.status(200).send(error.details[0].message);

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(200).send("Email already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      image: "zatim zadny",
    });
    try {
      const save = await user.save();
      return res.send("Succesfully registered");
    } catch (err) {
      return res.status(200).send(err);
    }
  }
  async login(req, res) {
    //uncomment for postman
    // req.body = await JSON.parse(req.body.body);  
    console.log(req.body);
    const { error } = validate.login(req.body);
    if (error) return res.json({ error: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.json({ error: "Email or password is wrong" });
    if (user.password === "google-log")
      return res.json({ error: "Please log in with google" });

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.json({ error: "Email or password is wrong" });
    console.log(process.env.TOKEN_SECRET);
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.TOKEN_SECRET
    );
    return res.json({
      token: token,
      user: {
        name: user.name,
        email: user.email,
        picture: user.image,
      },
    });
    // return res.send("Logged in");
  }
}

module.exports = AuthController;

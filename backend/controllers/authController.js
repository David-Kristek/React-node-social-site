const bcrypt = require("bcryptjs");
const User = require("../modules/User");
const jwt = require("jsonwebtoken");
const Validation = require("../lib/validation");

const validate = new Validation();

class AuthController {

  async register(req, res) {
    const { error } = validate.register(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    try {
      const save = await user.save();
      return res.json(save);
    } catch (err) {
      return res.status(400).send(err);
    }
  }
  async login(req, res) {
    const { error } = validate.login(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email or password is wrong");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Email or password is wrong");
    console.log(process.env.TOKEN_SECRET);
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.TOKEN_SECRET
    );
    return res.header("auth-token", token).send(token);
    // return res.send("Logged in");
  }
}


module.exports = AuthController;
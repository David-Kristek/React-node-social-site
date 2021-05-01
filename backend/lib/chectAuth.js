const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../modules/User");
const CLIENT_ID =
  "236995755291-85hhe3gi2eaofgemhvcbv1horm067upu.apps.googleusercontent.com";

const client = new OAuth2Client(CLIENT_ID);

const checkAuthenticated = async (req, res, next) => {
  let token = req.header("auth-token"); // token dame pres header - auth-token
  let type = req.header("type");
  if (!token || !type) return res.status(402).send("unauthorized1");
  let user = {};
  var ticket;
  try {
    if (type === "google") {
      ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      });
      if (!ticket) return res.status(402).send("unauthorized2");
      const payload = ticket.getPayload();
      user.name = payload.name;
      user.email = payload.email;
      user.picture = payload.picture;
      req.user = user;
    } else if (type === "JWT") {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = await User.findOne({_id: verified._id});
    }
    else{
      return res.status(402).json({ msg: "unauthorized3"});
    }
  } catch (err) {
    return res.status(402).json({ msg: "unauthorized4", err: err });
  }

  next();
};

module.exports = checkAuthenticated; 
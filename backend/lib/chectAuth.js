const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID = "236995755291-85hhe3gi2eaofgemhvcbv1horm067upu.apps.googleusercontent.com";

const client = new OAuth2Client(CLIENT_ID);

const checkAuthenticated = async (req, res, next) => {
  let token = req.header("auth-token"); // token dame pres header - auth-token
  if (!token) return res.status(402).send("unauthorized");
  let user = {};
  var ticket; 
  try{
    ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
  }
  catch(err){
    return res.status(402).json({msg: "unauthorized", err: err});
  }
  if (!ticket) return res.status(402).send("unauthorized");
  const payload = ticket.getPayload();
  user.name = payload.name;
  user.email = payload.email;
  user.picture = payload.picture;
  req.user = user;
  next();
};
// nebo 
module.exports = function auth(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Unauthorized");
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified; 
    next(); 
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
}
module.exports = checkAuthenticated;

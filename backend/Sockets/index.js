const PostController = require("../controllers/PostController");

const posts = new PostController();
const getComments = (socket, postId) => {
  posts.get_post_comments(postId).then((res) => {
    socket.broadcast.emit("getComments", res);
  });
};
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("actComment", (postId) => {
      getComments(socket, postId);
    });
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

import axios from "axios";

export const addPost = async (formData: any) => {
  try {
    const response = await axios("https://social-site-server.herokuapp.com/api/posts/add", {
      method: "POST",
      data: formData,
      headers: {
        token: localStorage.getItem("token"),
        "auth-type": localStorage.getItem("auth-type"),
      },
    });
    return response.data;
  } catch (err) {
    return { err: "Something went wrong" };
  }
};
export const getPosts = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://social-site-server.herokuapp.com/api/posts",
    });
    return response;
  } catch (err) {
    return false;
  }
};
export const likePost = async (postId: string) => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://social-site-server.herokuapp.com/api/posts/like/" + postId,
      headers: {
        token: localStorage.getItem("token"),
        "auth-type": localStorage.getItem("auth-type"),
      },
    });
    return response;
  } catch (err) {
    return false;
  }
};
export const addCommentF = async (postId: string, text: string) => {
  var bodyFormData = new FormData();
  bodyFormData.append("text", text);
  try {
    const response = await axios({
      method: "POST",
      url: "https://social-site-server.herokuapp.com/api/posts/comment/" + postId,
      headers: {
        token: localStorage.getItem("token"),
        "auth-type": localStorage.getItem("auth-type"),
      },
      data: {text: text}
    });
    return response;
  } catch (err) {
    return false;
  }
};

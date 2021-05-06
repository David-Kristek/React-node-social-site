import axios from "axios";

export const addPosts = async (body : any) => {
  console.log(body);

  try {
    const response = await axios({
      method: "POST",
      url: "http://localhost:5000/api/posts/add",
      data: body, 
      headers: {
        "token": localStorage.getItem("token"),
        "auth-type": localStorage.getItem("auth-type"),
      },
    });
    return response;
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const getPosts = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: "http://localhost:5000/api/posts",
    });
    return response;
  } catch (err) {
    console.log(err);
    return false;
  }
};

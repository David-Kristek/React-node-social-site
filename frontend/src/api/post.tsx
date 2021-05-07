import axios from "axios";

export const addPost = async (formData: any) => {
  try {
    const response = await axios("http://localhost:5000/api/posts/add", {
      method: "POST",
      data: formData,
      headers: {
        token: localStorage.getItem("token"),
        "auth-type": localStorage.getItem("auth-type"),
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return {err: "Something went wrong"};
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

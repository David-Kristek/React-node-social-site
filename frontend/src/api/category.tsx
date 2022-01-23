import axios from "axios";

export const getCategory = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://social-site-server.herokuapp.com/api/category",
    });
    return response;
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const addCategory = async (body : any) => {
  console.log(body);

  try {
    const response = await axios({
      method: "POST",
      url: "https://social-site-server.herokuapp.com/api/category/add",
      data: body, 
      headers: {
        "token": localStorage.getItem("token"),
        "auth-type": localStorage.getItem("auth-type"),
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};
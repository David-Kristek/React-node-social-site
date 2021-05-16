import axios from "axios";
const fetchData = async (method: Method, url: string, body?: any) => {
  try {
    const response = await axios({
      method,
      url: "http://10.0.0.7:5000/api/admin/" + url,
      headers: {
        token: localStorage.getItem("token"),
        "auth-type": localStorage.getItem("auth-type"),
      },
      data: body,
    });
    return response;
  } catch (err) {
    return false;
  }
};

export const getUsers = () => {
  return fetchData("GET", "users");
};
export const makeAdmin = (userId: string) => {
  return fetchData("GET", "users/admin/" + userId);
};
export const deleteAdmin = (userId: string) => {
  return fetchData("DELETE", "users/admin/" + userId);
};
export const deleteUser = (userId: string) => {
  return fetchData("DELETE", "users/" + userId);
};

export const getCategories = () => {
  return fetchData("GET", "categories");
};

export const approveCategory = (categoryId: string) => {
  return fetchData("GET", "categories/" + categoryId);
};

export const addCategory = async (body: any) => {
  return fetchData("POST", "categories", body);
};

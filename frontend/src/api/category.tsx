import axios from "axios";

export const getCategory = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: "http://localhost:5000/api/category",
    });
    return response;
  } catch (err) {
    console.log(err);
    return false;
  }
};

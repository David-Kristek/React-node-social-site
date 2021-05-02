import axios from "axios";

export const googleLogin = async (response: any) => {
  try {
    const resp = await axios({
      method: "POST",
      url: "http://localhost:5000/api/auth/googlelogin",
      data: {
        tokenId: { tokenId: response.tokenId },
      },
    });
    const token = resp.data.token;
    console.log(resp);
    if ("token" in resp.data) {
      localStorage.setItem("token", token);
      localStorage.setItem("auth-type", "google"); 
      // isLogged("google");
      return { msg: "success", user: resp.data.user, error: "" };
    }
  } catch (err) {
    console.log(err);
  }
  return {msg: "failed", user: {}, error: "Something went wrong"};
};

// type LogType = "JWT" | "google";

export const isLogged = async (type: string | null) => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://localhost:5000/api/auth/is_logged",
      headers: {
        "auth-token": localStorage.getItem("token"),
        type: type,
      },
    });
    if ((res.data.msg = "success" && res.data.user.email)) {
      return res.data.user; 
    } else {
      return false; 
    }
  } catch (err) {
    return false; 
  }
};

export const login = async (data: any) => {
  try {
    const resp = await axios({
      method: "POST",
      url: "http://localhost:5000/api/auth/login",
      data: { body: JSON.stringify(data) },
    });
    const token = resp.data.token;
    console.log(resp);
    if ("token" in resp.data) {
      localStorage.setItem("token", token);
      localStorage.setItem("auth-type", "JWT"); 
      // isLogged("JWT");
      return { msg: "success", user: resp.data.user };
    } else if ("error" in resp.data) {
      return resp.data.error;
    } else {
      return "Something went wrong";
    }
  } catch (err) {
    console.log(err);
  }
};
export const register = async (data: any) => {
  try {
    const resp = await axios({
      method: "POST",
      url: "http://localhost:5000/api/auth/register",
      data: { body: JSON.stringify(data) },
    });
    console.log(resp);
    if (resp.data === "Succesfully registered") {
      console.log("here we go");
      return "now login";
    } else if (resp.data) {
      return resp.data; //error
    } else {
      return "Something went wrong"; //server error
    }
  } catch (err) {
    console.log(err);
    return "Something went wrong"; //server error
  }
};

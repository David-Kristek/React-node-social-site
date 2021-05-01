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
      isLogged("google");
    }
  } catch (err) {
    console.log(err);
  }
};

type LogType = "JWT" | "google";

export const isLogged = async (type: LogType) => {
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
      console.log("a jedem");
    } else {
      console.log("nope not signed");
    }
  } catch (err) {
    console.log("nope not signed");
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
      // isLogged("JWT");
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
    }
    else if(resp.data){
      return resp.data; //error
    }
    else {
      return "Something went wrong"; //server error
    }
  } catch (err) {
    console.log(err);
    return "Something went wrong"; //server error
  }
};

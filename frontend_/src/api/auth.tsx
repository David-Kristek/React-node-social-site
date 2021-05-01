import axios from "axios"; 

export const googleLogin = (response : any) => {
  axios({
    method: "POST",
    url: "http://localhost:5000/api/auth/googlelogin",
    data: {
      tokenId: { tokenId: response.tokenId },
    },
  })
    .then((resp) => {
      const token = resp.data.token;
      console.log(resp);
      if ("token" in resp.data) {
        localStorage.setItem("token", token);
        isLogged();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const isLogged = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:5000/api/auth/is_logged",
        headers: {
          'auth-token': localStorage.getItem("token")
        }
      })
      if(res.data.msg = "success" && res.data.user.email) {
        console.log("a jedem");
      }
      else{
        console.log("nope not signed");
      }
    }
    catch (err) {
      console.log("nope not signed");
    }
  }

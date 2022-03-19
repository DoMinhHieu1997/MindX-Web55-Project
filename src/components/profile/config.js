import axios from "axios";

// const host = "http://localhost:5000";
const host = "https://cooking-holics-backend.herokuapp.com/";

export const http = axios.create({
  baseURL: host,
});
http.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
    if(token&&!config.headers.authorization){
      config.headers.authorization='Bearer ' + token
    }
    return config
});
export const isLogged = () => {
  return false;
};
export const Logo = () => {
  return (
    <div
      style={{
        height: "100px",
        display: "flex",
        justifyContent: "center",
        lineHeight: "70px",
      }}
    >
      Logo
    </div>
  );
};

export const checkUser = async (user) => {
  return false;
};

export const checkEmail = async (email) => {
  return false;
};

export const loginUser = async (data) => {
  console.log(data);
  http.post("/auth/login", data).then((res) => {
    data.keepLogin && localStorage.setItem("token", res.data.data.tocken);
    sessionStorage.setItem("token", res.data.data.tocken);
  });
};
export const registerUser = async (data) => {
  try {
    const result = await http.post("/auth/register", data);
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

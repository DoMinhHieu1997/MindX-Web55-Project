import axios from "axios";

// const host = "http://localhost:5000";
const host = "https://cooking-holics-backend.herokuapp.com/";

export const http = axios.create({
  baseURL: host,
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
  http.post('/auth/login',data).then((rej,res)=>console.log('res',res,rej))
};
export const registerUser = async (data) => {
  try {
    const result = await http.post("/auth/register", data);
    return result.data;
  } catch (error) {
    return error.response.data;
  } 
};

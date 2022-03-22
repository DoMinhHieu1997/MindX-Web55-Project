import axios from "axios";
import {COMMON} from "../Common";
import LogoImage from "../../assets/logo-image.png";


// const host = "http://localhost:5000";
const host = COMMON.DOMAIN;

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
 return localStorage.getItem("token");
};
export const Logo = () => {
  return (<>
    <div className="col-2 col-3 mx-auto">
      <img className="w-100" src={LogoImage}/>
    </div>
    <div
      className="text-center pt-3 h4 mb-4"
      style={{
        fontFamily: "Lobster, cursive"
      }}
    >
      COOKING HOLICS
    </div>
  </>
    
  );
};

// export const checkUser = async (user) => {
//   return false;
// };

// export const checkEmail = async (email) => {
//   return false;
// };


import axios from "axios";
import {COMMON} from "../Common";


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
export const isLogged  = () => {
 return localStorage.getItem("token")||sessionStorage.getItem('token');
};
export const Logo = () => {
  return (
    <div
      className="text-center pt-4 h4 mb-4"
      style={{
        fontFamily: "Lobster, cursive"
      }}
    >
      COOKING HOLICS
    </div>
  );
};




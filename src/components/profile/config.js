import axios from "axios";
import {COMMON} from "../Common";


// export const host = "http://localhost:5000";
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

export const firebaseConfig = {
  apiKey: "AIzaSyCC2ptrgtydbhqN-Ns2sNEREqVMLQMc0pM",
  authDomain: "test65-eb61e.firebaseapp.com",
  databaseURL: "https://test65-eb61e.firebaseio.com",
  projectId: "test65-eb61e",
  storageBucket: "test65-eb61e.appspot.com",
  messagingSenderId: "611505225653",
  appId: "1:611505225653:web:ecaa42073573961aa423fc",
};


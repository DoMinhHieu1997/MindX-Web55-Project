import { createContext } from "react";

const AppCtx = createContext({
  userInfo:{},
  userToken:null,
  openLoginNotify:null,
  setUserInfo: () => {},
  setOpenLoginNotify: () => {},
});

export default AppCtx;
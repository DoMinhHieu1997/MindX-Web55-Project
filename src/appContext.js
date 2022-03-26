import { createContext } from "react";

const AppCtx = createContext({
  userInfo:{},
  userToken:null,
  openLoginNotify:null,
  setUserInfo: () => {},
  setOpenLoginNotify: () => {},
  setUserToken: () => {}
});

export default AppCtx; 
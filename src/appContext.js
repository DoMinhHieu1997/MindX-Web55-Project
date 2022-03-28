import { createContext } from "react";

const AppCtx = createContext({
  userInfo:{},
  openLoginNotify:null,
  setUserInfo: () => {},
  setOpenLoginNotify: () => {},
});

export default AppCtx; 
import { createContext } from "react";

const AppCtx = createContext({
  userInfo:{},
  userToken:null,
  setUserInfo: () => {}
});

export default AppCtx;
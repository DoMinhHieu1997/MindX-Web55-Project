import {Routes, Route} from "react-router-dom";
import { useState,useEffect } from "react";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/profile/Login";
import Register from "./components//profile/Register";
import Recipes from "./components/Recipes";
import FloatingAction from "./components/shared/FloatingAction";
import NotFound from "./components/NotFound";
import Detail from "./components/Detail";
import FoodRecommendation from "./components/shared/FoodRecommendation";
import TimeTable from "./components/shared/TimeTable";
import Search from "./components/Search";
import SearchCtx from "./appContext";
import {COMMON} from "./components/Common";

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserToken(token);
      setUserInfo("Minh Hiếu");
      fetch(`${COMMON.DOMAIN}user/info`,{
        method: "GET",
        headers: {
          'Content-type':'application/json',
          'Authorization':"Bearer "+token
        }
      })
      .then(res => res.json())
      .then(resJson => {
        setUserInfo(resJson.data);
      });
    }
  });

  return (
    <div className="App">
      <SearchCtx.Provider value={{userInfo:userInfo, setUserInfo:setUserInfo, userToken: userToken, setUserToken:setUserToken}}>
        <Menu />
        <FloatingAction />
        {/* <FoodRecommendation />
        <TimeTable /> */}
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/cong-thuc" element={<Recipes />}/>
          <Route path="/lien-he" element={<Home />}/>
          <Route path="/gioi-thieu" element={<Home />}/>
          <Route path="/dang-nhap" element={<Login />}/>
          <Route path="/dang-ky" element={<Register />}/>
          <Route path="/chi-tiet/:id" element={<Detail />}/>
          <Route path="/tim-kiem" element={<Search />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
        <Footer />
      </SearchCtx.Provider>
    </div>
  );
}

export default App;

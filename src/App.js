import {Routes, Route} from "react-router-dom";
import { useState } from "react";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/profile/Login";
import Register from "./components/profile/Register";
import Recipes from "./components/Recipes";
import NewPosts from "./components/posts/NewPosts";
import FloatingAction from "./components/shared/FloatingAction";
import NotFound from "./components/NotFound";
import Detail from "./components/Detail";
import Profile from "./components/profilePage/Profile"
import MyProfile from "./components/profilePage/MyProfile"
import MyPost from "./components/profilePage/MyPost"
import SavedPost from "./components/profilePage/SavedPost"
import FoodRecommendation from "./components/shared/FoodRecommendation";
import TimeTable from "./components/shared/TimeTable";
import Search from "./components/Search";
import SearchCtx from "./appContext";

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="App">
      
      <SearchCtx.Provider value={{searchValue, setSearchValue}}>
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
          <Route path="/ho-so" element={<Profile />}>
          <Route path="" element={<MyProfile />}></Route>
          <Route path="bai-viet-cua-toi" element={<MyPost />}></Route>
          <Route path="bai-viet-da-luu" element={<SavedPost />}></Route>
        </Route>
          <Route path="/tao-bai-viet" element={<NewPosts />}/>
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

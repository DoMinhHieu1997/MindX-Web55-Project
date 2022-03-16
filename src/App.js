import Menu from "./components/Menu";
import {Routes, Route} from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/profile/Login";
import Register from "./components//profile/Register";
import Recipes from "./components/Recipes";
import NewPosts from "./components/posts/NewPosts";
import FloatingAction from "./components/shared/FloatingAction";
import NotFound from "./components/NotFound";
import Detail from "./components/Detail";
import FoodRecommendation from "./components/shared/FoodRecommendation";
import TimeTable from "./components/shared/TimeTable";
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
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
        <Route path="/tao-bai-viet" element={<NewPosts />}/>
        <Route path="/chi-tiet/:id" element={<Detail />}/>
        <Route path="/tim-kiem/:keyword" element={<Search />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

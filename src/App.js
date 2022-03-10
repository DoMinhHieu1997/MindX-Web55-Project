import Menu from "./components/Menu";
import {Routes, Route} from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cong-thuc" element={<Home />}/>
        <Route path="/dang-nhap" element={<Login />}/>
        <Route path="/dang-ky" element={<Register />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

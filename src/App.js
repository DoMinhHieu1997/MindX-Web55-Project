import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/profile/Login";
import Register from "./components/profile/Register";
import Recipes from "./components/Recipes";
import NotFound from "./components/NotFound";
import Detail from "./components/Detail";
import Profile from "./components/profilePage/Profile";
import MyProfile from "./components/profilePage/MyProfile";
import MyPost from "./components/profilePage/MyPost";
import SavedPost from "./components/profilePage/SavedPost";
import FoodRecommendation from "./components/shared/FoodRecommendation";
import TimeTable from "./components/shared/TimeTable";
import Search from "./components/Search";
import AppCtx from "./appContext";
import { COMMON } from "./components/Common";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

function App() {
    let navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [openLoginNotify, setOpenLoginNotify] = useState(false);

    const handleClose = () => {
        setOpenLoginNotify(false);
    };

    const handleLDirectToLogin = () => {
        setOpenLoginNotify(false);
        navigate("/dang-nhap");
    };

    useEffect(() => {
        const token = sessionStorage.getItem("token") || localStorage.getItem("token");
        
        if (token) {
            setUserToken(token);
            fetch(`${COMMON.DOMAIN}user/info`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + token,
                },
            })
            .then((res) => res.json())
            .then((resJson) => {
                setUserInfo(resJson.data);
            });
        }
    }, []);

    return (
        <div className="App">
            <AppCtx.Provider
                value={{
                    userInfo: userInfo,
                    setUserInfo: setUserInfo,
                    openLoginNotify: openLoginNotify,
                    setOpenLoginNotify: setOpenLoginNotify,
                }}
            >
                <Menu />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cong-thuc" element={<Recipes />} />
                    <Route path="/cong-thuc/:page" element={<Recipes />} />
                    <Route path="/dang-nhap" element={<Login />} />
                    <Route path="/dang-ky" element={<Register />} />
                    <Route path="/ho-so" element={<Profile />}></Route>
                    <Route path="/chi-tiet/:id" element={<Detail />} />
                    <Route path="/tim-kiem" element={<Search />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />

                <Dialog
                    open={openLoginNotify}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Yêu cầu đăng nhập</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Đặng nhập ngay để thực hiện thao tác bạn muốn
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Đóng</Button>
                        <Button onClick={handleLDirectToLogin}>Đăng nhập</Button>
                    </DialogActions>
                </Dialog>
            </AppCtx.Provider>
        </div>
    );
}

export default App;

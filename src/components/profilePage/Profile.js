import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useState, useEffect, useContext } from "react";
import { http } from "../profile/config";
import SkeletonItem from "../shared/SkeletonItem";
import { Navigate } from "react-router-dom";
import MyProfile from "./MyProfile";
import SavedPost from "./SavedPost";
import MyPost from "./MyPost";
import AppCtx from "../../appContext";
const Profile = () => {
    const appCtx = useContext(AppCtx);
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState("Loading");
    const [nav, setNav] = useState("MyProfile");

    useEffect(() => {
        if(!appCtx.userInfo){
            setIsLoading(true);
        }
        setUserData(appCtx.userInfo);
        setIsLoading(false);
    }, [appCtx]);
    console.log(appCtx.userInfo)
    const HandlelogOut = () => {
        localStorage.removeItem("token");
    };
    if (!token) {
        return <Navigate to="/dang-nhap" replace />;
    }
    return (
        <div className="container py-5">
            <div className="position-fixed top-50 end-0"></div>
            <div className="row mt-5 gx-3">
                <div className="col-md-4 rounded-2">
                    <div className="row">
                        <div className="col-12">
                            <div className="border px-4 py-4">
                                {isLoading && <SkeletonItem type="1" />}
                                {userData && !isLoading && (
                                    <>
                                        <div className="row justify-content-center">
                                            <div className="col-10">
                                                <div
                                                    className="ratio ratio-1x1 bg-secondary"
                                                    style={{ backgroundImage: `url(${userData.avatar})`, backgroundPosition: "center", backgroundSize: "cover" }}
                                                ></div>
                                            </div>
                                        </div>
                                        <div className="row justify-content-center pt-3">
                                            <div className="col-auto h3">{userData.nameDisplay}</div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="nav nav-pills flex-column border px-4 py-4">
                                {isLoading && (
                                    <div className="col-6 mb-4 col-sm-12">
                                        <div className="py-3 skeleton mt-2"></div>
                                        <div className="py-3 skeleton mt-2"></div>
                                        <div className="py-3 skeleton mt-2"></div>
                                    </div>
                                )}
                                {userData && !isLoading && (
                                    <>
                                        <div className="nav-item">
                                            <div
                                                className={
                                                    nav === "MyProfile"
                                                        ? "nav-link link-secondary m-2 active"
                                                        : "nav-link link-secondary m-2"
                                                }
                                                onClick={() => {
                                                    setNav("MyProfile");
                                                }}
                                            >
                                                Tài khoản của tôi
                                            </div>
                                        </div>
                                        <div className="nav-item">
                                            <div
                                                className={
                                                    nav === "SavedPost"
                                                        ? "nav-link link-secondary m-2 active"
                                                        : "nav-link link-secondary m-2"
                                                }
                                                onClick={() => {
                                                    setNav("SavedPost");
                                                }}
                                            >
                                                Tin đã lưu ({userData.listBookmark && userData.listBookmark.length})
                                            </div>
                                        </div>
                                        <div className="nav-item">
                                            <div
                                                className={
                                                    nav === "MyPost"
                                                        ? "nav-link link-secondary m-2 active"
                                                        : "nav-link link-secondary m-2"
                                                }
                                                onClick={() => {
                                                    setNav("MyPost");
                                                }}
                                            >
                                                Danh sách bài viết
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="border px-4 py-4">
                                <div className="row">
                                    <button className="col-auto btn btn-warning" onClick={HandlelogOut}>
                                        Thoát <LogoutOutlinedIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {nav === "MyProfile" && (
                    <MyProfile
                        userData={userData}
                        setUserData={setUserData}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        appCtx={appCtx}
                    />
                )}
                {nav === "SavedPost" && <SavedPost />}
                {nav === "MyPost" && <MyPost id={userData._id} />}
            </div>
        </div>
    );
};

export default Profile;

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import COMMON from "../Common";
import { http } from "../profile/config";
import SkeletonItem from "../shared/SkeletonItem";
import {Navigate} from 'react-router-dom'
const Profile = () => {
    const token = localStorage.getItem("token");

    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState("");

    const HandlelogOut= ()=>{
        localStorage.removeItem("token");
        userData={}
    }

    useEffect(() => {
        setIsLoading(true);
        http.get("user/info", {
            headers: {
                tocken: token,
            },
        })
            // .then(res=>{
            //     res.json()
            // })
            .then((resJson) => {
                setUserData(resJson["data"]["data"]);
                setIsLoading(false);
            });
    }, [token,userData]);

    // console.log(userData.listBookmark);
    if(!token){
        return <Navigate to="/dang-nhap" replace />
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
                                {userData && (
                                    <>
                                        <div className="row justify-content-center">
                                            <div className="col-10">
                                                <div
                                                    className="ratio ratio-1x1 bg-secondary"
                                                    style={{ backgroundImage: `url(${userData.avatar})` }}
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
                                {userData && (
                                    <>
                                        <div className="nav-item">
                                            <NavLink className="nav-link link-secondary m-2" to="/ho-so/">
                                                Tài khoản của tôi
                                            </NavLink>
                                        </div>
                                        <div className="nav-item">
                                            <NavLink
                                                className="nav-link link-secondary m-2"
                                                to="/ho-so/bai-viet-da-luu"
                                            >
                                                Tin đã lưu ()
                                            </NavLink>
                                        </div>
                                        <div className="nav-item">
                                            <NavLink
                                                className="nav-link link-secondary m-2"
                                                to="/ho-so/bai-viet-cua-toi"
                                            >
                                                Danh sách bài viết
                                            </NavLink>
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
                                    <button className="col-auto" onClick={HandlelogOut}>
                                        Thoát <LogoutOutlinedIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Outlet userData={userData} />
            </div>
        </div>
    );
};

export default Profile;

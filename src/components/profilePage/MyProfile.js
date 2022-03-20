import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useState, useEffect } from "react";
import COMMON from "../Common";
import {http} from '../profile/config'
const MyProfile = () => {
    const token = localStorage.getItem("token");

    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState("");

    useEffect(() => {
        http.get('user/info', {
            headers: {
                tocken: token
            }
        })
        .then(res=>{
            console.log(res);
        })
    }, [])
    console.log(userData);
    return (
        <div className="my-profile col-md-8 border ml-2">
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12 h2 pb-4 pt-3">Tài khoản của tôi</div>
                    </div>
                    <div className="row">
                        <div className="col-12 pb-2">Ảnh đại diện</div>
                    </div>
                    <div className="row">
                        <div className="col-12 pb-5">
                            <input type="file" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 pb-2">Tên đăng nhập</div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-6 pb-3">
                            <input type="text" className="w-100" />
                        </div>
                        <div className="col-auto ">Thay đổi</div>
                    </div>
                    <div className="row">
                        <div className="col-12 pb-3">Mật khẩu</div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-6 pb-5">
                            <input type="text" className="w-100" />
                        </div>
                        <div className="col-auto ">Đổi mật khẩu</div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="border mx-3 p-3">
                        <div className="row justify-content-end">
                            <div className="col-auto">
                                <CloseOutlinedIcon />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 pb-2">Mật khẩu</div>
                        </div>
                        <div className="row ">
                            <div className="col-6 pb-2">
                                <input type="text" className="w-100" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 pb-2">Mật khẩu mới</div>
                        </div>
                        <div className="row">
                            <div className="col-6 pb-3 ">
                                <input type="text" className="w-100" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 pb-2">
                                <button className="btn bg-92AD95 w-100 text-white">Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MyProfile;

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { NavLink, Outlet } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';

const Profile = () => {
    return (
        <div className="container py-5">
            <div className="position-fixed top-50 end-0">
                <div className="row flex-column">
                    <div className="py-2">
                        <AddCircleOutlineIcon sx={{ fontSize: 40 }} />
                    </div>
                    <div className="py-2">
                        <KeyboardAltOutlinedIcon sx={{ fontSize: 40 }} />
                    </div>
                    <div className="py-2">
                        <ColorLensOutlinedIcon sx={{ fontSize: 40 }} />
                    </div>
                </div>
            </div>
            <div className="row mt-5 gx-3">
                <div className="col-md-4 rounded-2">
                    <div className="row">
                        <div className="col-12">
                            <div className="border px-4 py-4">
                                <div className="row justify-content-center">
                                    <div className="col-10">
                                        <div className="ratio ratio-1x1 bg-secondary"></div>
                                    </div>
                                </div>
                                <div className="row justify-content-center pt-3">
                                    <div className="col-auto h3">Tên tài khoản</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="nav nav-pills flex-column border px-4 py-4">
                                <div className="nav-item">
                                    <NavLink className="nav-link link-secondary m-2" to="/ho-so/">
                                        Tài khoản của tôi
                                    </NavLink>
                                </div>
                                <div className="nav-item">
                                    <NavLink className="nav-link link-secondary m-2" to="/ho-so/bai-viet-da-luu">
                                        Tin đã lưu (10)
                                    </NavLink>
                                </div>
                                <div className="nav-item">
                                    <NavLink className="nav-link link-secondary m-2" to="/ho-so/bai-viet-cua-toi">
                                        Danh sách bài viết
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="border px-4 py-4">
                                <div className="row">
                                    <div className="col-auto">
                                        Thoát <LogoutOutlinedIcon />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default Profile;

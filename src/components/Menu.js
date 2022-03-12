import { Link, NavLink } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Menu = () => {
    return (
        <div className="bg-92AD95 py-3">
            <div className="container d-flex align-items-center justify-content-between position-relative">
                <ul className="list-unstyled d-flex">
                    <li className="me-4">
                        <NavLink className="text-white" to="/">
                            Trang chủ
                        </NavLink>
                    </li>
                    <li className="me-4">
                        <NavLink className="text-white" to="/cong-thuc">
                            Công thức
                        </NavLink>
                    </li>
                    <li className="me-4">
                        <NavLink className="text-white" to="/lien-he">
                            Liên hệ
                        </NavLink>
                    </li>
                    <li className="me-4">
                        <NavLink className="text-white" to="/gioi-thieu">
                            Giới thiệu
                        </NavLink>
                    </li>
                </ul>
                <div className="position-absolute top-50 start-50 translate-middle">
                    <h1 className="text-white">LOGO</h1>
                </div>
                <div className="row align-items-center">
                    <div className="col-auto">
                        <div className="bg-white rounded-pill overflow-hidden px-2 py-1">
                            <div className="row gx-1">
                                <div className="col-auto">
                                    <input type="text" placeholder="Tìm kiếm..." className="border-0" />
                                </div>
                                <div className="col-auto">
                                    <SearchOutlinedIcon />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="user-nav col-auto">
                        <Link className="text-white" to="/ho-so">
                            <AccountCircleOutlinedIcon />
                        </Link>
                        <div className="user-menu row flex-column position-absolute end-0 bg-white shadow rounded">
                            <div className="col-auto text-nowrap px-2 py-1 border-bottom ">Đăng nhập</div>
                            <div className="col-auto text-nowrap px-2 py-1">Đăng xuất</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;

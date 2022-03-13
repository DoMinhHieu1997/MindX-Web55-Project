import { NavLink } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import AccountIcon from '@mui/icons-material/AccountCircleOutlined';
import Users from "./profile/Users";

const Menu = () => {
    
    return <div className="bg-92AD95 py-3">
        <div className="container d-flex align-items-center justify-content-between position-relative">
            <ul className="list-unstyled d-flex">
                <li className="me-4">
                    <NavLink className="text-white" to="/">Trang chủ</NavLink>
                </li>
                <li className="me-4">
                    <NavLink className="text-white" to="/cong-thuc">Công thức</NavLink>
                </li>
                <li className="me-4">
                    <NavLink className="text-white" to="/lien-he">Liên hệ</NavLink>
                </li>
                <li className="me-4">
                    <NavLink className="text-white" to="/gioi-thieu">Giới thiệu</NavLink>
                </li>
            </ul>
            <div className="position-absolute top-50 start-50 translate-middle">
                <h1 className="text-white">LOGO</h1>
            </div>
            <div className="d-flex align-items-center">
                <div className="position-relative me-3">
                    <input type="text" placeholder="Tìm kiếm..."  className="rounded-pill border py-1 px-2"/>
                    <SearchIcon className="position-absolute top-50 end-0 translate-middle-y" style={{ color: '#939393'}}/>
                </div>
                <div>
                    <Users/>
                </div>
            </div>

        </div>
    </div>
}

export default Menu;
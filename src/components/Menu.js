import { NavLink } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import Users from "../components/profile/Users";
import Logo from "../assets/Group 72.png";

const Menu = () => {
    return <div className="bg-345354 py-3">

        <nav class="navbar navbar-expand-lg navbar-dark">
            <div class="container">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand d-sm-none d-block" href="#">LOGO</a>
                <div class="collapse navbar-collapse mt-4 mt-sm-0" id="navbarTogglerDemo03">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item me-4">
                            <NavLink className="text-white" to="/">Trang chủ</NavLink>
                        </li>
                        <li class="nav-item mt-3 mt-sm-0">
                            <NavLink className="text-white" to="/cong-thuc">Công thức</NavLink>
                        </li>
                    </ul>
                    <div className="logo position-absolute top-50 bg-dark d-none d-md-block start-50 translate-middle p-2 rounded">
                        <h2 className="text-white mb-0">COOKING HOLICS</h2>
                    </div>
                    <div className="d-flex align-items-center mt-4 mt-sm-0">
                        <div className="position-relative me-3">
                            <input type="text" placeholder="Tìm kiếm..."  className="rounded-pill border py-1 px-2"/>
                            <SearchIcon className="position-absolute top-50 end-0 translate-middle-y me-2" style={{ color: '#939393'}}/>
                        </div>
                        <div className="d-none d-sm-block">
                            <Users/>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
}

export default Menu;
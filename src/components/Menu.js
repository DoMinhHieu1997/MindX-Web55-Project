import { NavLink } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import Users from "../components/profile/Users";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
    let navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    }

    const handleSearch = () => {
        navigate("/tim-kiem/searchValue");
    }

    return <div className="bg-3e9294 py-3">

        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand d-sm-none d-block logo" href="/">
                    <h2 className="text-white mb-0">COOKING HOLICS</h2>
                </a>
                <div className="collapse navbar-collapse mt-4 mt-sm-0" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item me-4">
                            <NavLink className="text-white fs-5" to="/">Trang chủ</NavLink>
                        </li>
                        <li className="nav-item mt-3 mt-sm-0">
                            <NavLink className="text-white fs-5" to="/cong-thuc">Công thức</NavLink>
                        </li>
                    </ul>
                    <div className="logo position-absolute top-50 bg-dark d-none d-md-block start-50 translate-middle p-2 rounded">
                        <h2 className="text-white mb-0">COOKING HOLICS</h2>
                    </div>
                    <div className="d-flex align-items-center mt-4 mt-sm-0">
                        <div className="position-relative me-3">
                            <input type="text" placeholder="Tìm kiếm..."  className="rounded-pill border py-1 px-2" onChange={handleInputChange}/>
                            <SearchIcon className="position-absolute top-50 end-0 translate-middle-y me-2" style={{ color: '#939393'}} onClick={handleSearch}/>
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
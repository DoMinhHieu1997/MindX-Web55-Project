import { NavLink } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import Users from "../components/profile/Users";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';

const Menu = () => {
    let navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleSearch = () => {
        setInputValue("")
        navigate(`/tim-kiem?p=${inputValue.replace(" ","-")}`);
    }

    return <div className="bg-3e9294 py-2 py-md-3">

        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand d-sm-none d-block logo p-2 rounded bg-dark me-0" href="/">
                    <h6 className="text-white mb-0">COOKING HOLICS</h6>
                </a>
                <div className="collapse navbar-collapse mt-3 mt-md-0" id="navbarTogglerDemo03">
                    <div className="border-top border-light d-md-none mb-4"></div>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item me-4">
                            <HomeIcon className="me-2 d-inline-block d-md-none align-middle" style={{color:"white"}}/>
                            <NavLink className="text-white fs-5 d-inline-block align-middle" to="/">Trang chủ</NavLink>
                        </li>
                        <li className="nav-item mt-3 mt-sm-0">
                            <ListAltIcon className="me-2 d-inline-block d-md-none align-middle" style={{color:"white"}}/>
                            <NavLink className="text-white fs-5 d-inline-block align-middle" to="/cong-thuc">Công thức</NavLink>
                        </li>
                    </ul>
                    <div className="logo position-absolute top-50 bg-dark d-none d-md-block start-50 translate-middle p-2 rounded">
                        <h2 className="text-white mb-0">COOKING HOLICS</h2>
                    </div>
                    <div className="d-flex align-items-center mt-4 mt-sm-0">
                        <div className="position-relative me-3 w-100">
                            <input type="text" placeholder="Tìm kiếm..." value={inputValue}  className="rounded-pill border py-1 px-2 w-100" onChange={handleInputChange}/>
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

import { NavLink } from "react-router-dom";

const Footer = () => {
    return <div>
        <div className="bg-3e9294 py-5">
            <div className="container d-flex align-items-center justify-content-between">
                <div className="logo rounded p-2 bg-dark">
                    <h2 className="text-white mb-0">COOKING HOLICS</h2>
                </div>
                <ul className="list-unstyled d-flex">
                    <li className="me-4">
                        <NavLink className="text-white fs-5" to="/">Trang chủ</NavLink>
                    </li>
                    <li className="me-4">
                        <NavLink className="text-white fs-5" to="/cong-thuc">Công thức</NavLink>
                    </li>
                </ul>
            </div>
        </div>
        <div className="text-center py-2 bg-dark text-white" style={{borderTop:"2px solid white"}}>Copyright © 2022 Web55-Group3. All rights reserved.</div>
    </div>
}

export default Footer;
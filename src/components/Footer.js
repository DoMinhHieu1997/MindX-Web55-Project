import { NavLink } from "react-router-dom";

const Footer = () => {
    return <div>
        <div className="bg-primary py-5">
            <div className="container d-flex align-items-center justify-content-between">
                <div className="">
                    <h1 className="text-white">LOGO</h1>
                </div>
                <ul className="list-unstyled d-flex">
                    <li className="me-4">
                        <NavLink className="text-white" to="/">Trang chủ</NavLink>
                    </li>
                    <li className="me-4">
                        <NavLink className="text-white" to="/cong-thuc">Công thức</NavLink>
                    </li>
                </ul>
            </div>
        </div>
        <div className="text-center py-2 bg-dark text-white">Copyright © 2022 Web55-Group3. All rights reserved.</div>
    </div>
}

export default Footer;
import { NavLink } from "react-router-dom";

const Footer = () => {
    const scrollTop = () => {
        window.scroll(0,0);
    }

    return <div>
        <div className="bg-06a682 py-4">
            <div className="container">
                <div className="row align-items-center justify-content-between">
                    <div className="col-12 col-md-5 col-lg-3 mb-4 mb-md-0 text-center">
                        <NavLink to="/">
                            <div className="logo rounded p-2 d-inline-block">
                                <h2 className="text-white mb-0">COOKING HOLICS</h2>
                            </div>
                        </NavLink>
                    </div>
                    <div className="col-12 col-md-5 col-lg-3 text-center">
                        <ul className="list-unstyled d-flex justify-content-center">
                            <li className="me-4">
                                <NavLink className="text-white fs-5" to="/" onClick={scrollTop}>Trang chủ</NavLink>
                            </li>
                            <li className="me-0 me-md-4">
                                <NavLink className="text-white fs-5" to="/cong-thuc" onClick={scrollTop}>Công thức</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="text-center py-2 text-white" style={{borderTop:"2px solid white",backgroundColor:"#000"}}>Copyright © 2022 Web55-Group3. All rights reserved.</div>
    </div>
}

export default Footer;
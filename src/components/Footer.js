import { NavLink } from "react-router-dom";

const Footer = () => {
    return <div>
        <div className="bg-06a682 py-5">
            <div className="container">
                <div className="row align-items-center justify-content-between">
                    <div className="col-12 col-md-3 mb-4 mb-md-0">
                        <div className="logo rounded p-2 d-inline-block">
                            <h2 className="text-white mb-0">COOKING HOLICS</h2>
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <ul className="list-unstyled d-flex">
                            <li className="me-4">
                                <NavLink className="text-white fs-5" to="/">Trang chủ</NavLink>
                            </li>
                            <li className="me-0 me-md-4">
                                <NavLink className="text-white fs-5" to="/cong-thuc">Công thức</NavLink>
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
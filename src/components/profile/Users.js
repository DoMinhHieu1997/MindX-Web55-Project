import { AccountCircleOutlined, Logout } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLogged } from "./config";
import "./User.css";

function Users({ onClick }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const isLogin = isLogged();
  const navigate = useNavigate();

  const options = !isLogin
    ? ["Đăng Nhập", "Đăng Ký"]
    : ["Thông Tin Tài Khoản", "Đăng Xuất"];

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickMenuItem = (value) => {
    onClick&&document.getElementById('test').click()
    value === "Đăng Nhập" && navigate("/dang-nhap");
    value === "Đăng Ký" && navigate("/dang-ky");
    value === "Thông Tin Tài Khoản" && navigate("/ho-so");
    if (value === "Đăng Xuất") {
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
      navigate("/dang-nhap");
    }
  };

  return (
    <div>
      <div className="user-menu desktop">
        <AccountCircleOutlined
          onClick={handleClick}
          style={{ fontSize: 30, color: "#fff" }}
        />
        <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={handleClose}>
          {options.map((value) => (
            <MenuItem key={value} onClick={() => handleClickMenuItem(value)}>
              {value === "Đăng Xuất" && <Logout />}
              {value}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <div className="user-menu mobile">
        {options.map((value) => (
          <div
            className="text-white fs-5 d-block align-middle nav-item mt-3 mt-sm-0"
            key={value}
            onClick={() => handleClickMenuItem(value)}
          >
            {value === "Đăng Xuất" ? (
              <Logout className="me-2 d-inline-block d-md-none align-middle" />
            ) : (
              <AccountCircleOutlined className="me-2 d-inline-block d-md-none align-middle" />
            )}
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;

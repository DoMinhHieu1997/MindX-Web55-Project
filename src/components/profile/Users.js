import { AccountCircleOutlined, Logout } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLogged } from "./config";

function Users() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isLogin = isLogged();
  const navigate = useNavigate();
  const [width, setWidth] = useState('');

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
    value === "Đăng Nhập" && navigate("/dang-nhap");
    value === "Đăng Ký" && navigate("/dang-ky");
    value === "Thông Tin Tài Khoản" && navigate("/user");
    if (value === "Đăng Xuất") {
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
      navigate("/");
    }
  };
  useEffect(() => {
    function displayWindowSize() {
      const w = document.documentElement.clientWidth;
      w < 700 && setWidth(true);
      w >= 700 && setWidth(false);
    }
    window.addEventListener("resize", displayWindowSize);
    console.log(width);
  },[]);
  return (
    <div>
      {
        <>
          {!width && (
            <div>
              <AccountCircleOutlined
                onClick={handleClick}
                style={{ fontSize: 30, color: "#fff" }}
              />
              <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={handleClose}>
                {options.map((value) => (
                  <MenuItem
                    key={value}
                    onClick={() => handleClickMenuItem(value)}
                  >
                    {value === "Đăng Xuất" && <Logout />}
                    {value}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}
          {width &&
            options.map((value) => (
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
        </>
      }
    </div>
  );
}

export default Users;

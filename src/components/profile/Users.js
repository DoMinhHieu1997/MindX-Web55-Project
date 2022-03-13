import {
  AccountCircle,
  AppRegistration,
  Dehaze,
  Login,
  Logout,
} from "@mui/icons-material";
import { Button, Menu, MenuItem } from "@mui/material";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLogged } from "./config";

function Users() {
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
    value === "Đăng Nhập" && navigate("/dang-nhap");
    value === "Đăng Ký" && navigate("/dang-ky");
    value === "Đăng Xuất" && navigate("/");
  };

  return (
    <div>
      {
        <>
          <Button style={{ borderRadius: 50 }} onClick={handleClick}>
          </Button>
            <AccountCircle onClick={handleClick} style={{ fontSize: 40,color:'#fff' }} />
          <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={handleClose}>
            {options.map((value) => (
              <MenuItem key={value} onClick={() => handleClickMenuItem(value)}>
                {value === "Đăng Xuất" && <Logout />}
                {value}
              </MenuItem>
            ))}
          </Menu>
        </>
      }
    </div>
  );
}

export default Users;

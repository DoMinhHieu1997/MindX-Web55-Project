import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Paper,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { http,  Logo } from "./config";
function Login() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();
  const validateEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleClick = () => {
    setShow((prev) => !prev);
  };
  const onSubmit = async (data) => {
    http.post("/auth/login", data).then((res) => {
      data.keepLogin && localStorage.setItem("token", res.data.data.tocken);
      sessionStorage.setItem("token", res.data.data.tocken);
      navigate("/")

    });
  };
  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper
          elevation={12}
          sx={{
            maxWidth: 400,
            minHeight: 500,
            margin: "40px auto 0",
            borderRadius: "15px",
          }}
        >
          <div
            style={{
              margin: 15,
            }}
          >
            <Logo />
            <MyDiv>
              <TextField
                error={!!errors.email}
                type="text"
                name="email"
                fullWidth
                size="small"
                label="Email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Vui lòng điền Email",
                  },
                  pattern: {
                    value: validateEmail,
                    message: "Email không đúng định dạng",
                  },
                  minLength: {
                    value: 6,
                    message: "Vui lòng nhập 6 kí tự trở lên",
                  },
                })}
              />
              {errors.email && <Myp>{errors.email.message}</Myp>}
            </MyDiv>
            <MyDiv>
              <TextField
                error={!!errors.password}
                type={show ? "text" : "password"}
                name="password"
                fullWidth
                size="small"
                label="Mật khẩu"
                InputProps={{
                  endAdornment: !show ? (
                    <Visibility
                      onClick={handleClick}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <VisibilityOff
                      onClick={handleClick}
                      style={{ cursor: "pointer" }}
                    />
                  ),
                }}
                {...register("password", {
                  required: {
                    value: true,
                    message: "Vui lòng điền mật khẩu",
                  },
                  minLength: {
                    value: 6,
                    message: "Vui lòng nhập 6 kí tự trở lên",
                  },
                })}
              />
              {errors.password && <Myp>{errors.password.message}</Myp>}
            </MyDiv>
            <FormGroup>
              <FormControlLabel
                {...register("keepLogin")}
                control={<Checkbox />}
                label="Duy trì đăng nhập"
              />
            </FormGroup>
            <MyDiv>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                style={{ width: "100%", margin: " 20px 0 " }}
              >
                Đăng Nhập
              </Button>
            </MyDiv>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: 10,
              }}
            >
              <div style={{ display: "inline-block" }}>
                Bạn chưa có tài khoản?
                <Link to="/dang-ky"> Đăng Ký</Link>
              </div>
            </div>
          </div>
        </Paper>
      </form>
    </Container>
  );
}

export default Login;

const MyDiv = styled("div")({
  height: 76,
  width: "100%",
});
const Myp = styled("p")({
  // lineHeight: "100%",
  fontSize: 13,
  color: "#dc3545",
  margin: "6px 10px ",
  fontFamily: `Roboto ,sans-serif`,
});

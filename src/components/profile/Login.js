import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Paper,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { http, Logo } from "./config";
import bglogin from "../../assets/bglogin.jpg";

function Login() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm();

  const validateEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const verifyEmail = localStorage.getItem("verifyEmail");
  if (verifyEmail) {
    setOpen(true);
    localStorage.removeItem("verifyEmail");
  }

  const handleClick = () => {
    setShow((prev) => !prev);
  };
  const onSubmit = (data) => {
    http
      .post("/auth/login", data)
      .then((res) => {
        data.keepLogin && localStorage.setItem("token", res.data.data.tocken);
        sessionStorage.setItem("token", res.data.data.tocken);
        navigate("/");
      })
      .catch((error) => {
        if (error.response.data.data === "Email is not verify") {
          setError("email", {
            type: "manual",
            message: "Email chưa kích hoạt",
          });
        }else if(error.response.data.data ==="Email is not existed"){
          setError("email", {
            type: "manual",
            message: "Email chưa đăng ký",
          });
        } else if (error.response.data.data === "Password not correct") {
          setError("password", {
            type: "manual",
            message: "Sai mật khẩu",
          });
        }
      });
  };
  return (
    <div className="py-5" style={{ backgroundImage: `url(${bglogin})` }}>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Paper
            elevation={12}
            sx={{
              maxWidth: 400,
              minHeight: 500,
              margin: "auto",
              backgroundColor: "#ffffffc7",
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
              {open && (
                <Box sx={{ textAlign: "center", color: "#f73378" }}>
                  Bạn vui lòng kích hoạt Email trước khi đăng nhập
                </Box>
              )}
            </div>
          </Paper>
        </form>
      </Container>
    </div>
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

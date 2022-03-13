import { Button, Container, Paper, TextField } from "@mui/material";
import { checkEmail, checkUser, Logo } from "./config";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    getValues,
  } = useForm();

  const [show, setShow] = useState(false);

  const handleClick = () => { 
    setShow((prev) => !prev);
  };
  const onSubmit = (data) => {
    !!Object.keys(errors).length || console.log(data);
  };
  const validateEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validateLengthSpace = {
    minLength: {
      value: 6,
      message: "Vui lòng nhập 6 ký tự trở lên",
    },
    pattern: {
      value: /^(\w)*$/,
      message: "Vui lòng không để khoảng trắng",
    },
  };
  return (
    <Container maxWidth="sm" >
      <Paper
        elevation={12}
        style={{
          maxWidth: 400,
          minHeight: 550,
          margin:'40px auto 0',
          borderRadius: "15px",
        }}
      >
        <div
          style={{
            margin: 15,
            
          }}
        >
          <Logo />
          <form onSubmit={handleSubmit(onSubmit)}>
            <MyDiv>
              <TextField
                error={!!errors.username?.message}
                size="small"
                fullWidth
                label="Tên đăng nhập"
                margin="normal"
                {...register("username", {
                  required: {
                    value: true,
                    message: "Vui lòng điền tên đăng nhập",
                  },
                  ...validateLengthSpace,
                  validate: async (value) =>
                    !(await checkUser(value)) || "Tên đăng nhập đã tồn tại",
                  onBlur: () => trigger(),
                })}
              />
              {errors.username && <Myp>{errors.username.message}</Myp>}
            </MyDiv>
            <MyDiv>
              <TextField
                error={!!errors.email?.message}
                size="small"
                fullWidth
                label="Email"
                margin="normal"
                {...register("email", {
                  required: { value: true, message: "Vui lòng điền email" },
                  pattern: {
                    value: validateEmail,
                    message: "Email không đúng định dạng",
                  },
                  validate: {
                    checkEmailExist: async (v) =>
                      !(await checkEmail(v)) || "Email đã tồn tại",
                  },
                  onBlur: () => {
                    trigger();
                  },
                })}
              />
              {errors.email && <Myp>{errors.email.message}</Myp>}
            </MyDiv>

            <MyDiv>
              <TextField
                error={!!errors.password}
                size="small"
                fullWidth
                label="Mật khẩu"
                margin="normal"
                type={show ? "text" : "password"}
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
                  required: { value: true, message: "Vui lòng điền mật khẩu" },
                  ...validateLengthSpace,
                  onBlur: () => trigger(),
                })}
              />
              {errors.password && <Myp>{errors.password.message}</Myp>}
            </MyDiv>
            <MyDiv>
              <TextField
                error={!!errors.repassword}
                size="small"
                fullWidth
                label="Nhập lại mật khẩu"
                margin="normal"
                type={show ? "text" : "password"}
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
                {...register("repassword", {
                  required: { value: true, message: "Vui lòng điền mật khẩu " },
                  ...validateLengthSpace,
                  validate: (value) =>
                    value === getValues("password") ||
                    "Mật khẩu không trùng khớp",
                  onBlur: () => trigger(),
                })}
              />
              {errors.repassword && <Myp>{errors.repassword.message}</Myp>}
            </MyDiv>
            <MyDiv>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ width: "100%", margin: " 20px 0 " }}
                >
                  Đăng Ký
                </Button>
            </MyDiv>
          </form>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: 10,
            }}
          >
            <div style={{ display: "inline-block" }}>
              Bạn có tài khoản?
              <Link to="/dang-nhap"> Đăng nhập</Link>
            </div>
          </div>
        </div>
      </Paper>
    </Container>
  );
};

export default Register;

const MyDiv = styled("div")({
  height: 76,
  width:'100%',
});
const Myp = styled("p")({
  lineHeight: "100%",
  fontSize: 13,
  color: "#dc3545",
  marginLeft: 10,
  fontFamily: `Roboto ,sans-serif`,
});

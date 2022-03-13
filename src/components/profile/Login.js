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
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {  loginUser, Logo } from "./config";
function Login() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();
  const onSubmit = async(data) => {
    await loginUser(data)
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper
          elevation={12}
          style={{
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
                error={!!errors.username}
                type="text"
                name="username"
                fullWidth
                size="small"
                label="Tên tài khoản"
                {...register("username", {
                  required: {
                    value: true,
                    message: "Vui lòng điền tên đăng nhập",
                  },
                  minLength: {
                    value: 6,
                    message: "Vui lòng nhập 6 kí tự trở lên",
                  },
                })}
              />
              {errors.username && <Myp>{errors.username.message}</Myp>}
            </MyDiv>
            <MyDiv>
              <TextField
                error={!!errors.username}
                type="text"
                name="password"
                fullWidth
                size="small"
                label="Mật khẩu"
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
  margin:'6px 10px ',
  fontFamily: `Roboto ,sans-serif`,
});

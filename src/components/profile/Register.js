import { Button, Container, Paper, TextField } from "@mui/material";
import { http, Logo } from "./config";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    getValues,
  } = useForm();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setShow((prev) => !prev);
  };
  const onSubmit = async (data) => {
    try {
      const result = await http.post("/auth/register", data);
      localStorage.setItem("verifyEmail", "true");
      navigate("/dang-nhap");
    } catch (error) {
      error.response.data.data === "Email is existed!" &&
        setError("email", {
          type: "manual",
          message: "Email đã tồn tại",
        });
    }
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
    <MyContainer>
      <Container maxWidth="sm">
        <Paper
          elevation={12}
          style={{
            maxWidth: 400,
            minHeight: 550,
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
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    // validate: {
                    //   checkEmailExist: async (v) =>
                    //     !(await checkEmail(v)) || "Email đã tồn tại",
                    // },
                  })}
                />
                {errors.email && <Myp>{errors.email.message}</Myp>}
              </MyDiv>
              <MyDiv>
                <TextField
                  error={!!errors.nameDisplay?.message}
                  size="small"
                  fullWidth
                  label="Tên người dùng"
                  margin="normal"
                  {...register("nameDisplay", {
                    required: {
                      value: true,
                      message: "Vui lòng điền tên người dùng",
                    },
                    minLength: {
                      value: 6,
                      message: "Vui lòng nhập 6 ký tự trở lên",
                    },
                    validate: (v) =>
                      v.trim().length > 4 || "Vui lòng không để khoảng trắng",
                  })}
                />
                {errors.nameDisplay && <Myp>{errors.nameDisplay.message}</Myp>}
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
                    required: {
                      value: true,
                      message: "Vui lòng điền mật khẩu",
                    },
                    ...validateLengthSpace,
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
                    required: {
                      value: true,
                      message: "Vui lòng điền mật khẩu ",
                    },
                    ...validateLengthSpace,
                    validate: (value) =>
                      value === getValues("password") ||
                      "Mật khẩu không trùng khớp",
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
    </MyContainer>
  );
};

export default Register;
const MyContainer = styled("div")({
  backgroundImage: `url('../../assets/bglogin.jgp')`,
});
const MyDiv = styled("div")({
  height: 76,
  width: "100%",
});

export const Myp = styled("p")({
  lineHeight: "100%",
  fontSize: 13,
  color: "#dc3545",
  marginLeft: 10,
  fontFamily: `Roboto ,sans-serif`,
});

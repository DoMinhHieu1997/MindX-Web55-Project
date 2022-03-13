export const isLogged = () => {
  return false;
};
console.log('s');
export const Logo = () => {
  return (
    <div
      style={{
        height: "100px",
        display: "flex",
        justifyContent: "center",
        lineHeight: "70px",
      }}
    >
      Logo
    </div>
  );
};

export const checkUser = async (user) => {
  if (user === "vuongcdt") {
    return true;
  }
  return false;
};

export const checkEmail = async (email) => {
  if (email === "vuongcdt@gmail.com") {
    return true;
  }
  return false;
};

export const loginUser=async(data)=>{
  console.log(data);
}
export const registerUser=async(data)=>{
  console.log(data);
}
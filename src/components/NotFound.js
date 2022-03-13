import notfound from "../assets/404.jpg";
import { Button } from "@mui/material";

const NotFound = () => {
  return <div className="container py-5">
    <div className="col-10 col-sm-5 mx-auto">
      <img className="w-100" src={notfound}/>
    </div>
    <h3 className="text-uppercase text-center">Không tìm thấy đường dẫn này</h3>
    <div className="text-center mt-4">
      <Button className="return-to-home-btn" variant="contained" color="primary" href="/">Quay về trang chủ</Button>
    </div>
  </div>
}

export default NotFound;
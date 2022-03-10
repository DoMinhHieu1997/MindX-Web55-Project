import notfound from "../assets/404.jpg";
import { Button } from "@material-ui/core";

const NotFound = () => {
  return <div className="container py-5">
    <div className="w-25 mx-auto">
      <img className="w-100" src={notfound}/>
    </div>
    <h3 className="text-uppercase text-center">Không tìm thấy đường dẫn này</h3>
    <div className="text-center mt-4">
      <Button variant="contained" color="primary" href="/">
        Quay về trang chủ
      </Button>
    </div>
  </div>
}

export default NotFound;
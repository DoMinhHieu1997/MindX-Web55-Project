import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { http } from "../profile/config";

const MyPost = ({ id }) => {
  const [data, setData] = useState([]);
  const [loadPage, setLoadingPage] = useState(6);
  useEffect(() => {
    http.get(`/posts/user?p=1&s=${loadPage}&t=1&userId=${id}`).then((res) => {
      setData(res.data.data);
    });
  }, [loadPage]);
  const handleLoadMore = () => {
    setLoadingPage((prev) => prev + 6);
  };
  console.log(loadPage);
  console.log("render",data);
  return (
    <div className="col-md-8 border ml-2">
      <div className="row">
        <div className="col-12 p-4">
          <div className="h3">Danh sách bài viết</div>
          <div className="row">
            {data.map((post, i) => {
              return (
                <div className="col-lg-4 mb-5" key={i}>
                  <Card sx={{ pb: 2 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={post.avatar}
                    />

                    <CardContent sx={{ height: 80 }}>
                      <Typography
                        sx={{ fontWeight: "medium", mb: 3 }}
                        variant="p"
                        component="div"
                      >
                        {post.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
          <div className="d-flex justify-content-center">
            <Button hidden={data.length<loadPage} variant="outlined" onClick={handleLoadMore}>
              Xem thêm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyPost;

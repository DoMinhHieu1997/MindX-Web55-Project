import { Edit } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Modal,
  Skeleton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreatePosts from "../posts/CreatePosts";
import { http } from "../profile/config";

const MyPost = ({ userData }) => {
  const [data, setData] = useState([]);
  const [loadPage, setLoadingPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState("");

  const param = useParams();
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (param.page) {
      document.title = "Bài viết của tôi trang " + param.page;
      setLoadingPage(param.page);
    }
    if (!param.page) {
      document.title = "Bài viết của tôi";
      setLoadingPage(1);
    }
  }, [param.page]);
  useEffect(() => {
    document.title = "Bài viết của tôi trang " + param.page;
    const id = userData._id;
    http
      .get(`/posts/user?p=1&s=${6 * loadPage}&p=2&t=1&userId=${id}`)
      .then((res) => {
        setData(res.data.data);
        setIsLoading(false);
      });
  }, [loadPage, userData]);

  const handleLoadMore = () => {
    setIsLoading(true);
    setLoadingPage((prev) => +prev + 1);
    navigate(`/ho-so/bai-viet-cua-toi/${+loadPage + 1}`, { page: true });
  };
  const handleEdit = (post) => {
    setDataEdit(post);
    setOpen(true);
  };

  return (
    <div className="col-md-8 border ml-2">
      <div className="row">
        <div className="col-12 p-4">
          <div className="h3">Danh sách bài viết</div>
          <div className="row">
            {data.length === 0 && !isLoading && (
              <div className="">Bạn chưa đăng bài viết</div>
            )}
            {data.length > 0 &&
              data.map((post, i) => {
                return (
                  <div className="col-lg-4 mb-5" key={i}>
                    <Card
                      sx={{ pb: 2, cursor: "pointer" }}
                      onClick={() => {
                        navigate(`/chi-tiet/${post._id}`);
                        window.scroll(0, 0);
                      }}
                    >
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

                    <Button
                      variant="outlined"
                      sx={{ m: 1 }}
                      onClick={() => handleEdit(post)}
                    >
                      <Edit /> Chỉnh sửa
                    </Button>
                  </div>
                );
              })}
            {isLoading &&
              Array(6)
                .fill(1)
                .map((post, i) => (
                  <div key={i} className="col-lg-4 mb-5">
                    <Skeleton variant="rectangular" height={200} />
                    <Skeleton variant="text" height={80} />
                  </div>
                ))}
          </div>
          <div className="d-flex justify-content-center">
            <Button
              hidden={data.length < loadPage * 6}
              variant="outlined"
              onClick={handleLoadMore}
            >
              Xem thêm
            </Button>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ paddingTop: 5, overflow: "scroll", marginX: 1 }}
      >
        <CreatePosts
          onClose={handleClose}
          dataEdit={dataEdit}
          setOpen={setOpen}
        />
      </Modal>
    </div>
  );
};
export default MyPost;

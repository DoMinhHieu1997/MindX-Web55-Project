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
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppCtx from "../../appContext";
import { spliceString } from "../Common";
import CreatePosts from "../posts/CreatePosts";
import { http } from "../profile/config";

const MyPost = () => {
  const [data, setData] = useState([]);
  const [loadPage, setLoadingPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState("");
  const {userInfo} = useContext(AppCtx)

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
    const id = userInfo._id;
    http
      .get(`/posts/user?p=1&s=${6 * loadPage}&p=2&t=1&userId=${id}`)
      .then((res) => {
        setData(res.data.data);
        setIsLoading(false);
      });
  }, [loadPage, userInfo]);

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
    <div className="col-md-8 border ml-2 mt-4 mt-md-0">
      <div className="row">
        <div className="col-12 p-4">
          <div className="h3 pb-3">Danh sách bài viết</div>
          <div className="row">
            {data.length === 0 && !isLoading && (
              <div className="">Bạn chưa đăng bài viết</div>
            )}
            {data.length > 0 &&
              data.map((post, i) => {
                return (
                  <div className="col-lg-4 mb-4" key={i}>
                    <Card
                      sx={{ pb: 2, cursor: "pointer", position: "relative" }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={post.avatar}
                        onClick={() => {
                          navigate(`/chi-tiet/${post._id}`);
                          window.scroll(0, 0);
                        }}
                      />
                      <CardContent
                        sx={{ height: 80 }}
                        onClick={() => {
                          navigate(`/chi-tiet/${post._id}`);
                          window.scroll(0, 0);
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: "medium", mb: 3 }}
                          variant="p"
                          component="div"
                        >
                          {spliceString(post.title, 50)}
                        </Typography>
                      </CardContent>
                      <Edit
                        className="border border-2 rounded-circle p-1"
                        fontSize="large"
                        sx={{
                          m: 1,
                          position: "absolute",
                          top: 0,
                          right: 0,
                          color: "#fff",
                        }}
                        onClick={() => handleEdit(post)}
                      />
                    </Card>
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

import AccessAlarmsOutlinedIcon from "@mui/icons-material/AccessAlarmsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { useState, useContext, useEffect } from "react";
import AppCtx from "../../appContext";
import { Modal, Tooltip } from "@mui/material";
import CommentList from "../comments/CommentList";
import { COMMON, transferDate } from "../Common";
import { Edit } from "@mui/icons-material";
import CreatePosts from "./CreatePosts";

const PostContent = (props) => {
  const appCtx = useContext(AppCtx);
  const userId = appCtx.userInfo?._id;
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
    const  SetClickEdit=props.SetClickEdit
  const data = props.postContent.data;
  const creator = data.userId;
  const postId = data._id;
  const userLikeArr = data.usersLike;
  const bookmark = appCtx.userInfo?.listBookmark;
  const [listBk, setListBK] = useState([]);
  const [countLike, setCountLike] = useState(
    userLikeArr.length ? userLikeArr.length : 0
  );
  const [isLove, setIsLove] = useState(false);
  const [justLiked, setJustLiked] = useState(false);
  const [justDisLiked, setJustDisLiked] = useState(false);
  const [justSave, setJustSave] = useState(false);
  const [justUnsave, setJustUnsave] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);

  useEffect(() => {
    if (userLikeArr.indexOf(userId) > -1) {
      setIsLove(true);
    }else{
      setIsLove(false)
    }
  }, [userId, data, userLikeArr]);
  useEffect(() => {
    setCountLike(userLikeArr.length ? userLikeArr.length : 0);
  },[userLikeArr]);
  useEffect(() => {
    if (bookmark) {
      if (bookmark.indexOf(postId) > -1) {
        console.log(111);
        setIsSaved(true);
        setListBK(bookmark);
      } else {
        setIsSaved(false);
      }
    }
  }, [bookmark,data]);

  const handleLike = () => {
    if (token) {
      setJustLiked(true);

      const bodyData = {
        _id: postId,
        userLike: [...userLikeArr, userId],
      };

      fetch(`${COMMON.DOMAIN}posts/like`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(bodyData),
      })
        .then((res) => res.json())
        .then((resJson) => {
          if (resJson.message === "success") {
            setCountLike((prev) => prev + 1);
            setIsLove(true);
            setJustLiked(false);
          }
        });
    } else {
      appCtx.setOpenLoginNotify(true);
    }
  };

  const handleDisLiked = () => {
    if (token) {
      setJustDisLiked(true);
      const index = userLikeArr.indexOf(userId);
      const bodyData = {
        _id: postId,
        userLike:
          index > 0
            ? [...userLikeArr.slice(0, index), ...userLikeArr.slice(index)]
            : [...userLikeArr],
      };

      fetch(`${COMMON.DOMAIN}posts/like`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(bodyData),
      })
        .then((res) => res.json())
        .then((resJson) => {
          if (resJson.message === "success") {
            setCountLike((prev) => prev - 1);
            setIsLove(false);
            setJustDisLiked(false);
          }
        });
    } else {
      appCtx.setOpenLoginNotify(true);
    }
  };

  const handleUnsave = () => {
    if (token) {
      setJustUnsave(true);
      listBk.splice(listBk.indexOf(postId, 1));

      let bodyData = {
        listBookmark: [...listBk],
      };

      fetch(`${COMMON.DOMAIN}user/update`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(bodyData),
      })
        .then((res) => res.json())
        .then((resJson) => {
          if (resJson.message === "success") {
            console.log(resJson);
            setJustUnsave(false);
            setIsSaved(false);
            setListBK(resJson.data.listBookmark);
          }
        });
    } else {
      appCtx.setOpenLoginNotify(true);
    }
  };

  const handleSave = () => {
    if (token) {
      setJustSave(true);

      let bodyData = {
        listBookmark: [...listBk,postId],
      };

      fetch(`${COMMON.DOMAIN}user/update`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(bodyData),
      })
        .then((res) => res.json())
        .then((resJson) => {
          if (resJson.message === "success") {
            console.log(resJson);
            setJustSave(false);
            setIsSaved(true);
            setListBK(resJson.data.listBookmark);
          }
        });
    } else {
      appCtx.setOpenLoginNotify(true);
    }
  };

  useEffect(() => {
    document.getElementById("html-content").innerHTML = data.content;
  }, [data.content]);

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        sx={{ paddingTop: 5, overflow: "scroll", marginX: 1 }}
      >
        <CreatePosts
          dataEdit={props.postContent.data}
          SetClickEdit={SetClickEdit}
          onClose={handleClose}
          setOpen={setOpenModal}
        />
      </Modal>
      <div className="post-content">
        <h1>{data.title}</h1>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="d-flex align-items-center flex-start">
            <AccessAlarmsOutlinedIcon
              style={{ color: "#6c757d" }}
              fontSize="sm"
            />
            <div className="ms-2 text-secondary fs-6">
              {transferDate(data.createdAt)}
            </div>
          </div>
          <div className="d-flex cursor-pointer">
            {props?.postContent.data.userId === userId && (
              <Edit
                className=" border  border-2 rounded-circle p-1"
                fontSize="large"
                sx={{ color: "#1373b7", mr: 2 }}
                onClick={handleOpen}
              />
            )}
            {
              creator !== userId
                && 
                <div className="me-md-4 me-0 border rounded-circle p-1  cursor-pointer">  
                  <Tooltip title="Lưu bài viết">
                    {isSaved ? (
                      <BookmarkIcon
                        onClick={!justUnsave ? handleUnsave : null}
                        style={{ color: "#1373b7" }}
                      />
                    ) : (
                      <BookmarkAddIcon onClick={!justSave ? handleSave : null} />
                    )}
                  </Tooltip>
                </div>
            }
          </div>
        </div>
        {data.description && (
          <div className="mt-4 mb-3 fs-4">{data.description}</div>
        )}
        {data.type === 1 && (
          <div className="mt-4">
            <h4>Chuẩn bị nguyên liệu cho món ăn</h4>
            <ul className="dishes-ingredients mt-4">
              {data.ingredients.map((item, index) => {
                return (
                  <li key={index}>
                    <div className="">
                      <div className="h5 me-2">
                        <span>{item.nameIngredient}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <div className="mt-4 fs-4" id="html-content"></div>
        <div className="fs-5 mt-3 fw-bold">{data.authorName}</div>
      </div>
      <div className="mt-4">
        <div className="mb-3">
          {isLove ? (
            <FavoriteIcon
              className="d-inline-block"
              style={{ color: "#d83737" }}
              onClick={!justDisLiked ? handleDisLiked : null}
            />
          ) : (
            <FavoriteBorderOutlinedIcon
              className="d-inline-block"
              onClick={!justLiked ? handleLike : null}
            />
          )}
          <div className="ms-2 d-inline-block h6 mb-0">
            {countLike} Lượt thích
          </div>
        </div>
        <CommentList postId={data._id} />
      </div>
    </>
  );
};

export default PostContent;

import AccessAlarmsOutlinedIcon from "@mui/icons-material/AccessAlarmsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState,useContext,useEffect } from "react";
import AppCtx from "../../appContext";
import CommentList from "../comments/CommentList";
import { COMMON,transferDate } from "../Common";

const PostContent = (props) => {
  const appCtx = useContext(AppCtx);
  const userId = appCtx.userInfo?._id;
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const data = props.postContent.data;
  const userLikeArr = data.usersLike;
  const [countLike,setCountLike] = useState(userLikeArr.length ? userLikeArr.length : 0);
  const [isLove, setIsLove] = useState(false);

  useEffect(() => {
    if (userLikeArr.indexOf(userId) > -1) setIsLove(true);
  },[userId])

  const handleLike = () => {
    
    if (token) {
      fetch(`${COMMON.DOMAIN}posts/like`,{
        method: "PATCH",
        headers: {
          'Content-type':'application/json',
          'Authorization':"Bearer "+token
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(resJson => {
        if (resJson.message === "success") {
          setIsLove(true);
          setCountLike(prev => prev + 1);
        }
      });
    } else {
      appCtx.setOpenLoginNotify(true);
    }
  };

  useEffect(() => {
    document.getElementById("html-content").innerHTML = data.content;
  },[]);

  return (
    <>
      <div>
        <h1>{data.title}</h1>
        <div className="d-flex align-items-center flex-start mt-3">
          <AccessAlarmsOutlinedIcon
            style={{ color: "#6c757d" }}
            fontSize="sm"
          />
          <div className="ms-2 text-secondary fs-6">{transferDate(data.createdAt)}</div>
        </div>
        {data.description && (
          <div className="mt-4 mb-3 fs-4">{data.description}</div>
        )}
        {data.type === 1 && (
          <div className="mt-4">
            <h4>Chuẩn bị nguyên liệu cho món ăn</h4>
            <ul className="dishes-ingredients mt-4">
              {data.ingredients.map((item,index) => {
                return (
                  <li key={index}>
                    <div className="">
                      <div className="h5 me-2">
                        <span>{item.nameIngredient}</span>
                        <span> - {item.total + " " + item.unit}</span>
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
          {
            isLove 
            ? 
              <FavoriteIcon
                className="d-inline-block"
                style={{ color: "#d83737" }}
              />
            : 
              <FavoriteBorderOutlinedIcon
                className="d-inline-block"
                onClick={handleLike}
              />
            }
          <div className="ms-2 d-inline-block h6 mb-0">
            {countLike} Lượt thích
          </div>
        </div>
        <CommentList postId={data._id}/>
      </div>
    </>
  );
};

export default PostContent;

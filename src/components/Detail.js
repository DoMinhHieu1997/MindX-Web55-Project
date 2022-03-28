import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MostFavorite from "./shared/MostFavorite";
import PostContent from "./posts/PostContent";
import { COMMON } from "./Common";
import { Skeleton } from "@mui/material";
import FloatingAction from "./shared/FloatingAction";
import { useNavigate } from "react-router-dom";

const Detail = ({setBookmarkChange}) => {
    const navigate = useNavigate();
    const [postData, setPostData] = useState("");
    const [clickEdit, SetClickEdit] = useState(true);

    const postId = useParams();

    useEffect(() => {
        window.scroll(0,0);
        fetch(`${COMMON.DOMAIN}posts/detail?id=`+postId.id)
        .then((res) => res.json())
        .then((resJson) => {
            if (resJson.message === "success") {
                if (resJson.data === null) {
                    navigate('/*');
                } else {
                    setPostData(resJson);
                    document.title=resJson.data.title
                }
            } else {
                navigate('/*');
            }
        });
    },[postId.id,clickEdit]);


    return <>
        <FloatingAction />
        <div className="container py-5">
            <div className="row">
                <div className="col-md-9">
                    {
                        postData ? <PostContent postContent={postData} SetClickEdit={SetClickEdit} setBookmarkChange={setBookmarkChange}/> : <PostDetailSkeleton/>
                    }
                </div>
                <div className="col-md-3">
                    <MostFavorite />
                </div>
            </div>
        </div>
    </>
};

const PostDetailSkeleton = () => {
  return (
    <div>
      <Skeleton height={40} />
      <Skeleton height={40} />
      <Skeleton className="my-3" width="30%" />
      <Skeleton className="mt-4" />
      <Skeleton />
      <Skeleton width="30%" className="mb-3" />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton width="85%" />
      <Skeleton className="mt-3" />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton width="90%" />
      <Skeleton className="mt-3" />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton width="95%" />
      <Skeleton className="mt-3" width="20%" />
    </div>
  );
};

export default Detail;

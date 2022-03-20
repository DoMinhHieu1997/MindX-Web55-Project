import { useState,useEffect } from "react";
import { Skeleton } from "@mui/material";
import CommentItem from "./CommentItem";
import {COMMON} from "../Common";

const CommentList = (props) => {
  const [commentList,setCommentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(false);
    fetch(`${COMMON.DOMAIN}comments?postId=${props.postId}`)
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.message === "success") {
          setIsLoading(false);
          setCommentList(resJson.data);
        }
      });
  })

  return <div className="mt-4">
    <div>
      {
        commentList && commentList.map((item,index) => {
          return <CommentItem key={index} data={item}/>
        })
      }
    </div>
    {
      isLoading ? <SkeletonComList/> : null
    }
  </div>
}

const SkeletonCom = () => {
  return <div className="mb-3 w-75">
    <div className="d-flex align-items-top">
      <Skeleton variant="circular" className="me-3" width={40} height={40} />
      <Skeleton width="30%"/>
    </div>
    <Skeleton />
    <Skeleton />
  </div>
}

const SkeletonComList = () => {
  return <>
    <SkeletonCom />
    <SkeletonCom />
    <SkeletonCom />
  </>
}

export default CommentList;
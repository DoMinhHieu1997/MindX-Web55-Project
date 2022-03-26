import { useState,useEffect } from "react";
import { useParams } from 'react-router-dom';
import MostFavorite from "./shared/MostFavorite";
import PostContent from "./posts/PostContent";
import {COMMON} from "./Common";
import { Skeleton } from "@mui/material";
import FloatingAction from "./shared/FloatingAction";

const Detail = () => {
    const [postData, setPostData] = useState("");
    const postId = useParams();

    useEffect(() => {
        fetch(`${COMMON.DOMAIN}posts/detail?id=`+postId.id)
        .then((res) => res.json())
        .then((resJson) => {
            setPostData(resJson);
        });

    },[postId.id]);


    return <>
        <FloatingAction />
        <div className="container py-5">
            <div className="row">
                <div className="col-md-9">
                    {
                        postData ? <PostContent postContent={postData}/> : <PostDetailSkeleton/>
                    }
                </div>
                <div className="col-md-3">
                    <MostFavorite />
                </div>
            </div>
        </div>
    </>
}

const PostDetailSkeleton = () => {
    return <div>
        <Skeleton height={40}/>
        <Skeleton height={40}/>
        <Skeleton className="my-3" width="30%"/>
        <Skeleton className="mt-4"/>
        <Skeleton />
        <Skeleton width="30%" className="mb-3"/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton width="85%"/>
        <Skeleton className="mt-3"/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton width="90%"/>
        <Skeleton className="mt-3"/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton width="95%"/>
        <Skeleton className="mt-3" width="20%"/>
    </div>
}

export default Detail;
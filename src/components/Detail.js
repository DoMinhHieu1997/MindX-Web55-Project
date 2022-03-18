import { useState,useEffect } from "react";
import { useParams } from 'react-router-dom';
import MostFavorite from "./shared/MostFavorite";
import PostContent from "./posts/PostContent";
import COMMON from "./Common";

const Detail = () => {
    const [postData, setPostData] = useState("");
    const postId = useParams();

    useEffect(() => {
        fetch(`${COMMON.DOMAIN}posts/detail?id=`+postId.id)
        .then((res) => res.json())
        .then((resJson) => {
            setPostData(resJson);
        });
    }, []);

    return <div className="container py-5">
        <div className="row">
            <div className="col-md-9">
                {
                    postData ? <PostContent postContent={postData}/> : <div>Skeleton</div>
                }
            </div>
            <div className="col-md-3">
                <MostFavorite />
            </div>
        </div>
    </div>
}

export default Detail;
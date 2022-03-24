import PostItem from "./PostItem";
import { useState,useEffect } from "react";
import SkeletonItem from "./SkeletonItem";
import {COMMON} from "../Common";

const MostFavorite = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [topLike, setTopLike] = useState('');

    useEffect(() => {
        setIsLoading(true);
        fetch(`${COMMON.DOMAIN}posts/toplike`)
        .then((res) => res.json())
        .then((resJson) => {
            setTopLike(resJson.data);
            setIsLoading(false);
        });
    },[]);

    return <div>
        <h4 className="text-center mb-0 mt-4 mt-md-0">Ưa thích nhất</h4>
        <div className="w-75 mx-auto mt-3" style={{height: "2px", backgroundColor:"black"}}></div>
        <div className="mt-4 row">
            {
                topLike && topLike.map((item,index) => {
                    return <div key={index} className="mb-3"><PostItem data={item} isTopLikeItem={true}/></div>
                })
            }
            {
                isLoading && <>
                    <SkeletonItem type="1"/>
                    <SkeletonItem type="1"/>
                    <SkeletonItem type="1"/>
                </>
            }
        </div>
    </div>
}

export default MostFavorite;
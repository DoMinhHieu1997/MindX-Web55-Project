import PostItem from "./PostItem";
import { useState,useEffect } from "react";
import SkeletonItem from "./SkeletonItem";
import { SvgIcon } from "@mui/material";

const MostFavorite = () => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // setIsLoading(true);
        // setTimeout(() => {
        //     setIsLoading(false);
        // },3000);
    },[]);

    return <div>
        <h4 className="text-center mb-0">Ưa thích nhất</h4>
        <div className="w-75 mx-auto mt-3" style={{height: "2px", backgroundColor:"black"}}></div>
        <div className="mt-4 row">
            {
                isLoading
                ? <>
                    <div><PostItem /></div>
                    <div><PostItem /></div>
                    <div><PostItem /></div>
                </>
                :
                <>
                    <SkeletonItem type="1"/>
                    <SkeletonItem type="1"/>
                    <SkeletonItem type="1"/>
                </>
            }
        </div>
    </div>
}

export default MostFavorite;
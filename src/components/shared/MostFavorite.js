import PostItem from "./PostItem";
import { useState,useEffect } from "react";
import SkeletonItem from "./SkeletonItem";

const MostFavorite = () => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        },3000);
    },[]);

    return <div>
        <h4 className="text-center">Ưa thích nhất</h4>
        <hr className="text-secondary"/>
        <div className="mt-4 row">
            {
                isLoading
                ? <>
                    <SkeletonItem type="1"/>
                    <SkeletonItem type="1"/>
                    <SkeletonItem type="1"/>
                </>
                :
                <>
                    <div><PostItem /></div>
                    <div><PostItem /></div>
                    <div><PostItem /></div>
                </>
            }
        </div>
    </div>
}

export default MostFavorite;
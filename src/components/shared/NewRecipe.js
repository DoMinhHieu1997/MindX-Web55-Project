import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import {COMMON} from "../Common";
const NewRecipe = ({ recipe }) => {
    const [isLove, setIsLove] = useState(false);
    const [totalLike, setTotalLike] = useState(recipe.usersLike.length ? recipe.usersLike.length : 0);
    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjMxOTQ3MDc3NmY2Y2M5Y2E4NjFlYmQiLCJpYXQiOjE2NDc1MjgxODksImV4cCI6MTY1MDEyMDE4OX0.GWxwDSa6upOKT88lqY7UVEEfk3W48mvxkg0bwIJBQhg";
    const data = {
        _id: recipe._id,
        userLike: ["623214b4d53a3a1b371680a8", "62319470776f6cc9ca861ebd"],
    };

    const handleLike = (event) => {
        setTotalLike(prev => prev + 1);
        setIsLove(!isLove);
        fetch(`${COMMON.DOMAIN}posts/like`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(data),
        }).then((res) => {
            console.log(res);
        });
    };

    const handleDisLike = (event) => {
        setTotalLike(prev => prev - 1);
        setIsLove(!isLove);
        fetch(`${COMMON.DOMAIN}posts/like`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(data),
        }).then((res) => {
            console.log(res);
        });
    };

    return (
        <div className="col-md-3 position-relative">
            <a href={"/chi-tiet/"+recipe._id} className="link-dark">
                <div className="border rounded h-100">
                    <div className="row">
                        <div className="col-12">
                            <div className="ratio ratio-1x1" style={{ backgroundImage: `url(${recipe.avatar})` }}></div>
                        </div>
                        <div className="col-12">
                            <h5 className="mx-3 my-2">{recipe.title}</h5>
                        </div>
                    </div>
                </div>
            </a>
            <div className="pb-2 pt-1 ps-2 position-absolute top-0 start-0 end-0 bg-linear">
                {!isLove ? (
                    <FavoriteBorderOutlinedIcon className="d-inline-block" onClick={handleLike} />
                ) : (
                    <FavoriteIcon className="d-inline-block" style={{ color: "#d83737" }} onClick={handleDisLike} />
                )}
                {totalLike} lượt thích
            </div>
        </div>
    );
};

export default NewRecipe;

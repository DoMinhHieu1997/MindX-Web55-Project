import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, useEffect, useContext } from "react";
import AppCtx from "../../appContext";
import {COMMON} from '../Common';
const NewRecipe = ({ recipe }) => {
    const appCtx = useContext(AppCtx);
    const token =  localStorage.getItem("token") || sessionStorage.getItem("token");
    const userId = appCtx.userInfo?._id;
    const [isLove, setIsLove] = useState(false);
    const [totalLike, setTotalLike] = useState(recipe.usersLike.length ? recipe.usersLike.length : 0);

    const handleLike = () => {
        if (token) {
            const data = {
                _id: recipe._id,
                userLike: [...recipe.usersLike, userId],
            };

            fetch(`${COMMON.DOMAIN}posts/like`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then((resJson) => {
                    if (resJson.message === "success") {
                        setTotalLike((prev) => prev + 1);
                        setIsLove(true);
                    }
                });
        } else {
            appCtx.setOpenLoginNotify(true);
        }
    };

    const handleDisLike = () => {
        if (token) {
            let index=recipe.usersLike.indexOf(userId)
            const data = {
                _id: recipe._id,
                userLike: index>0? [...recipe.usersLike.slice(0, index), ...recipe.usersLike.slice(index)]: [...recipe.usersLike]
            };

            fetch(`${COMMON.DOMAIN}posts/like`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then((resJson) => {
                    if (resJson.message === "success") {
                        setTotalLike((prev) => prev - 1);
                        setIsLove(true);
                    }
                });
        } else {
            appCtx.setOpenLoginNotify(true);
        }
    };

    return (
        <div className="col-md-3 position-relative">
            <a href={"/chi-tiet/" + recipe._id} className="link-dark">
                <div className="rounded h-100 new-recipes-try">
                    <div className="row">
                        <div className="col-12">
                            <div
                                className="ratio ratio-4x3 rounded border"
                                style={{ backgroundImage: `url(${recipe.avatar})` }}
                            ></div>
                        </div>
                        <div className="py-2">
                            <div className="ps-2">
                                {!isLove ? (
                                    <FavoriteBorderOutlinedIcon className="d-inline-block me-1" onClick={handleLike} />
                                ) : (
                                    <FavoriteIcon
                                        className="d-inline-block me-1"
                                        style={{ color: "#d83737" }}
                                        onClick={handleDisLike}
                                    />
                                )}
                                {totalLike} lượt thích
                            </div>
                        </div>
                        <hr className="w-25 ms-4 mb-3 mt-1 text-dark" />
                        <div className="col-12">
                            <h5 className="ps-2">{recipe.title}</h5>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default NewRecipe;

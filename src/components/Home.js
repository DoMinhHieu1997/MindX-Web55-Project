import MostFavorite from "./shared/MostFavorite";
import NewRecipe from "./shared/NewRecipe";
import BlogList from "./shared/BlogList";
import SkeletonItem from "./shared/SkeletonItem";
import { COMMON } from "./Common";
import { useState, useEffect } from "react";
import FloatingAction from "./shared/FloatingAction";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import TimeTables from "./home/timeTables";
import { NavLink } from "react-router-dom";

const Home = () => {
    const [isLoading, setIsloading] = useState(true);
    const [isLoadingFE, setIsLoadingFE] = useState(true);
    const [newRecipe, setNewRecipe] = useState("");
    const [blogs, setBlogs] = useState("");
    const [moreBlog, setMoreBlog] = useState(12);
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    useEffect(() => {
        document.title = "Trang chủ";
        setIsloading(true);
        fetch(`${COMMON.DOMAIN}posts?t=1&p=1&s=4`)
            .then((res) => res.json())
            .then((resJson) => {
                setNewRecipe(resJson);
                setIsloading(false);
            });
    }, []);

    useEffect(() => {
        setIsLoadingFE(true);
        fetch(`${COMMON.DOMAIN}posts?t=2&p=1&s=${moreBlog}`)
            .then((res) => res.json())
            .then((resJson) => {
                setBlogs(resJson);
                setIsLoadingFE(false);
            });
    }, [moreBlog]);
    return (
        <>
            <FloatingAction />
            <div className="container py-5">
                <div className="d-flex align-items-center">
                    <LocalFireDepartmentIcon fontSize="large" style={{ color: "orange" }} />
                    <NavLink to="/cong-thuc">
                        <h3 className="mb-0 text-dark">Công thức mới - thử ngay</h3>
                    </NavLink>
                </div>
                <div className="new-recipres row mt-4">
                    {isLoading && (
                        <>
                            <SkeletonItem type="2" />
                            <SkeletonItem type="2" />
                            <SkeletonItem type="2" />
                            <SkeletonItem type="2" />
                        </>
                    )}
                    {newRecipe &&
                        newRecipe.data.map((recipe, index) => {
                            return (
                                <div className="col-md-3 position-relative" key={index}>
                                    <NewRecipe recipe={recipe} />
                                </div>
                            );
                        })}
                </div>
                {token ? <TimeTables /> : " "}
                <div className="row mt-5">
                    <div className="food-experiens col-md-8 col-lg-9">
                        <div className="d-flex align-items-center mb-3">
                            <RamenDiningIcon fontSize="large" style={{ color: "#c13a3a" }} />
                            <h3 className="mb-0 ms-2 text-dark">Trải nghiệm món ăn</h3>
                        </div>
                        <div className="row">
                            {blogs &&
                                blogs.data.map((blog, index) => {
                                    return (
                                        <div className="col-md-6 mb-3" key={index}>
                                            <BlogList blog={blog} />
                                        </div>
                                    );
                                })}
                            {isLoadingFE && (
                                <>
                                    <FoodExSkeleton />
                                    <FoodExSkeleton />
                                    <FoodExSkeleton />
                                    <FoodExSkeleton />
                                    <FoodExSkeleton />
                                    <FoodExSkeleton />
                                    <FoodExSkeleton />
                                    <FoodExSkeleton />
                                </>
                            )}
                            <div className="col-12 mt-md-3 mt-0">
                                <div className="row justify-content-center">
                                    <div className="col-auto">
                                        {blogs && blogs.data.length === moreBlog ? (
                                            <button
                                                className="btn btn-primary px-5 bg-white border-secondary text-secondary"
                                                onClick={() => {
                                                    setMoreBlog((prev) => prev + 10);
                                                }}
                                            >
                                                Xem thêm
                                            </button>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="most-favourite-post col-md-4 col-lg-3">
                        <MostFavorite />
                    </div>
                </div>
            </div>
        </>
    );
};

const FoodExSkeleton = () => {
    return (
        <div className="col-md-6 col-12 mb-4 align-items-stretch">
            <div className="row">
                <div className="col-md-5 col-4">
                    <div className="skeleton h-100"></div>
                </div>
                <div className="col-md-7 col-8 px-lg-0">
                    <div className="d-flex flex-column h-100">
                        <div className="pb-3 skeleton mt-2" />
                        <div className="pb-3 skeleton mt-2" />
                        <div className="pb-3 skeleton mt-2" />
                        <div className="pb-3 skeleton mt-2 flex-grow-1" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

import MostFavorite from "./shared/MostFavorite";
import NewRecipe from "./shared/NewRecipe";
import BlogList from "./shared/BlogList";
import SkeletonItem from "./shared/SkeletonItem";
import {COMMON} from "./Common";
import { useState, useEffect } from "react";
import FloatingAction from "./shared/FloatingAction";

const Home = () => {
    const [isLoading, setIsloading] = useState(true);
    const [newRecipe, setNewRecipe] = useState("");
    const [blogs, setBlogs] = useState("");
    const [moreBlog, setMoreBlog] = useState(10);

    useEffect(() => {
        setIsloading(true);
        fetch(`${COMMON.DOMAIN}posts?t=1&p=1&s=4`)
            .then((res) => res.json())
            .then((resJson) => {
                setNewRecipe(resJson);
                setIsloading(false);
            });
    }, []);

    useEffect(() => {
        setIsloading(true);
        fetch(`${COMMON.DOMAIN}posts?t=2&p=1&s=${moreBlog}`)
            .then((res) => res.json())
            .then((resJson) => {
                setBlogs(resJson);
                setIsloading(false);
            });
    }, [moreBlog]);

    return (<>
        <FloatingAction />
        <div className="container py-5">
            <h3>Công thức mới - thử ngay</h3>
            <div className="new-recipres row mt-4">
                {
                    isLoading && <>
                        <SkeletonItem type="2"/>
                        <SkeletonItem type="2"/>
                        <SkeletonItem type="2"/>
                        <SkeletonItem type="2"/>
                    </>
                }
                {newRecipe &&
                    newRecipe.data.map((recipe) => {
                        return <NewRecipe  recipe={recipe} />;
                    })}
            </div>

            <div className="row mt-5">
                <div className="food-experiens col-md-9">
                    <h3 className="mb-4">Trải nghiệm món ăn</h3>
                    <div className="row">
                        {isLoading && (
                            <>
                                <div className="col-6">
                                    <SkeletonItem type="1" />
                                </div>
                                <div className="col-6">
                                    <SkeletonItem type="1" />
                                </div>
                                <div className="col-6">
                                    <SkeletonItem type="1" />
                                </div>
                                <div className="col-6">
                                    <SkeletonItem type="1" />
                                </div>
                                <div className="col-6">
                                    <SkeletonItem type="1" />
                                </div>
                                <div className="col-6">
                                    <SkeletonItem type="1" />
                                </div>
                                <div className="col-6">
                                    <SkeletonItem type="1" />
                                </div>
                                <div className="col-6">
                                    <SkeletonItem type="1" />
                                </div>

                            </>
                        )}
                        {blogs &&
                            blogs.data.map((blog) => {
                                return <BlogList blog={blog} />;
                            })}

                        <div className="col-12">
                            <div className="row justify-content-center">
                                <div className="col-auto">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                            setMoreBlog((prev) => prev + 6);
                                        }}
                                    >
                                        Xem thêm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="most-favourite-post col-md-3">
                    <MostFavorite />
                </div>
            </div>
        </div>
    </>
        
    );
};

export default Home;

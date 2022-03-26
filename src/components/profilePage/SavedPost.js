import BookmarkSharpIcon from "@mui/icons-material/BookmarkSharp";
import { useState, useEffect } from "react";
import { http } from "../profile/config";
import { transferDate, spliceString } from "../Common";
const SavedPost = ({ userData }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [savedPosts, setSavedPosts] = useState(null);
    const [isSaved, setIssaved]=useState(false);
    const [postLength, setPostLength] = useState(3);
    useEffect(() => {
        if (userData) {
            setIsLoading(true);
            http.post(`posts/bookmark`, {
                bk: userData.listBookmark,
                p: "1",
                s: `${postLength}`,
            }).then((res) => {
                console.log(res.data.data);
                setSavedPosts(res.data.data);
                setIsLoading(false);
            });
        }
    }, [userData, postLength, ]);
    useEffect(() => {
        if(userData){

            setIssaved(indexOf() > -1 ? true : false);
        }
    }, [recipe.usersLike,userId]);

    const handleSavePost = ()=>{

    }
    const loadMorePosts = () => {
        setPostLength((prev) => prev + 5);
    };

    return (
        <div className="saved-post col-md-8 border ml-2">
            {!isLoading &&
                savedPosts &&
                savedPosts.map((post, index) => {
                    return (
                        <div className="row" index={index}>
                            <div className="col-12 m-2">
                                <div className="row align-items-stretch">
                                    <div className="col-3">
                                        <a href={"/chi-tiet/" + post._id}>
                                            <div
                                                className="ratio ratio-1x1 border rounded image-background new-recipes-try"
                                                style={{ backgroundImage: `url(${post.avatar})` }}
                                            ></div>
                                        </a>
                                    </div>
                                    <div className="col-8 ps-0">
                                        <a href={"/chi-tiet/" + post._id}>
                                            <h5 className="text-dark text-06a682-hover d-none d-md-block">
                                                {post.title}
                                            </h5>
                                        </a>
                                        <h6 className="text-secondary mt-3 mt-md-2">{transferDate(post.updatedAt)}</h6>
                                        <div className="d-none d-md-block">{spliceString(post.description)}</div>
                                    </div>
                                    <div className="col-1">
                                        <div className="d-flex pe-5 h-100 justify-content-center align-items-center">
                                            <BookmarkSharpIcon sx={{ fontSize: 40 }} color="primary" onClick={()=>{handleSavePost()}} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            {isLoading && (
                <div className="row">
                    <div className="col-12 m-2">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="skeleton h-100"></div>
                            </div>
                            <div className="col-md-9 px-4">
                                <div className="d-flex flex-column h-100">
                                    <div className="pb-3 skeleton mt-2 " />
                                    <div className="pb-3 skeleton mt-2 " />
                                    <div className="pb-3 skeleton mt-2 " />
                                    <div className="pb-3 skeleton mt-2 flex-grow-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="row justify-content-center">
                {savedPosts && savedPosts.length === postLength && (
                    <div
                        className="col-auto border border-dark rounded-pill lh-lg mt-4"
                        onClick={() => {
                            loadMorePosts();
                        }}
                    >
                        Xem thêm
                    </div>
                )}
            </div>
        </div>
    );
};
export default SavedPost;

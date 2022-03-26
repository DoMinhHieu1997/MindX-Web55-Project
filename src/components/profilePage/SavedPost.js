import BookmarkSharpIcon from "@mui/icons-material/BookmarkSharp";
import { http } from "../profile/config";
import { useState, useEffect } from "react";
const SavedPost = ({ userData }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userData2, setUserData2] = useState("loading");
    // useEffect(() => {
    //     if (userData) {
    //         setUserData2(userData);
    //         console.log(userData2.listBookmark);
    //         http.post(`/posts/bookmark?bk=${userData2.listBookmark}&p=1&s=5`).then((res) => {
    //             console.log(res);
    //         });
    //     }
    // }, [userData, userData2]);

    if (!isLoading) {
        return (
            <div className="saved-post col-md-8 border ml-2">
                <div className="row">
                    <div className="col-12 m-2">
                        <div className="row">
                            <div className="col-3">
                                <a href="#">
                                    <div className="ratio ratio-1x1 border rounded image-background new-recipes-try"></div>
                                </a>
                            </div>
                            <div className="col-8 ps-0">
                                <a href="">
                                    <h5 className="text-dark text-06a682-hover d-none d-md-block">Title</h5>
                                    <h6 className="text-dark text-06a682-hover d-md-block d-md-none">Title</h6>
                                </a>
                                <h6 className="text-secondary mt-3 mt-md-2">DD-MM-YYYY</h6>
                                <div className="d-none d-md-block">Longggggggggggg</div>
                                <div className="d-md-block d-md-none">Longggggggggggg</div>
                            </div>
                            <div className="d-flex col-1 pe-5 h-100 justify-content-center align-items-center">
                                <BookmarkSharpIcon sx={{ fontSize: 40 }} color="primary" />
                            </div>
                        </div>

                    </div>
                    <div className="row justify-content-center">
                        <div className="col-auto border border-dark rounded-pill lh-lg mt-4">Xem thêm</div>
                    </div>
                </div>
            </div>
        );
    }
};
export default SavedPost;

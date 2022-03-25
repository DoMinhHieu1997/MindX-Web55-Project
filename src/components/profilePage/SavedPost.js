import BookmarkSharpIcon from "@mui/icons-material/BookmarkSharp";
import { useState } from "react";
const SavedPost = () => {
    const [isLoading, setIsLoading] = useState(false);
    if (!isLoading) {
        return (
            <div className="saved-post col-md-8 border ml-2">
                <div className="row">
                    <div className="col-12 m-2">
                        <div className="row">
                            <div className="col-3">
                                <a href="">
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
                </div>
                <div className="row">
                    <div className="col-12 m-2">
                        <div className="row">
                            <div className="col-3">
                                <a>
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
                </div>
                <div className="row">
                    <div className="col-12 m-2">
                        <div className="row">
                            <div className="col-3">
                                <a>
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
                </div>
                <div className="row">
                    <div className="col-12 m-2">
                        <div className="row">
                            <div className="col-3">
                                <a>
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
                </div>
            </div>
        );
    } else {
        return (
            <div className="saved-post col-md-8 border ml-2">
                <div className="row">
                    <div className="col-12 m-2">
                        <div className="row">
                            <div className="col-3">
                                <div className="skeleton h-100"></div>
                            </div>
                            <div className="col-8">
                                <div className="d-flex flex-column h-100">
                                    <div className="pb-3 skeleton mt-2" />
                                    <div className="pb-3 skeleton mt-2" />
                                    <div className="pb-3 skeleton mt-2" />
                                    <div className="pb-3 skeleton mt-2" />
                                    <div className="pb-3 skeleton mt-2 flex-grow-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 m-2">
                        <div className="row">
                            <div className="col-3">
                                <div className="skeleton h-100"></div>
                            </div>
                            <div className="col-8">
                                <div className="d-flex flex-column h-100">
                                    <div className="pb-3 skeleton mt-2" />
                                    <div className="pb-3 skeleton mt-2" />
                                    <div className="pb-3 skeleton mt-2" />
                                    <div className="pb-3 skeleton mt-2" />
                                    <div className="pb-3 skeleton mt-2 flex-grow-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 m-2">
                        <div className="row">
                            <div className="col-3">
                                <div className="skeleton h-100"></div>
                            </div>
                            <div className="col-8">
                                <div className="d-flex flex-column h-100">
                                    <div className="pb-3 skeleton mt-2" />
                                    <div className="pb-3 skeleton mt-2" />
                                    <div className="pb-3 skeleton mt-2" />
                                    <div className="pb-3 skeleton mt-2" />
                                    <div className="pb-3 skeleton mt-2 flex-grow-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 m-2">
                        <div className="row">
                            <div className="col-3">
                                <div className="skeleton h-100"></div>
                            </div>
                            <div className="col-8">
                                <div className="d-flex flex-column h-100">
                                    <div className="pb-3 skeleton mt-2" />
                                    <div className="pb-3 skeleton mt-2" />
                                    <div className="pb-3 skeleton mt-2" />
                                    <div className="pb-3 skeleton mt-2" />
                                    <div className="pb-3 skeleton mt-2 flex-grow-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 m-2">
                        <div className="row">
                            <div className="col-3">
                                <div className="skeleton h-100"></div>
                            </div>
                            <div className="col-8">
                                <div className="d-flex flex-column h-100">
                                    <div className="pb-3 skeleton mt-2" />
                                    <div className="pb-3 skeleton mt-2" />
                                    <div className="pb-3 skeleton mt-2" />
                                    <div className="pb-3 skeleton mt-2" />
                                    <div className="pb-3 skeleton mt-2 flex-grow-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default SavedPost;

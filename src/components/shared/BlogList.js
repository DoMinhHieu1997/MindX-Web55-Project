import {transferDate} from '../Common';
import { spliceString } from '../Common';
import { NavLink } from "react-router-dom";

const BlogList = ({blog}) => {
    return (
        <div className="col-12 mb-3">
            <div className="row">
                <div className="col-lg-5 col-5 col-md-12">
                    <NavLink to={"/chi-tiet/"+blog._id}>
                        <div
                            className="ratio ratio-1x1 border rounded image-background new-recipes-try"
                            style={{ backgroundImage: `url(${blog.avatar})` }}
                        ></div>
                    </NavLink>
                </div>
                <div className="col-lg-7 col-7 col-md-12 ps-lg-0 mt-0 mt-md-3 mt-lg-0">
                    <NavLink to={"/chi-tiet/"+blog._id}>
                        <h5 className="text-dark text-06a682-hover d-none d-md-block">{blog.title}</h5>
                        <h6 className="text-dark text-06a682-hover d-md-block d-md-none">{blog.title}</h6>
                    </NavLink>
                    <h6 className="text-secondary mt-3 mt-md-2">{transferDate(blog.updatedAt)}</h6>
                    <div className="d-none d-md-block">{spliceString(blog.description,80)}</div>
                    <div className="d-md-block d-md-none">{spliceString(blog.description,50)}</div>
                </div>
            </div>
        </div>
    );
};

export default BlogList;

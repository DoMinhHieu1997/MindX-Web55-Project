import {transferDate} from '../Common';
import { spliceString } from '../Common';

const BlogList = ({blog}) => {
    return (
        <>
            <div className="col-md-5">
                <a href={"/chi-tiet/"+blog._id}>
                    <div
                        className="ratio ratio-1x1 border rounded image-background new-recipes-try"
                        style={{ backgroundImage: `url(${blog.avatar})` }}
                    ></div>
                </a>
            </div>
            <div className="col-md-7 px-0 ">
                <a href={"/chi-tiet/"+blog._id}>
                    <h5 className="text-dark text-06a682-hover">{blog.title}</h5>
                </a>
                <h6 className="text-secondary mt-3">{transferDate(blog.updatedAt)}</h6>
                <div>{spliceString(blog.description,80)}</div>
            </div>
        </>
    );
};

export default BlogList;

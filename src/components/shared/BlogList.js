import {transferDate} from '../Common'
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
                    <h5>{blog.title}</h5>
                </a>
                <h6 className="text-secondary">{transferDate(blog.updatedAt)}</h6>
                <div>{blog.description}</div>
            </div>
        </>
    );
};
export default BlogList;

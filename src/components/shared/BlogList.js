import COMMON from "../Common";
const BlogList = ({blog}) => {
    return (
        <div className="col-md-6 mb-3 row">
            <div className="col-md-5">
                <a href={COMMON.DOMAIN + "post/detail?id=" + blog._id}>
                    <div
                        className="ratio ratio-1x1 border rounded"
                        style={{ backgroundImage: `url(${blog.avatar})` }}
                    ></div>
                </a>
            </div>
            <div className="col-md-7 px-0">
                <a href={COMMON.DOMAIN + "post/detail?id=" + blog._id}>
                    <h5>{blog.title}</h5>
                </a>
                <h6 className="text-secondary">{blog.updatedAt}</h6>
                <div>{blog.description}</div>
            </div>
        </div>
    );
};
export default BlogList;

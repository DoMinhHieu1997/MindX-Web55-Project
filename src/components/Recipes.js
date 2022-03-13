import {useState, useEffect} from "react";

const Recipes = () => {
  const [list, setList] = useState([]);


  return <div className="container py-5">
    <h3 className="text-center">Công thức cho bạn</h3>
    <div className="list-recipes row mt-4">
      <div className="post-loading row">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  </div>
}

const Skeleton = () => {
  return <div className="col-6 col-sm-3 col-md-3">
    <div className="ratio ratio-1x1 mb-3 rounded overflow-hidden">
      <div className="position-absolute top-0 bottom-0 start-0 end-0 skeleton"></div>
    </div>
    <div className="pb-3 skeleton"></div>
  </div>
}

export default Recipes; 
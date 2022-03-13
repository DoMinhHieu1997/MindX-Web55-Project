import {useState, useEffect} from "react";

const Recipes = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fetch("https://randomuser.me/api/?results=" + size)
    //   .then((res) => res.json())
    //   .then((resJson) => {
    //     setUsers(resJson.results);
    //     setIdLoading(false);
    //   });
  }, [list]);

  return <div className="container py-5">
    <h3 className="text-center">Công thức cho bạn</h3>
    {
      isLoading ? <div className="post-loading row mt-4">
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
      </div> : null
    }
    <div className="list-recipes row mt-4"></div>
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
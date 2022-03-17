import {useState, useEffect} from "react";
import { Button } from "@mui/material";
import PostItem from "./shared/PostItem";
import SkeletonItem from "./shared/SkeletonItem";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import COMMON from "./Common";

const Recipes = () => {
  const [list, setList] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayLoadMore, setDisplayLoadMore] = useState(true);
  const [page, setPage] = useState(1);

  const handleLoadMoreClick = () => {
    console.log("loadmore");
  }

  useEffect(() => {
    setIsLoading(true);
    fetch(`${COMMON.DOMAIN}posts?s=8&t=1&p=`+page)
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.data.length < 8) setDisplayLoadMore(false);
        setList(resJson.data);
        setIsLoading(false);
      });
  }, [page]);

  return <div className="container py-5">
    <div className="d-flex align-items-center justify-content-center">
      <RestaurantIcon sx={{ fontSize: 40 }} style={{color:"#6c757d"}}/>
      <h3 className="text-center text-uppercase fw-normal mx-3 mb-0">Công thức cho bạn</h3>
      <RestaurantIcon sx={{ fontSize: 40 }} style={{color:"#6c757d", transform: "rotateY(180deg)"}}/>
    </div>
    <div className="bg-secondary mx-auto mt-3" style={{ height:"3px",width:"5rem" }}></div>
    <div className="list-recipes row py-4">
      {
        list && list.map((item) => {
          return <div className="col-2 col-md-3 mb-3"><PostItem data={item}/></div>
        })
      }
    </div>
    {
      isLoading ? <div className="post-loading row mt-4">
        <Skeleton />
      </div> : null
    }
    {
      displayLoadMore &&
      <div className="text-center">
        {
          !isLoading && <Button className="return-to-home-btn" variant="outlined" color="primary" onClick={handleLoadMoreClick}>
            <div className="fw-bold">Hiển thị thêm công thức</div>
          </Button>
        }
      </div>
    }
  </div>
}

const Skeleton = () => {
  return <>
    <SkeletonItem />
    <SkeletonItem />
    <SkeletonItem />
    <SkeletonItem />
    <SkeletonItem />
    <SkeletonItem />
    <SkeletonItem />
    <SkeletonItem />
    <SkeletonItem />
    <SkeletonItem />
    <SkeletonItem />
    <SkeletonItem />
  </>
}

export default Recipes; 
import {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import { Button } from "@mui/material";
import PostItem from "./shared/PostItem";
import SkeletonItem from "./shared/SkeletonItem";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import {COMMON} from "./Common";
import FloatingAction from "./shared/FloatingAction";
import { useNavigate } from "react-router-dom";

const Recipes = () => {
  let navigate = useNavigate();
  const pageParam = useParams();
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayLoadMore, setDisplayLoadMore] = useState(true);
  const [page, setPage] = useState(pageParam?.page ? pageParam.page : 1);

  const handleLoadMoreClick = () => {
    getListRecipes(2);
    navigate(`/cong-thuc/${page+1}`,{replace:true});
    setPage(prev => prev + 1);
  }

  const getListRecipes = (type) => {
    console.log(page);
    const number = type === 1;
    setIsLoading(true);
    console.log(`${COMMON.DOMAIN}posts?s=${number ? 8*page : 8}&t=1&p=${number ? 1 : (page + 1)}`);
    fetch(`${COMMON.DOMAIN}posts?s=${number ? 8*page : 8}&t=1&p=${number ? 1 : (page + 1)}`)
    .then((res) => res.json())
    .then((resJson) => {
      if (resJson.data.length % 2 !== 0) setDisplayLoadMore(false);
      setList(prev => [...prev,...resJson.data]);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    console.log("i phếch");
    getListRecipes(1);
  },[]);

  return <>
    <FloatingAction />
    <div className="container py-5">
      <div className="d-flex align-items-center justify-content-center">
        <RestaurantIcon sx={{ fontSize: 40 }} style={{color:"#6c757d"}}/>
        <h3 className="text-center text-uppercase fw-normal mx-3 mb-0">Công thức cho bạn</h3>
        <RestaurantIcon sx={{ fontSize: 40 }} style={{color:"#6c757d", transform: "rotateY(180deg)"}}/>
      </div>
      <div className="bg-secondary mx-auto mt-3" style={{ height:"3px",width:"5rem" }}></div>
      <div className="list-recipes row py-4">
        {
          list && list.map((item,index) => {
            return <div key={index} className="col-6 col-md-3 mb-3"><PostItem data={item}/></div>
          })
        }
      </div>
      {
        isLoading ? <div className="post-loading row mt-3">
          <Skeleton />
        </div> : null
      }
      {
        displayLoadMore &&
        <div className="text-center">
          {
            !isLoading && <Button variant="outlined" color="primary" onClick={handleLoadMoreClick}>
              <div className="fw-bold">Hiển thị thêm công thức</div>
            </Button>
          }
        </div>
      }
    </div>
  </>
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
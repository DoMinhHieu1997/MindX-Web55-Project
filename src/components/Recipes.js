import {useState, useEffect} from "react";
import { Button } from "@mui/material";
import PostItem from "./shared/PostItem";
import SkeletonItem from "./shared/SkeletonItem";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import {COMMON} from "./Common";
import FloatingAction from "./shared/FloatingAction";
import { useNavigate,useParams } from "react-router-dom";
import { ConstructionOutlined, Preview } from "@mui/icons-material";

const Recipes = () => {
  const navigate = useNavigate();
  const paramPage = useParams();
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMoreClick = () => {
    navigate(`/cong-thuc/${!paramPage.page ? 2 : paramPage.page*1 + 1}`,{page:true});
  }

  useEffect(() => {
    if (!paramPage.page) {
      getListRecipes(1);
    } else {
      getListRecipes(paramPage.page*1);
    }
  },[paramPage])

  const getListRecipes = (pageNum) => {
    setIsLoading(true);
    fetch(`${COMMON.DOMAIN}posts?s=${8*pageNum}&t=1&p=1`)
    .then((res) => res.json())
    .then((resJson) => {
      setList([...resJson.data]);
      setIsLoading(false);
    });
  }

  return <>
    <FloatingAction />
    <div className="container py-5">
      <div className="d-flex align-items-center justify-content-center">
        <RestaurantIcon sx={{ fontSize: 40 }} style={{color:"#6c757d"}}/>
        <h3 className="text-center text-uppercase fw-normal mx-3 mb-0">Công thức cho bạn</h3>
        <RestaurantIcon sx={{ fontSize: 40 }} style={{color:"#6c757d", transform: "rotateY(180deg)"}}/>
      </div>
      <div className="bg-secondary mx-auto mt-3" style={{ height:"3px",width:"5rem" }}></div>
      <div className="list-recipes row py-3">
        {
          list && list.map((item,index) => {
              return <div key={index} className="col-12 col-md-3 mb-3"><PostItem data={item}/></div>
          })
        }
      </div>
      {
        isLoading ? <div className="post-loading row mt-3">
          <Skeleton />
        </div> : null
      }
      <div className="text-center">
        {
          !isLoading && <Button hidden={list.length < paramPage?.page*8} variant="outlined" color="primary" onClick={handleLoadMoreClick}>
            <div className="fw-bold">Hiển thị thêm công thức</div>
          </Button>
        }
      </div>
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
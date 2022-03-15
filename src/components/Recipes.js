import {useState, useEffect} from "react";
import { Button } from "@mui/material";
import PostItem from "./shared/PostItem";
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';

const Recipes = () => {
  const [list, setList] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [size, setSize] = useState(10);

  const listRecipes = [
    {
      id:1,
      userid:1,
      authorName:'minhhieu',
      title:'công thức 1',
      description:'đây là công thức 1',
      content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      avatar:'https://yt3.ggpht.com/ytc/AKedOLRnTRRXf6mT_gGQUTaCCZeLLc2FUB8lJOFq7CElow=s88-c-k-c0x00ffffff-no-rj',
      type:2,
      totalcalories:'300kcal',
      createdAt:'13/3/2022',
      ingredients:{},
      countLike:5,
      usersLike:[1,2,3,4,5]
    },
    {
      id:1,
      userid:1,
      authorName:'minhhieu',
      title:'công thức 1',
      description:'đây là công thức 1',
      content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      avatar:'https://yt3.ggpht.com/ytc/AKedOLRnTRRXf6mT_gGQUTaCCZeLLc2FUB8lJOFq7CElow=s88-c-k-c0x00ffffff-no-rj',
      type:2,
      totalcalories:'300kcal',
      createdAt:'13/3/2022',
      ingredients:{},
      countLike:5,
      usersLike:[1,2,3,4,5]
    },
    {
      id:1,
      userid:1,
      authorName:'minhhieu',
      title:'công thức 1',
      description:'đây là công thức 1',
      content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      avatar:'https://yt3.ggpht.com/ytc/AKedOLRnTRRXf6mT_gGQUTaCCZeLLc2FUB8lJOFq7CElow=s88-c-k-c0x00ffffff-no-rj',
      type:2,
      totalcalories:'300kcal',
      createdAt:'13/3/2022',
      ingredients:{},
      countLike:5,
      usersLike:[1,2,3,4,5]
    },
    {
      id:1,
      userid:1,
      authorName:'minhhieu',
      title:'công thức 1',
      description:'đây là công thức 1',
      content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      avatar:'https://yt3.ggpht.com/ytc/AKedOLRnTRRXf6mT_gGQUTaCCZeLLc2FUB8lJOFq7CElow=s88-c-k-c0x00ffffff-no-rj',
      type:2,
      totalcalories:'300kcal',
      createdAt:'13/3/2022',
      ingredients:{},
      countLike:5,
      usersLike:[1,2,3,4,5]
    },
    {
      id:1,
      userid:1,
      authorName:'minhhieu',
      title:'công thức 1',
      description:'đây là công thức 1',
      content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      avatar:'https://yt3.ggpht.com/ytc/AKedOLRnTRRXf6mT_gGQUTaCCZeLLc2FUB8lJOFq7CElow=s88-c-k-c0x00ffffff-no-rj',
      type:2,
      totalcalories:'300kcal',
      createdAt:'13/3/2022',
      ingredients:{},
      countLike:5,
      usersLike:[1,2,3,4,5]
    },
    {
      id:1,
      userid:1,
      authorName:'minhhieu',
      title:'công thức 1',
      description:'đây là công thức 1',
      content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      avatar:'https://yt3.ggpht.com/ytc/AKedOLRnTRRXf6mT_gGQUTaCCZeLLc2FUB8lJOFq7CElow=s88-c-k-c0x00ffffff-no-rj',
      type:2,
      totalcalories:'300kcal',
      createdAt:'13/3/2022',
      ingredients:{},
      countLike:5,
      usersLike:[1,2,3,4,5]
    },
    {
      id:1,
      userid:1,
      authorName:'minhhieu',
      title:'công thức 1',
      description:'đây là công thức 1',
      content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      avatar:'https://yt3.ggpht.com/ytc/AKedOLRnTRRXf6mT_gGQUTaCCZeLLc2FUB8lJOFq7CElow=s88-c-k-c0x00ffffff-no-rj',
      type:2,
      totalcalories:'300kcal',
      createdAt:'13/3/2022',
      ingredients:{},
      countLike:5,
      usersLike:[1,2,3,4,5]
    },
    {
      id:1,
      userid:1,
      authorName:'minhhieu',
      title:'công thức 1',
      description:'đây là công thức 1',
      content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      avatar:'https://yt3.ggpht.com/ytc/AKedOLRnTRRXf6mT_gGQUTaCCZeLLc2FUB8lJOFq7CElow=s88-c-k-c0x00ffffff-no-rj',
      type:2,
      totalcalories:'300kcal',
      createdAt:'13/3/2022',
      ingredients:{},
      countLike:5,
      usersLike:[1,2,3,4,5]
    }
  ];

  const handleLoadMoreClick = () => {
    console.log("loadmore");
  }

  useEffect(() => {
    // fetch("https://randomuser.me/api/?results=" + size)
    //   .then((res) => res.json())
    //   .then((resJson) => {
    //     setUsers(resJson.results);
    //     setIdLoading(false);
    //   });
    setIsLoading(true);
    setTimeout(() => {
      setList(listRecipes);
      console.log(list);
      setIsLoading(false);
    },3000);
  }, [size]);

  return <div className="container py-5">
    <div className="d-flex align-items-center justify-content-center">
      <LocalDiningOutlinedIcon sx={{ fontSize: 40 }} style={{color:"#d28319"}}/>
      <h3 className="text-center text-uppercase fw-normal mx-3 mb-0">Công thức cho bạn</h3>
      <LocalDiningOutlinedIcon sx={{ fontSize: 40 }} style={{color:"#d28319"}}/>
    </div>
    <div className="bg-secondary mx-auto mt-3" style={{ height:"3px",width:"5rem" }}></div>
    {
      isLoading ? <div className="post-loading row mt-4">
        <Skeleton />
      </div> : null
    }
    <div className="list-recipes row py-4">
      {
        list && list.map((item) => {
          return <div className="col-2 col-md-3"><PostItem /></div>
        })
      }
    </div>
    <div className="text-center">
      {
        !isLoading && <Button className="return-to-home-btn" variant="outlined" color="primary" onClick={handleLoadMoreClick}>
          <div className="fw-bold">Hiển thị thêm công thức</div>
        </Button>
      }
    </div>
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

const SkeletonItem = () => {
  return <div className="col-6 col-sm-3 col-md-3 mb-4">
    <div className="ratio ratio-4x3 mb-3 rounded overflow-hidden">
      <div className="position-absolute top-0 bottom-0 start-0 end-0 skeleton"></div>
    </div>
    <div className="pb-3 skeleton mt-2"></div>
    <div className="pb-3 skeleton mt-2"></div>
    <div className="pb-3 skeleton mt-2"></div>
  </div>
}

export default Recipes; 
import {useState, useEffect} from "react";
import { Button } from "@mui/material";

const Recipes = () => {
  const [list, setList] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [size, setSze] = useState(10);

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
    }
  ];

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
    <div className="text-center">
      {
        !isLoading && <Button className="return-to-home-btn" variant="outlined" color="primary" href="/">Hiển thị thêm công thức</Button>
      }
    </div>
  </div>
}

const Skeleton = () => {
  return <div className="col-6 col-sm-3 col-md-3 mb-4">
    <div className="ratio ratio-1x1 mb-3 rounded overflow-hidden">
      <div className="position-absolute top-0 bottom-0 start-0 end-0 skeleton"></div>
    </div>
    <div className="pb-3 skeleton mt-2"></div>
    <div className="pb-3 skeleton mt-2"></div>
  </div>
}

export default Recipes; 
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState,useContext,useEffect } from 'react';
import AppCtx from "../../appContext";
import {COMMON,spliceString} from '../Common';

const PostItem = (props) => {
  const appCtx = useContext(AppCtx);
  const userId = appCtx.userInfo?._id;
  const token =  localStorage.getItem("token") || sessionStorage.getItem("token");
  const [isLove, setIsLove] = useState(false);
  const [totalLike, setTotalLike] = useState(props.data.usersLike.length ? props.data.usersLike.length : 0);
  const [justLiked, setJustLiked] = useState(false);

  useEffect(() => {
    if (token) {
      if (props.data.usersLike.indexOf(userId) > -1)
      setIsLove(true);
    }
  },[userId])
  
  const handleLike = (event) => {

    if (token) {
      setJustLiked(true);
      const data = {
        "_id":props.data._id,
        "userLike":[...props.data.usersLike,userId]
      }
    
      fetch(`${COMMON.DOMAIN}posts/like`,{
        method: "PATCH",
        headers: {
          'Content-type':'application/json',
          'Authorization':"Bearer "+token
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(resJson => {
        if (resJson.message === "success") {
          setTotalLike(prev => prev + 1);
          setIsLove(true);
        }
      });
    } else {
      appCtx.setOpenLoginNotify(true);
    }
  }

  return <div className='card overflow-hidden h-100'>
    <div className="rounded oveflow-hidden">
      <a href={"/chi-tiet/"+props.data._id}>
        <div className="ratio ratio-1x1 image-background" style={{backgroundImage:`url(${props.data.avatar})`}}>
          {
            props.isTopLikeItem && <div className="top-0 bottom-0 end-0 start-0" style={{backgroundColor:"rgba(0,0,0,.2)"}}></div>
          }
        </div>
      </a>
      <div className="p-1 mt-2 ms-2 position-absolute top-0 bg-06a682 rounded text-white">
        {
          !isLove 
            ? <FavoriteBorderOutlinedIcon style={{color:"white"}} className="d-inline-block" onClick={!justLiked ? handleLike : null}/>
            : <FavoriteIcon className="d-inline-block" style={{color: "#d83737"}}/> 
        }
        <div className="ms-2 d-inline-block h6 mb-0">{totalLike} Lượt thích</div>
      </div>
    </div>
    <div className={props.isTopLikeItem ? "card-body pb-2 position-absolute bottom-0 end-0 start-0 text-shadow" : "mt-2 px-2"}>
      <a href={"/chi-tiet/"+props.data._id}>
        <h5 className={"card-title " + (props.isTopLikeItem ? "text-white toplike-title" : "normal-title")}>{props.data.title}</h5>
      </a>
      {
        !props.isTopLikeItem && <p className="card-text pb-2">{spliceString(props.data.description,80)}</p>
      }
    </div>
  </div>
}

export default PostItem;
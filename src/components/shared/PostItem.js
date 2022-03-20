import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import {COMMON} from '../Common';

const PostItem = (props) => {
  const [isLove, setIsLove] = useState(false);
  const [totalLike, setTotalLike] = useState(props.data.usersLike.length ? props.data.usersLike.length : 0);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjMxOTQ3MDc3NmY2Y2M5Y2E4NjFlYmQiLCJpYXQiOjE2NDc3NDU2NDMsImV4cCI6MTY1MDMzNzY0M30.9Hb7h96Zfm0daSpjJc5t_2PQyPZGmTcgVRkvBtkCs84";
  const data = {
    "_id":props.data._id,
    "userLike":["623214b4d53a3a1b371680a8","62319470776f6cc9ca861ebd"]
  }

  const handleLike = (event) => {
    setTotalLike(prev => prev + 1);
    setIsLove(true);
    fetch(`${COMMON.DOMAIN}posts/like`,{
      method: "PATCH",
      headers: {
        'Content-type':'application/json',
        'Authorization':"Bearer "+token
      },
      body: JSON.stringify(data)
    }).then(res => {
      console.log(res);
    });
  }

  return <div className='card overflow-hidden h-100'>
    <div className="position-relative rounded oveflow-hidden">
      <a href={"/chi-tiet/"+props.data._id}>
        <div className="ratio ratio-4x3 image-background" style={{backgroundImage:`url(${props.data.avatar})`}}></div>
      </a>
      <div className="pb-2 pt-1 ps-2 position-absolute top-0 start-0 end-0 bg-linear">
        {
          !isLove 
            ? <FavoriteBorderOutlinedIcon className="d-inline-block" onClick={handleLike}/>
            : <FavoriteIcon className="d-inline-block" style={{color: "#d83737"}}/> 
        }
        <div className="ms-2 d-inline-block h6 mb-0">{totalLike} Lượt thích</div>
      </div>
    </div>
    <div className="card-body pb-2">
      <a href={"/chi-tiet/"+props.data._id}>
        <h5 className="card-title">{props.data.title}</h5>
      </a>
      {
        !props.isTopLikeItem && <p className="card-text">{props.data.description}</p>
      }
    </div>
  </div>
}

export default PostItem;
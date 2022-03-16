import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import COMMON from '../Common';

const PostItem = (props) => {
  const [isLove, setIsLove] = useState(false);
  const [totalLike, setTotalLike] = useState(props.data.countLike ? props.data.countLike : 0);

  const handleLike = (event) => {
    setTotalLike(prev => prev + 1);
    setIsLove(true);
  }

  return <div className='card mb-3 overflow-hidden'>
    <div className="position-relative rounded oveflow-hidden">
      <a href={COMMON.DOMAIN+"post/detail?id="+props.data._id}>
        <div className="ratio ratio-4x3" style={{backgroundImage:`url(${props.data.avatar})`}}></div>
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
    <div className="card-body">
      <a href={"/chi-tiet/"+props.data._id}>
        <h5 className="card-title">{props.data.title}</h5>
      </a>
      <p className="card-text">{props.data.description}</p>
    </div>
  </div>
}

export default PostItem;
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';

const PostItem = (props) => {
  const [isLove, setIsLove] = useState(false);
  const [totalLike, setTotalLike] = useState(10);

  const handleLike = (event) => {
    setTotalLike(prev => prev + 1);
    setIsLove(true);
  }

  return <div className='card mb-3'>
    <div className="ratio ratio-4x3 rounded oveflow-hidden">
      <div className="bg-light"></div>
      <div className="mt-2 ms-2">
        {
          !isLove 
            ? <FavoriteBorderOutlinedIcon className="d-inline-block" onClick={handleLike}/>
            : <FavoriteIcon className="d-inline-block" style={{color: "#d83737"}}/> 
        }
        <div className="ms-2 d-inline-block h6 mb-0">{totalLike} Lượt thích</div>
      </div>
    </div>
    <div className="card-body">
      <h5 className="card-title">Card title</h5>
      <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    </div>
  </div>
}

export default PostItem;
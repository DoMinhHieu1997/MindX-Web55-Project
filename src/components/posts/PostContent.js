import AccessAlarmsOutlinedIcon from '@mui/icons-material/AccessAlarmsOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

const PostContent = (props) => {
    const data = props.postContent.data;
    const [isLove, setIsLove] = useState(false);
    const [countLike, setCountLike] = useState(data.countLike);

    const handleLike = () => {
        setIsLove(true);
    }

    return <>
        <div>
            <h1>{data.title}</h1>
            <div className="d-flex align-items-center flex-start mt-3">
                <AccessAlarmsOutlinedIcon style={{color:"#6c757d"}} fontSize="sm"/>
                <div className="ms-2 text-secondary fs-6">{data.createdAt}</div>
            </div>
            {
                data.description && <div className="mt-4 mb-3 fs-4">{data.description}</div>
            }
            {
                data.type == 1
                    && <div className="mt-4">
                        <h4>Chuẩn bị nguyên liệu cho món ăn</h4>
                        <ul className="dishes-ingredients">
                            {
                                data.ingredients.map((item) => {
                                    return <li>
                                        <div className="d-flex">
                                            <div className="h5">{item.nameIngredient}</div>
                                            <div>- {item.total+" "+item.unit}</div>
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
            }
            <div className="mt-4 fs-4">{data.content}</div>
            <div className="fs-5 mt-3 fw-bold">{data.authorName}</div>
        </div>
        <div className="mt-4">
            <div className="mb-3">
                {
                    !isLove 
                    ? <FavoriteBorderOutlinedIcon className="d-inline-block" onClick={handleLike}/>
                    : <FavoriteIcon className="d-inline-block" style={{color: "#d83737"}}/> 
                }
                <div className="ms-2 d-inline-block h6 mb-0">{countLike} Lượt thích</div>
            </div>
            <div className="d-flex align-items-top">
                <TextareaAutosize aria-label="minimum height" minRows={3} placeholder="Ý kiến của bạn..." className="w-75"/>
                <div className="ms-3">
                    <Button variant="contained" endIcon={<SendIcon />} className="bg-3e9294">
                        Send
                    </Button>
                </div>
            </div>
        </div>
    </>
}

export default PostContent;
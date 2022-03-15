import AccessAlarmsOutlinedIcon from '@mui/icons-material/AccessAlarmsOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState, useEffect } from 'react';

const PostContent = (props) => {
    const [isLove, setIsLove] = useState(false);
    const [countLike, setCountLike] = useState(props.postContent.countLike);

    const handleLike = () => {
        setIsLove(true);
    }

    useEffect(() => {
        // fetch("https://randomuser.me/api/?results=" + size)
    //   .then((res) => res.json())
    //   .then((resJson) => {
    //     setUsers(resJson.results);
    //     setIdLoading(false);
    //   });
    }, [])

    return <>
        <div>
            <h1>{props.postContent.title}</h1>
            <div className="d-flex align-items-center flex-start mt-3">
                <AccessAlarmsOutlinedIcon style={{color:"#6c757d"}} fontSize="sm"/>
                <div className="ms-2 text-secondary fs-6">{props.postContent.createdAt}</div>
            </div>
            {
                props.postContent.description && <div className="mt-4 mb-3 fs-4">{props.postContent.description}</div>
            }
            <div className="mt-4 fs-4">{props.postContent.content}</div>
            <div className="fs-5 mt-3 fw-bold">{props.postContent.authorName}</div>
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
                    <Button variant="contained" endIcon={<SendIcon />}>
                        Send
                    </Button>
                </div>
            </div>
        </div>
    </>
}

export default PostContent;
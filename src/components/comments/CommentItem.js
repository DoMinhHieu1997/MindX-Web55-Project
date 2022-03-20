import AccessAlarmsOutlinedIcon from "@mui/icons-material/AccessAlarmsOutlined"; 
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {transferDate} from "../Common";
import { useState,useRef } from "react";
import { Button, TextField } from "@mui/material";
import { COMMON } from "../Common";

const CommentItem = (props) => {
  const userId = "62319470776f6cc9ca861ebd";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjMxOTQ3MDc3NmY2Y2M5Y2E4NjFlYmQiLCJpYXQiOjE2NDc3NDU2NDMsImV4cCI6MTY1MDMzNzY0M30.9Hb7h96Zfm0daSpjJc5t_2PQyPZGmTcgVRkvBtkCs84";
  const [canUpdate, setCanUpdate] = useState(props.data.userId.indexOf(userId) > -1 ? true : false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [content, setContent] = useState(props.data.content);
  const [contentForUpdate, setContentForUpdate] = useState(props.data.content);
  const [isError, setIsError] = useState(false);

  const toggleUpdate = () => {
    setIsUpdating(!isUpdating);
  }

  const handleTextFieldChange = (event) => {
    if (event.target.value)
      setIsError(false);
    setContentForUpdate(event.target.value);
  }

  const handleUpdate = () => {
    setIsError(false);

    if (contentForUpdate) {
      const data = {
        "_id":props.data._id,
        "postId":props.data.postId,
        "content":contentForUpdate
      }

      fetch(`${COMMON.DOMAIN}comments/update`,{
        method: "PATCH",
        headers: {
          'Content-type':'application/json',
          'Authorization':"Bearer "+token
        },
        body: JSON.stringify(data)
      }).then(res => {
        if (res.status === 200) {
          setContent(contentForUpdate);
          setIsUpdating(false);
        }
      });
    } else {
      setIsError(true);
    }

  }

  return <div className="mb-4 col-12 col-md-9">
    <div className="d-flex">
      <div className="me-4 fs-6 fw-bold">User Name</div>
      <div className="text-secondary fs-6">
        <span><AccessAlarmsOutlinedIcon fontSize="sm"/></span> <span style={{fontSize:".8rem"}}>{transferDate(props.data.createdAt)}</span></div>
    </div>
    <div>{content}</div>
    {
      canUpdate
      ?
        <div>
          <div className="d-flex align-items-center mt-2 cursor-pointer">
            <DriveFileRenameOutlineIcon  fontSize="sm"/>
            <div className="ms-2" style={{fontSize:".8rem"}} onClick={toggleUpdate}>Sửa</div>
          </div> 
          {
            isUpdating && <div className="mt-2 cursor-pointer">
              <TextField id="filled-basic" error={isError ? true : false} label={isError ? "Mời nhập bình luận": null} fullWidth variant="filled" className="rounded" defaultValue={contentForUpdate} onChange={handleTextFieldChange}/>
              <div className="d-flex mt-2">
                <Button variant="contained" className="bg-3e9294 me-3" onClick={handleUpdate}>Cập nhật</Button>
                <Button variant="contained" className="bg-3e9294" onClick={toggleUpdate}>Hủy</Button>
              </div>
            </div>
          }
        </div>
      : null
    }
  </div>
}

export default CommentItem;
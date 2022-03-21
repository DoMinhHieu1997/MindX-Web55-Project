import {useState,useContext,useEffect} from "react";
import AppCtx from "../../appContext";
import LoupeIcon from "@mui/icons-material/Loupe";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoardOutlined";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import {  Modal, Tooltip } from "@mui/material";
import React from "react";
import CreatePosts from "../posts/CreatePosts";

const FloatingAction = () => {
  const appCtx = useContext(AppCtx);
  const token = appCtx.userToken;
  const [showActions, setShowActions] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (token)
      setShowActions(true);
  },[token]);

  return (
    <>
      <div className="position-fixed end-0 top-50 translate-middle-y me-3 z-index-3" hidden={!showActions}>
        <div>
          <Tooltip title="Thêm bài viết / công thức">
            <LoupeIcon
              fontSize="large"
              onClick={() => {
                handleOpen();
              }}
              style={{ color: "#6c757d" }}
            />
          </Tooltip>
        </div>
        <div className="mt-3">
          <Tooltip title="Thời khóa biểu">
            <DeveloperBoardIcon fontSize="large" style={{ color: "#6c757d" }} />
          </Tooltip>
        </div>
        <div className="mt-3">
          <Tooltip title="Gợi ý món ăn">
            <ContentPasteSearchIcon
              fontSize="large"
              style={{ color: "#6c757d" }}
            />
          </Tooltip>
        </div>
      </div>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ paddingTop: 16 ,overflow:'scroll'}}
      >
        <>
          <CreatePosts onClose={handleClose} />
        </>
      </Modal>
    </>
  );
};

export default FloatingAction;

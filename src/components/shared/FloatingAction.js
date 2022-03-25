import { useState, useEffect } from "react";
import LoupeIcon from "@mui/icons-material/Loupe";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoardOutlined";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import { Modal, Tooltip, Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import CreatePosts from "../posts/CreatePosts";

const FloatingAction = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const [showActions, setShowActions] = useState(false);
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const handleOpenCreatePost = () => setOpenCreatePost(true);
  const handleCloseCreatePost = () => setOpenCreatePost(false);
  const [openTable, setOpenTable] = useState(false);
  const handleClickOpenTable = () => {
    setOpenTable(true);
  };
  const handleCloseTable = () => {
    setOpenTable(false);
  };

  useEffect(() => {
    if (token) setShowActions(true);
  }, [token]);
  return (
    <>
      <div
        className="position-fixed end-0 me-md-3 me-0 z-index-3 bg-white border py-2 px-1 rounded"
        hidden={!showActions}
        style={{top:"55%"}}
      >
        <div>
          <Tooltip title="Thêm bài viết / công thức">
            <LoupeIcon
              fontSize="large"
              onClick={() => {
                handleOpenCreatePost();
              }}
              style={{ color: "#6c757d" }}
            />
          </Tooltip>
        </div>
        <div className="mt-4">
          <Tooltip title="Thời khóa biểu">
            <DeveloperBoardIcon fontSize="large" onClick={() => {
                handleClickOpenTable();
              }} style={{ color: "#6c757d" }} />
          </Tooltip>
        </div>
      </div>
      <Modal
        open={openCreatePost}
        onClose={handleCloseCreatePost}
        sx={{ paddingTop: 5, overflow: "scroll", marginX: 1 }}
      >
        <div>
          <CreatePosts />
        </div>
      </Modal>

      <Dialog open={openTable} onClose={handleCloseTable}>
        <DialogTitle>Tạo thời khóa biểu</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingAction;

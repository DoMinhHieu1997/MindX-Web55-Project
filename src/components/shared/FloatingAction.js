import { useState,  useEffect } from "react";
import LoupeIcon from "@mui/icons-material/Loupe";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoardOutlined";
import { Modal, Tooltip } from "@mui/material";
import CreatePosts from "../posts/CreatePosts";

const FloatingAction = () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const [showActions, setShowActions] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (token) setShowActions(true);
  }, [token]);
  return (
    <>
      <div
        className="position-fixed end-0 top-50 translate-middle-y me-md-3 me-0 z-index-3 bg-white border py-2 px-1 rounded"
        hidden={!showActions}
      >
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
        <div className="mt-4">
          <Tooltip title="Thời khóa biểu">
            <DeveloperBoardIcon fontSize="large" style={{ color: "#6c757d" }} />
          </Tooltip>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ paddingTop: 5, overflow: "scroll", marginX: 1 }}
      >
        <CreatePosts dataEdit={{}} onClose={handleClose} setOpen={setOpen} />
      </Modal>
    </>
  );
};

export default FloatingAction;

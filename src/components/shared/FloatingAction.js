import { useState,  useEffect } from "react";
import LoupeIcon from "@mui/icons-material/Loupe";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoardOutlined";
import { Modal, Tooltip } from "@mui/material";
import CreatePosts from "../posts/CreatePosts";

const FloatingAction = () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const [showActions, setShowActions] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

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
        open={openModal}
        onClose={handleClose}
        sx={{ paddingTop: 5, overflow: "scroll", marginX: 1 }}
      >
        <CreatePosts dataEdit={{}} onClose={handleClose} setOpen={setOpenModal} />
      </Modal>
    </>
  );
};

export default FloatingAction;

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
  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);

  useEffect(() => {
    if (token) setShowActions(true);
  }, [token]);
  return (
    <>
      <div
        className="position-fixed end-0 top-50 translate-middle-y me-md-3 me-0 z-index-3 bg-06a682 border py-2 px-1 rounded"
        hidden={!showActions}
      >
        <div>
          <Tooltip title="Thêm bài viết / công thức">
            <LoupeIcon
              fontSize="large"
              onClick={() => {
                handleOpen();
              }}
              style={{ color: "white" }}
            />
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

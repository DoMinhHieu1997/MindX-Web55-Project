import LoupeIcon from "@mui/icons-material/Loupe";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoardOutlined";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import { Button, Modal, Tooltip } from "@mui/material";
import NewPosts from "../posts/NewPosts";
import React from "react";

const FloatingAction = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="position-fixed end-0 top-50 translate-middle-y me-3">
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
        sx={{ paddingTop: 16 }}
      >
        <>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
          <NewPosts />
        </>
      </Modal>
    </>
  );
};

export default FloatingAction;

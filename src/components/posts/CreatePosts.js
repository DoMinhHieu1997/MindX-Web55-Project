import React, { useRef, useState } from "react";
import { Button, Container, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import uploadImageSever from "./uploadImageSever";
import FeaturedPhoto from "./FeaturedPhoto";
import { http } from "../profile/config";
import "./posts.css";
import Toggle from "./Toggle";
import { Box } from "@mui/system";
import AddIngredients from "./AddIngredients";

const editorConfiguration = {
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "imageUpload",
      "bulletedList",
      "numberedList",
      "link",
      "|",
      "blockQuote",
      "insertTable",
      "undo",
      "redo",
    ],
  },
  language: "vi",

  image: {
    toolbar: [
      "imageTextAlternative",
      "imageStyle:inline",
      "imageStyle:block",
      "imageStyle:side",
    ],
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
};

function CreatePosts({ onClose }) {
  let test = document.getElementById("test");
  const {
    formState: { errors },
    trigger,
    handleSubmit,
    register,
    setValue,
  } = useForm();
  const [toggle, setToggle] = useState(true);
  const handleClick = (toggle) => {
    setToggle(toggle);
  };
  const uploadPosts = useRef({ avatar: "", content: "" });
  const [photo, setPhoto] = useState("");
  const [imgPreview, setImgPreview] = useState(null);

  const onSubmit = async (data) => {
    uploadPosts.current = { ...uploadPosts.current, ...data };
    const formData = new FormData();
    formData.append("myFile", photo);
    photo && setValue("avatar", photo);
    http.post("/upload", formData).then((res) => {
      uploadPosts.current.avatar = res.data[res.data.length - 1];
      uploadPosts.current.type = 1;
      http
        .post("/posts/create", uploadPosts.current)
        .then((res) => console.log(res));
      test.innerHTML = uploadPosts.current.content;
    });
  };
  const handlePhoto = (file) => {
    setPhoto(file);
    file && setValue("avatar", file);
  };
  console.log(errors);
  return (
    <div>
      <Container
        maxWidth="md"
        sx={{
          bgcolor: "white",
          width: "100%",
          height: "100%",
          borderRadius: 1.5,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Toggle toggle={toggle} handleClick={handleClick} />
          <TextField
            sx={{ margin: "10px 0" }}
            error={!!errors.title?.message}
            fullWidth
            size="small"
            label={errors.title?.message || "Tiêu đề"}
            {...register("title", {
              required: {
                value: true,
                message: "Vui lòng viết tiêu đề",
              },
              onBlur: () => trigger(),
            })}
          />
          <TextField
            error={!!errors.description?.message}
            fullWidth
            multiline
            label={errors.description?.message || "Mô tả"}
            {...register("description", {
              required: {
                value: true,
                message: "Vui lòng viết mô tả",
              },
              onBlur: () => trigger(),
            })}
          />
          <FeaturedPhoto
            imgPreview={imgPreview}
            setImgPreview={setImgPreview}
            onChangeFile={handlePhoto}
            label={errors.avatar?.message || false}
            {...register("avatar", {
              required: {
                value: !imgPreview,
                message: "Vui lòng tải ảnh đại diện cho bài viết",
              },
            })}
          />
          {!toggle && <AddIngredients />}
          {!toggle && (
            <TextField
              sx={{m:'10px 0'}}
              error={!!errors.totalCalories?.message}
              fullWidth
              multiline
              size="small"
              label={errors.totalCalories?.message || "Tổng lượng Calo"}
              {...register("totalCalories", {
                required: {
                  value: true,
                  message: "Vui lòng viết tổng lượng Calo",
                },
                onBlur: () => trigger(),
              })}
            />
          )}
          <Box sx={{height:'100%',p:'10px 0'}}>
            <CKEditor
              editor={Editor}
              config={editorConfiguration}
              data=""
              onChange={(event, editor) => {
                const data = editor.getData();
                uploadPosts.current.content = data;
              }}
              required={true}
              onReady={(editor) => {
                editor.plugins.get("FileRepository").createUploadAdapter = (
                  loader
                ) => {
                  return new uploadImageSever(loader);
                };
              }}
            />
          </Box>
          {!uploadPosts.current.content && imgPreview && (
            <p style={{ color: "#dc3545" }}>Vui lòng viết nội dung bài viết</p>
          )}
          <div id="test" className="ck-content"></div>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button sx={{ margin: "10px 0" }} type="submit" variant="contained">
              Tạo bài viết
            </Button>
            <Button
              sx={{ margin: "10px 30px" }}
              type="button"
              variant="contained"
              onClick={onClose}
            >
              hủy bỏ
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
}

export default CreatePosts;
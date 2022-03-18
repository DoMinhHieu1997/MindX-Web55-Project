import React, { useRef } from "react";
import { Button, Container, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import uploadImageSever from "./uploadImageSever";
import FeaturedPhoto from "./FeaturedPhoto";
import { http } from "../profile/config";
import "./posts.css";

const editorConfiguration = {
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "|",
      "outdent",
      "indent",
      "|",
      "imageUpload",
      "resizeImage",
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

function NewPosts() {
  let test = document.getElementById("test");
  const {
    formState: { errors },
    trigger,
    handleSubmit,
    register,
  } = useForm();

  const uploadPosts = useRef({ featuredPhoto: "", description: "" });

  const onSubmit = async (data) => {
    uploadPosts.current = { ...uploadPosts.current, ...data };
    console.log(uploadPosts.current);

    test.innerHTML = uploadPosts.current.content;
  };
  const handlePhoto = (file) => {
    const formData = new FormData();
    formData.append("myFile", file);

    http.post("/upload", formData).then((res) => {
      uploadPosts.current = {
        ...uploadPosts.current,
        featuredPhoto: res.data[res.data.length - 1],
      };
    });
  };

  return (
    <div>
      <Container maxWidth="lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Tạo bài viết mới</h3>
          <TextField
            style={{ marginBottom: "10px" }}
            error={!!errors.title?.message}
            fullWidth
            label={errors.title?.message || "Tiêu đề"}
            {...register("title", {
              required: {
                value: true,
                message: "Vui lòng điền tiêu đề",
              },

              onBlur: () => trigger(),
            })}
          />
          <TextField
            style={{ margin: "10px 0" }}
            error={!!errors.description?.message}
            fullWidth
            multiline
            label={errors.description?.message || "Mô tả"}
            {...register("description", {
              required: {
                value: true,
                message: "Vui lòng điền mô tả",
              },

              onBlur: () => trigger(),
            })}
          />
          <FeaturedPhoto
            onChange={handlePhoto}
            label={errors.featuredPhoto?.message || "Tải ảnh đại diện cho bài viết"}
            {...register("description", {
              required: {
                value: true,
                message: "Vui lòng tải ảnh đại diện cho bài viết",
              },
            })}
          />
          <CKEditor
            style={{ height: "100%" }}
            editor={Editor}
            config={editorConfiguration}
            data=""
            onChange={(event, editor) => {
              const data = editor.getData();
              uploadPosts.current.content = data;
            }}
            onReady={(editor) => {
              editor.plugins.get("FileRepository").createUploadAdapter = (
                loader
              ) => {
                return new uploadImageSever(loader);
              };
            }}
          />
          <div id="test" className="ck-content"></div>
          <Button type="submit" variant="contained">
            Tạo bài viết
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default NewPosts;

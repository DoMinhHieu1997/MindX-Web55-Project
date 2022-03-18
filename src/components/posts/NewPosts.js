import React, { useRef, useState } from "react";
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

function NewPosts() {
  let test = document.getElementById("test");
  const {
    formState: { errors },
    trigger,
    handleSubmit,
    register,
    setError,
    clearErrors,
    setValue,
  } = useForm();

  const uploadPosts = useRef({ featuredPhoto: "", description: "" });
  const [photo, setPhoto] = useState("");

  const onSubmit = async (data) => {
    console.log(data);
    // !data.featuredPhoto
    //   ? setError("featuredPhoto")
    //   : clearErrors("featuredPhoto");
    uploadPosts.current = { ...uploadPosts.current, photo };
    console.log(uploadPosts.current);

    test.innerHTML = uploadPosts.current.content;
  };
  const handlePhoto = (file) => {
    // setPhoto(file);
    // file&&setValue('featuredPhoto',file)
    // const formData = new FormData();
    // formData.append("myFile", file);
    // file&&setValue('featuredPhoto',file)
    // http.post("/upload", formData).then((res) => {
    //   uploadPosts.current = {
    //     ...uploadPosts.current,
    //     featuredPhoto: res.data[res.data.length - 1],
    //   };
    // });
  };
  console.log(errors);

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
            onChangeFile={handlePhoto}
            {...register("featuredPhoto", {
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

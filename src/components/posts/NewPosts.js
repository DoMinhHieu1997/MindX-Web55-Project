import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Paper, TextField, useScrollTrigger } from "@mui/material";
import { useForm } from "react-hook-form";

function NewPosts() {
  const {
    formState: { errors },
    handleSubmit,
    trigger,
    register,
  } = useForm();


console.log(errors);
console.log(ClassicEditor);

  return (
    <div>
      <div style={{width:'70%',height:400}}>
        <h2>Tạo bài viết mới</h2>
        <TextField style={{marginBottom:'10px'}}
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
        <TextField style={{margin:'10px 0'}}
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
        <CKEditor style={{height:'100%'}}
          editor={ClassicEditor}
          data=""
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
    </div>
  );
}

export default NewPosts;

import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { Container, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

// import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize.js';

// import Resize

const editorConfiguration = {
  cloudServices: {
    tokenUrl:
      "https://87781.cke-cs.com/token/dev/5ae153e2ce55fe155b8ae35065d4cbe4f822c813f61cc3abd228aaf764e8?limit=10",
    uploadUrl: "https://87781.cke-cs.com/easyimage/upload/",
  },
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
  plugins: ['EasyImage']
};

function NewPosts() {
  const {
    formState: { errors },

    trigger,
    register,
  } = useForm();
  console.log(errors);
  // console.log(ClassicEditor);

  return (
    <div>
      <Container maxWidth="lg">
        <h2>Tạo bài viết mới</h2>
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
        {/* <CKEditor
          style={{ height: "100%" }}
          editor={ClassicEditor}
          config={{
            // plugins: [Image, 'ImageResize'],
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
                "uploadImage",
                "resizeImage",
                "blockQuote",
                "insertTable",
                "undo",
                "redo",
              ],
            },
            language: "vi",
            cloudServices: {
              tokenUrl:
                "https://87781.cke-cs.com/token/dev/5ae153e2ce55fe155b8ae35065d4cbe4f822c813f61cc3abd228aaf764e8?limit=10",
              uploadUrl: "https://87781.cke-cs.com/easyimage/upload/",
            },
          }}
          data=""
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            // console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            // console.log({ event, editor, data });
            console.log(data);
          }}
          onBlur={(event, editor) => {
            // console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            // console.log("Focus.", editor);
          }}
        /> */}
        <CKEditor
          editor={Editor}
          config={editorConfiguration}
          data="<p>Hello from CKEditor 5!</p>"
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
        <div>
          <div>
            <ul>
              <li>
                <a href="https://vnexpress.net/thoi-su">Thời sự</a>
              </li>
            </ul>
            <p>Chủ nhật, 13/3/2022, 22:28 (GMT+7)</p>
            <h2>
              <strong>
                Chính phủ yêu cầu đơn giản trình tự thống kê ca Covid-19
              </strong>
            </h2>

            <p>
              Việc mở cửa trường học cần kiểm soát và xử lý kịp thời ca nhiễm,
              giữ mức độ an toàn cao nhất cho học sinh, giáo viên.
            </p>
            <p>
              <img
                src="https://i1-vnexpress.vnecdn.net/2022/03/13/256910563-640049030711873-1956-1664-8908-1647183530.jpg?w=680&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=jq_Q6RMrEJ-j2XPKnNy1RA"
                alt="Điểm cách ly F1 tại nhà ở đường Lương Thế Vinh, phường Trung Văn, quận Nam Từ Liêm, Hà Nội, tháng 11/2021. Ảnh: Tất Định"
              />
            </p>
            <p>
              Điểm cách ly F1 tại nhà ở đường Lương Thế Vinh, phường Trung Văn,
              quận Nam Từ Liêm, Hà Nội, tháng 11/2021. Ảnh: <i>Tất Định</i>
            </p>
          </div>
          <div>
            <p>
              22222222222
              <img
                src="https://87781.cdn.cke-cs.com/ClUBFzFbQ45QQQ32q9uA/images/08010e08faad2f79ff31fbb34be3c161229d1deef05bb4f2.png"
                srcset="https://87781.cdn.cke-cs.com/ClUBFzFbQ45QQQ32q9uA/images/08010e08faad2f79ff31fbb34be3c161229d1deef05bb4f2.png/w_114 114w"
                sizes="100vw"
                width="114"
              />
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default NewPosts;

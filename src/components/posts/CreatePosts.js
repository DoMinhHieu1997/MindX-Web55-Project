import React, { useEffect, useRef, useState } from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import FeaturedPhoto from "./FeaturedPhoto";
import { http } from "../profile/config";
import "./posts.css";
import Toggle from "./Toggle";
import { Box } from "@mui/system";
import AddIngredients from "./AddIngredients";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firebaseConfig } from "../profile/config";
import uploadImageFirebase from "./uploadImageFirebase";

function CreatePosts({ onClose, dataEdit }, refChild) {
  const config = {
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "imageUpload",
        "link",
        "bulletedList",
        "numberedList",
        "|",
        // 'outdent',
        // 'indent',
        // '|',
        "blockQuote",
        "insertTable",
        "undo",
        "redo",
        // 	'CKFinder',
        // 	'imageInsert'
      ],
    },
    language: "vi",

    image: {
      toolbar: [
        "imageTextAlternative",
        "imageStyle:inline",
        "imageStyle:block",
        "imageStyle:side",
        "resizeImage:50",
        "resizeImage:75",
        "resizeImage:original",
      ],
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
  };
  const {
    formState: { errors },
    trigger,
    handleSubmit,
    register,
    setValue,
    clearErrors,
  } = useForm();
  const [toggle, setToggle] = useState(true);
  const uploadPosts = useRef({ avatar: "", content: "" });
  const [imgPreview, setImgPreview] = useState(null);
  const [cardItem, setCardItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [dataConten, setDataConten] = useState("");
  const {
    avatar,
    content,
    description,
    ingredients,
    title,
    totalCalories,
    type,
    _id,
    userId,
  } = dataEdit;
  // console.log(dataEdit);

  useEffect(() => {
    type === 1 && setToggle(false);
  }, [type]);
  useEffect(() => {}, []);
  const navigate = useNavigate();
  const firebaseApp = initializeApp(firebaseConfig);
  const storage = getStorage(firebaseApp);

  const handleClick = (toggle) => {
    setToggle(toggle);
    clearErrors();
  };

  const endFetch = (res) => {
    const id = res.data.data._id.toString();
    onClose();
    setLoading(false);
    setLoadingPage(false);
    window.scroll(0, 0);
    navigate(`/chi-tiet/${id}`);
  };
  const onSubmit = (data) => {
    setLoading(true);
    setLoadingPage(true);
    uploadPosts.current = { ...uploadPosts.current, ...data };
    const fetchApi = () => {
      if (dataEdit._id) {
        !data.avatar[0] && (uploadPosts.current.avatar = avatar);
        !data.content &&
          (uploadPosts.current.content = dataConten ? dataConten : content);
        uploadPosts.current._id = _id;
        uploadPosts.current.userId = userId;
        http.patch("posts/update", uploadPosts.current).then((res) => {
          endFetch(res);
        });
      } else {
        http.post("/posts/create", uploadPosts.current).then((res) => {
          endFetch(res);
        });
      }
    };
    if (toggle) {
      uploadPosts.current.type = 2;
      uploadPosts.current.ingredients = [];
      fetchApi();
    } else {
      uploadPosts.current.type = 1;
      uploadPosts.current.ingredients = cardItem;
      fetchApi();
    }
  };
  const handlePhoto = (file) => {
    if (file.name) {
      setLoading(true);
      const date = Date.now();
      const storageRef = ref(storage, `/avatar/${date}${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file, file.type);
      uploadTask.on("state_changed", "", "", () => {
        getDownloadURL(storageRef)
          .then((url) => {
            uploadPosts.current.avatar = url;
            setLoading(false);
            setValue("avatar", url);
          })
          .catch((e) => console.log(e));
      });
    }
  };

  return (
    <Container
      maxWidth="md"
      className="pb-3"
      sx={{
        bgcolor: "white",
        borderRadius: 1.5,
      }}
    >
      <Paper elevation={0}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Toggle toggle={toggle} handleClick={handleClick} />
          <TextField
            className="mt-4"
            sx={{ margin: "10px 0" }}
            error={!!errors.title?.message}
            fullWidth
            size="small"
            value={title}
            label={errors.title?.message || "Tiêu đề"}
            {...register("title", {
              required: {
                value: true,
                message: "Nhập tiêu đề",
              },
              onBlur: () => trigger(),
            })}
          />
          <TextField
            className="mt-3"
            error={!!errors.description?.message}
            fullWidth
            multiline
            value={description}
            label={errors.description?.message || "Mô tả"}
            {...register("description", {
              required: {
                value: true,
                message: "Nhập mô tả",
              },
              onBlur: () => trigger(),
            })}
          />
          <FeaturedPhoto
            imgPreview={avatar || imgPreview}
            setImgPreview={setImgPreview}
            onChangeFile={handlePhoto}
            label={errors.avatar?.message || false}
            ref={refChild}
            {...register("avatar", {
              required: {
                value: !imgPreview && !dataEdit._id,
                message: "Tải ảnh đại diện cho bài viết",
              },
            })}
          />
          {!toggle && (
            <AddIngredients
              label={errors.ingredients?.message || false}
              setCardItem={setCardItem}
              cardItem={ingredients || cardItem}
              {...register("ingredients", {
                required: {
                  value: !cardItem[0] && !dataEdit._id,
                  message: "Nhập thêm nguyên liệu",
                },
              })}
            />
          )}
          {!toggle && (
            <TextField
              sx={{ width: 310 }}
              error={!!errors.totalCalories?.message}
              size="small"
              type="number"
              value={totalCalories}
              label={errors.totalCalories?.message || "Tổng lượng Calo"}
              {...register("totalCalories", {
                required: {
                  value: true,
                  message: "Nhập tổng lượng Calo",
                },
                onBlur: () => trigger(),
              })}
            />
          )}
          <h5 className="mt-4 mb-2 text-secondary">Nội dung bài viết</h5>
          <Box sx={{ height: "100%", p: "10px 0" }}>
            <CKEditor
              config={config}
              editor={Editor}
              onChange={(event, editor) => {
                const data = editor.getData();
                uploadPosts.current.content = data;
                setDataConten(data);
              }}
              data={content}
              required={true}
              onReady={(editor) => {
                editor.plugins.get("FileRepository").createUploadAdapter = (
                  loader
                ) => {
                  // return new uploadImageSever(loader);
                  return new uploadImageFirebase(loader, setLoading);
                };
              }}
            />
          </Box>
          {!uploadPosts.current.content && imgPreview && (
            <p style={{ color: "#dc3545" }}>Vui lòng viết nội dung bài viết</p>
          )}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <LoadingButton
              sx={{ margin: "10px 0" }}
              type="submit"
              variant="contained"
              loading={loading}
            >
              {dataEdit._id ? "Sửa bài viết" : "Tạo bài viết"}
            </LoadingButton>
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={loadingPage}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
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
      </Paper>
    </Container>
  );
}

export default React.forwardRef(CreatePosts);

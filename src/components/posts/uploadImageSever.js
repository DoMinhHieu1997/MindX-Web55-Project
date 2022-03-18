import { http } from "../profile/config";

class uploadImageSever {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("myFile", file);
          http.post("/upload", formData).then((res) => {
            resolve({ default: res.data[res.data.length - 1] });
          });
        })
    );
  }
}

export default uploadImageSever;

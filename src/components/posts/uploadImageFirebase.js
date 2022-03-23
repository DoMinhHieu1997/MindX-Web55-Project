import { http } from "../profile/config";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firebaseConfig } from "../profile/config";
import { initializeApp } from "firebase/app";

class uploadImageFirebase {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const firebaseApp = initializeApp(firebaseConfig);
          const storage = getStorage(firebaseApp);
          //   const formData = new FormData();
          //   formData.append("myFile", file);
          //   http.post("/upload", formData).then((res) => {
          //     resolve({ default: res.data.data[res.data.data.length - 1] });
          //   });

          const date = Date.now();
          const storageRef = ref(storage, `/content/${date}${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file, file.type);
          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (e)=>{},
            () => {
              getDownloadURL(storageRef).then((url) => {
                  console.log(url);
                resolve({ default: url });
              });
            }
          );
        })
    );
  }
}

export default uploadImageFirebase;

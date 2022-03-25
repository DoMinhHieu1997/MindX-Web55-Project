import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firebaseConfig } from "../profile/config";
import { initializeApp } from "firebase/app";

class uploadImageFirebase {
  constructor(loader, setLoading) {
    this.setLoading = setLoading;
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const firebaseApp = initializeApp(firebaseConfig);
          const storage = getStorage(firebaseApp);
          this.setLoading(true);
          const date = Date.now();
          const storageRef = ref(storage, `/content/${date}${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file, file.type);
          uploadTask.on("state_changed",'','',() => {
            getDownloadURL(storageRef).then((url) => {
              this.setLoading(false);
              resolve({ default: url });
            });
          });
        })
    );
  }
}

export default uploadImageFirebase;

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import WarningIcon from "@mui/icons-material/Warning";
import { useState, useEffect, useRef } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { firebaseConfig, http } from "../profile/config";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const MyProfile = ({ userData, setUserData, isLoading, setIsLoading, setViewAva }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editEmail, setEditEmail] = useState("Loading...");
    const [editName, setEditName] = useState("Loading...");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [retypeNewPassword, setRetypeNewPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showRetypePassword, setShowRetypePassword] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState("");
    const [isError, setIsError] = useState("");
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const firebaseApp = initializeApp(firebaseConfig);
    const storage = getStorage(firebaseApp);
    const imageInputRef = useRef();

    useEffect(() => {
        if (userData) {
            setEditEmail(userData.email);
            setEditName(userData.nameDisplay);
        }
    }, [userData]);

    const editEmailHandler = (e) => {
        setEditEmail(e.target.value);
    };
    const editNameHandler = (e) => {
        setEditName(e.target.value);
    };
    const EndEdit = (e) => {
        if (e.key === "Escape") {
            CancelEdit();
        } else if (e.key === "Enter" || e === "Save") {
            if (token) {
                setIsLoading(true);
                handleUploadPhoto()
                    .then((imageUrl) => {
                        return http.patch("user/update", {
                            nameDisplay: editName,
                            email: editEmail,
                            photoUrl: imageUrl,
                        });
                    })
                    .then((res) => {
                        setUserData(res.data.data);
                        setOldPassword("");
                        setNewPassword("");
                        setIsLoading(false);
                    });
            }
        }
    };
    const CancelEdit = () => {
        setIsEditing(false);
        setViewAva(userData.photoUrl);
    };

    const updatePassword = () => {
        if (oldPassword.length<6) {
            setPasswordMessage("Mật khẩu chứa tối thiểu 6 kí tự");
            setIsError("oldPassError");
        } else if (newPassword.length<6) {
            setPasswordMessage("Mật khẩu mới chứa tối thiểu 6 kí tự");
            setIsError("newPassError");
        } else if (newPassword !== retypeNewPassword) {
            setPasswordMessage("Mật khẩu nhập lại không khớp, vui lòng kiểm tra lại");
            setIsError("retypePassError");
        } else if (oldPassword && newPassword && token && newPassword === retypeNewPassword) {
            setPasswordMessage("");
            setIsLoading(true);
            http.patch("auth/changepassword", {
                password: oldPassword,
                passwordNew: newPassword,
            }).then((res) => {
                setUserData(res.data.data);
                setIsLoading(false);
            });
        }
    };

    const handleInputIMG = (e) => {
        const file = e.target.files[0];
        if (file.type === "image/png" || file.type === "image/gif" || file.type === "image/jpeg") {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => setViewAva(reader.result);
            imageInputRef.current = file;
        }
    };

    const handleUploadPhoto = () => {
        return new Promise((resolve) => {
            const file = imageInputRef.current;
            if (file) {
                setIsLoading(true);
                const date = Date.now();
                const storageRef = ref(storage, `/avatar/${date}.jpg`);
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {},
                    (e) => {},
                    () => {
                        getDownloadURL(storageRef).then((url) => {
                            setIsLoading(false);
                            setViewAva(url);
                            resolve(url);
                        });
                    }
                );
            }
        });
    };

    return (
        <div className="my-profile col-md-8 border ml-2">
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12 h2 pb-4 pt-3">Tài khoản của tôi</div>
                    </div>
                    <div className="row">
                        <div className="col-12 pb-2">Ảnh đại diện</div>
                    </div>
                    <div className="row">
                        <div className="col-12 pb-5">
                            <input type="file" onChange={handleInputIMG} disabled={!isEditing} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 pb-2">Email</div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-6 pb-3">
                            {isLoading && (
                                <div className="col-6 mb-4 col-sm-12">
                                    <div className="py-3 skeleton mt-2"></div>
                                </div>
                            )}
                            {!isEditing && !isLoading && editEmail}
                            {isEditing && !isLoading && (
                                <input
                                    autoFocus
                                    type="text"
                                    className="w-100"
                                    value={editEmail}
                                    onChange={editEmailHandler}
                                    onKeyUp={EndEdit}
                                />
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 pb-3">Tên hiển thị</div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-6 pb-5">
                            {isLoading && (
                                <div className="col-6 mb-4 col-sm-12">
                                    <div className="py-3 skeleton mt-2"></div>
                                </div>
                            )}

                            {!isEditing && !isLoading && editName}
                            {isEditing && !isLoading && (
                                <input
                                    autoFocus
                                    type="text"
                                    className="w-100"
                                    value={editName}
                                    onChange={editNameHandler}
                                    onKeyUp={EndEdit}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="row justify-content-end">
                    <div className="col-auto mb-3 ">
                        {!isEditing ? (
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setIsEditing(true);
                                }}
                            >
                                Thay đổi
                            </button>
                        ) : (
                            <>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                        setIsEditing(false);
                                        CancelEdit();
                                    }}
                                >
                                    Hủy
                                </button>
                                <button
                                    className="btn btn-success mr-3"
                                    onClick={() => {
                                        setIsEditing(false);
                                        EndEdit("Save");
                                    }}
                                >
                                    Lưu
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <div className="col-12">
                    <div className="border mx-3 p-3">
                        <div className="row justify-content-end">
                            <div className="col-auto">
                                <CloseOutlinedIcon />
                            </div>
                        </div>
                        <div className="row justify-content-start">
                            <h4 className="col-auto">Thay đổi mật khẩu</h4>
                        </div>
                        <div className="row">
                            <div className="col-12 pb-2">Mật khẩu cũ</div>
                        </div>
                        <div className="row ">
                            <div className="col-6 pb-2">
                                <div className="row">
                                    <div className="col">
                                        <input
                                            type={showOldPassword ? "text" : "password"}
                                            className={
                                                isError === "oldPassError" ? "w-100 border border-danger" : "w-100"
                                            }
                                            onFocus={() => {
                                                setPasswordMessage("");
                                                isError === "oldPassError" && setIsError("")
                                            }}
                                            onChange={(e) => {
                                                setOldPassword(e.target.value);
                                            }}
                                            value={oldPassword}
                                        />
                                    </div>
                                    <div className="col-auto" style={{ marginLeft: "-3.5rem" }}>
                                        {showOldPassword ? (
                                            <VisibilityOff
                                                onClick={() => {
                                                    setShowOldPassword(false);
                                                }}
                                            />
                                        ) : (
                                            <Visibility
                                                onClick={() => {
                                                    setShowOldPassword(true);
                                                }}
                                            />
                                        )}
                                    </div>
                                    {isError === "oldPassError" &&<div className="col-auto text-danger" style={{ marginLeft: "-4.5rem" }}>
                                        <WarningIcon />
                                    </div>}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 pb-2">Mật khẩu mới</div>
                        </div>
                        <div className="row">
                            <div className="col-6 pb-3 ">
                                <div className="row">
                                    <div className="col">
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            className={
                                                isError === "newPassError" ? "w-100 border border-danger" : "w-100"
                                            }
                                            onFocus={() => {
                                                setPasswordMessage("");
                                                isError === "newPassError" && setIsError("")
                                            }}
                                            onChange={(e) => {
                                                setNewPassword(e.target.value);
                                            }}
                                            value={newPassword}
                                        />
                                    </div>
                                    <div className="col-auto" style={{ marginLeft: "-3.5rem" }}>
                                        {showNewPassword ? (
                                            <VisibilityOff
                                                onClick={() => {
                                                    setShowNewPassword(false);
                                                }}
                                            />
                                        ) : (
                                            <Visibility
                                                onClick={() => {
                                                    setShowNewPassword(true);
                                                }}
                                            />
                                        )}
                                    </div>
                                    {isError === "newPassError" && <div className="col-auto text-danger" style={{ marginLeft: "-4.5rem" }}>
                                        <WarningIcon />
                                    </div>}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 pb-2">Nhập lại mật khẩu mới</div>
                        </div>
                        <div className="row">
                            <div className="col-6 pb-3 ">
                                <div className="row">
                                    <div className="col">
                                        <input
                                            type={showRetypePassword ? "text" : "password"}
                                            className={
                                                isError === "retypePassError" ? "w-100 border border-danger" : "w-100"
                                            }
                                            onFocus={() => {
                                                setPasswordMessage("");
                                                isError === "retypePassError" && setIsError("")
                                            }}
                                            onChange={(e) => {
                                                setRetypeNewPassword(e.target.value);
                                            }}
                                            value={retypeNewPassword}
                                        />
                                    </div>
                                    <div className="col-auto" style={{ marginLeft: "-3.5rem" }}>
                                        {showRetypePassword ? (
                                            <VisibilityOff
                                                onClick={() => {
                                                    setShowRetypePassword(false);
                                                }}
                                            />
                                        ) : (
                                            <Visibility
                                                onClick={() => {
                                                    setShowRetypePassword(true);
                                                }}
                                            />
                                        )}
                                    </div>
                                    {isError === "retypePassError" && <div className="col-auto text-danger" style={{ marginLeft: "-4.5rem" }}>
                                        <WarningIcon />
                                    </div>}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 m-3 text-danger">{passwordMessage}</div>
                        </div>
                        <div className="row">
                            <div className="col-3 pb-2">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        updatePassword();
                                    }}
                                >
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MyProfile;

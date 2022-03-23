import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { firebaseConfig, http } from "../profile/config";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const MyProfile = ({ userData, setUserData, isLoading, setIsLoading }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editEmail, setEditEmail] = useState("Loading...");
    const [editName, setEditName] = useState("Loading...");
    const [editAvatar, setEditAvatar] = useState("Loading...");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const firebaseApp = initializeApp(firebaseConfig);
    const storage = getStorage(firebaseApp);
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
                http.patch("user/update", {
                    nameDisplay: editName,
                    email: editEmail,
                    photoUrl: editAvatar,
                }).then((res) => {
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
    };

    const updatePassword = () => {
        if (oldPassword && newPassword && token) {
            setIsLoading(true);
            http.patch("user/update", {
                // oldPassword: oldPassword,
                password: newPassword,
            }).then((res) => {
                setUserData(res.data.data);
                setIsLoading(false);
            });
        }
    };

    const handlePhoto = (file) => {
        if (file) {
            setIsLoading(true);
            const date = Date.now();
            const storageRef = ref(storage, `/avatar/${date}${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file, file.type);
            uploadTask.on(
                "state_changed",
                (snapshot) => {},
                (e) => {},
                () => {
                    getDownloadURL(storageRef).then((url) => {
                        setIsLoading(false);
                        setEditAvatar(url);
                    });
                }
            );
        }
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
                            <input type="file" onChange={handlePhoto} disabled={!isEditing} />
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
                            <div className="col-12 pb-2">Mật khẩu</div>
                        </div>
                        <div className="row ">
                            <div className="col-6 pb-2">
                                <div className="row">
                                    <div className="col">
                                        <input
                                            type={showOldPassword ? "text" : "password"}
                                            className="w-100"
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
                                            className="w-100"
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
                                </div>
                            </div>
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

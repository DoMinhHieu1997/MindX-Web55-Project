import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useState } from "react";
const MyProfile = ({ userData, setUserData, isLoading }) => {
    const [emailEditting, setEmailEditting] = useState(false);
    const [editEmail, setEditEmail] = useState(userData.email);
    const [nameEditting, setNameEditting] = useState(false);
    const [editName, setEditName] = useState(userData.nameDisplay);
    const editEmailHandler = (e) => {
        setEditEmail(e.target.value);
    };
    const editNameHandler = (e) => {
        setEditName(e.target.value);
    };
    const EndEdit = (e) => {
        if (e.key === "Escape") {
            CancelEdit();
        } else {
            console.log(editEmail);
        }
    };
    const CancelEdit = () => {
        setEditEmail(userData.email);
        setEmailEditting(false);
        setEditName(userData.nameDisplay);
        setNameEditting(false);
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
                            <input type="file" />
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
                            {!emailEditting && userData.email}
                            {emailEditting && (
                                <input
                                    autoFocus
                                    type="text"
                                    className="w-100"
                                    value={editEmail}
                                    onChange={editEmailHandler}
                                    onBlur={CancelEdit}
                                    onKeyUp={EndEdit}
                                />
                            )}
                        </div>
                        {!emailEditting && (
                            <div
                                className="col-auto "
                                onClick={() => {
                                    setEmailEditting(!emailEditting);
                                }}
                            >
                                Thay đổi
                            </div>
                        )}
                        {emailEditting && (
                            <div
                                className="col-auto "
                                onClick={() => {
                                    EndEdit();
                                }}
                            >
                                Lưu
                            </div>
                        )}
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

                            {!nameEditting && userData.nameDisplay}
                            {nameEditting && (
                                <input
                                    autoFocus
                                    type="text"
                                    className="w-100"
                                    value={editName}
                                    onChange={editNameHandler}
                                    onBlur={CancelEdit}
                                    onKeyUp={EndEdit}
                                />
                            )}
                        </div>
                        {!nameEditting && (
                            <div
                                className="col-auto"
                                onClick={() => {
                                    setNameEditting(!nameEditting);
                                }}
                            >
                                Thay đổi
                            </div>
                        )}
                        {nameEditting && (
                            <div
                                className="col-auto "
                                onClick={() => {
                                    EndEdit();
                                }}
                            >
                                Lưu
                            </div>
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
                            <h4 className="col-auto">
                                Thay đổi mật khẩu
                            </h4>
                        </div>
                        <div className="row">
                            <div className="col-12 pb-2">Mật khẩu</div>
                        </div>
                        <div className="row ">
                            <div className="col-6 pb-2">
                                <input type="text" className="w-100" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 pb-2">Mật khẩu mới</div>
                        </div>
                        <div className="row">
                            <div className="col-6 pb-3 ">
                                <input type="text" className="w-100" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 pb-2">
                                <button className="btn bg-92AD95 w-100 text-white">Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MyProfile;

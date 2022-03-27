import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useState, useEffect, useContext } from "react";
import SkeletonItem from "../shared/SkeletonItem";
import { Navigate, NavLink, useMatch, useNavigate } from "react-router-dom";
import MyProfile from "./MyProfile";
import SavedPost from "./SavedPost";
import MyPost from "./MyPost";
import AppCtx from "../../appContext";

const Profile = () => {
  const navigate = useNavigate();
  const appCtx = useContext(AppCtx);
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [viewAva, setViewAva] = useState(null);

  const matchThongTin = useMatch("/ho-so/thong-tin");
  const matchPage = useMatch("/ho-so/bai-viet-cua-toi/:page");
  const matchProfile = useMatch("/ho-so/bai-viet-cua-toi");
  const matchBaiVietCuaToi = matchPage || matchProfile;
  const matchBaiVietDaLuu = useMatch("/ho-so/bai-viet-da-luu");

  useEffect(() => {
    document.title='Hồ sơ'
    if (!appCtx.userInfo) {
      setIsLoading(true);
      return;
    }
    setUserData(appCtx.userInfo);
    setIsLoading(false);
    setViewAva(appCtx.userInfo.photoUrl);
  }, [appCtx]);
  const HandlelogOut = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/dang-nhap");
  };

  if (!token) {
    return <Navigate to="/dang-nhap" replace />;
  }
  return (
    <div className="container py-5">
      <div className="position-fixed top-50 end-0"></div>
      <div className="row  gx-3">
        <div className="col-md-4 rounded-2">
          <div className="row">
            <div className="col-12">
              <div className="border px-4 py-4">
                {isLoading && <SkeletonItem type="1" />}
                {userData && !isLoading && (
                  <>
                    <div className="row justify-content-center">
                      <div className="col-10">
                        <div
                          className="ratio ratio-1x1 bg-secondary"
                          style={{
                            backgroundImage: `url(${viewAva})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="row justify-content-center pt-3">
                      <div className="col-auto h3">{userData.nameDisplay}</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="nav nav-pills flex-column border px-4 py-4">
                {isLoading && (
                  <div className="col-6 mb-4 col-sm-12">
                    <div className="py-3 skeleton mt-2"></div>
                    <div className="py-3 skeleton mt-2"></div>
                    <div className="py-3 skeleton mt-2"></div>
                  </div>
                )}
                {userData && !isLoading && (
                  <>
                    <div className="nav-item">
                      <NavLink
                        to="/ho-so/thong-tin"
                        className="nav-link link-secondary m-2"
                      >
                        Tài khoản của tôi
                      </NavLink>
                    </div>
                    <div className="nav-item">
                      <NavLink
                        to="/ho-so/bai-viet-da-luu"
                        className="nav-link link-secondary m-2"
                      >
                        Tin đã lưu (
                        {userData.listBookmark && userData.listBookmark.length})
                      </NavLink>
                    </div>
                    <div className="nav-item">
                      <NavLink
                        to="/ho-so/bai-viet-cua-toi"
                        className="nav-link link-secondary m-2"
                      >
                        Bài viết của tôi
                      </NavLink>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="border px-4 py-4">
                <div className="row">
                  <button
                    className="col-auto btn btn-warning"
                    onClick={HandlelogOut}
                  >
                    Thoát <LogoutOutlinedIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {matchThongTin && (
          <MyProfile
            userData={userData}
            setUserData={setUserData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            appCtx={appCtx}
            setViewAva={setViewAva}
          />
        )}
        
        {matchBaiVietDaLuu && userData && <SavedPost userData={userData} setUserData={setUserData} />}
        {matchBaiVietCuaToi && userData && <MyPost userData={userData} />}
        {/* <Outlet /> */}
      </div>
    </div>
  );
};

export default Profile;

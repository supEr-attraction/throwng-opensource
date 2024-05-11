import Header from "@components/Header";
import LogoutModal from "@components/auth/LogoutModal";
import MyLevel from "@components/myPage/MyLevel";
// import MyPageMenu from "@components/myPage/MyPageMenu";
import MyThrowngHistoryMenu from "@components/myPage/MyThrowngHistoryMenu";
import { logoutModalState } from "@store/auth/atom";
import {
  changeNickNameCouponId,
  levelInfoModal,
  myNickName,
  pageIdx,
} from "@store/myPage/atoms";
import { useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import "@styles/myPage/MyPage.scss";

const MyPage = () => {
  const myName = useRecoilValue(myNickName);
  const logoutModal = useRecoilValue(logoutModalState);
  const resetLogoutModal = useResetRecoilState(logoutModalState);
  const resetChangeNickNameCouponId = useResetRecoilState(
    changeNickNameCouponId
  );
  const resetLevelInfoModal = useResetRecoilState(levelInfoModal);
  const resetPageIdx = useResetRecoilState(pageIdx);

  useEffect(() => {
    resetLogoutModal();
    resetChangeNickNameCouponId();
    resetLevelInfoModal();
    resetPageIdx();
  }, []);

  return (
    <>
      <div className="MyPage">
        <div className="top">
          <Header centerText="마이쓰롱" type="logout" />
          <div className="content">
            <div className="name">{myName}</div>
            <MyLevel />
            {/* <MyPageMenu /> */}
          </div>
        </div>
        <div className="body">
          <MyThrowngHistoryMenu />
        </div>
      </div>
      {logoutModal && <LogoutModal />}
    </>
  );
};

export default MyPage;

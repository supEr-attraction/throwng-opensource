import Header from "@components/Header";
import LogoutModal from "@components/auth/LogoutModal";
import MyLevel from "@components/myPage/MyLevel";
import MyPageMenu from "@components/myPage/MyPageMenu";
import MyThrowngHistoryMenu from "@components/myPage/MyThrowngHistoryMenu";
import { logoutModalState } from "@store/auth/atom";
import { myNickName } from "@store/myPage/atoms";
import "@styles/myPage/MyPage.scss";
import { useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";

const MyPage = () => {
  const myName = useRecoilValue(myNickName);
  const logoutModal = useRecoilValue(logoutModalState);
  const resetLogoutModal = useResetRecoilState(logoutModalState);

  useEffect(() => {
    resetLogoutModal();
  }, []);

  return (
    <>
      <div className="MyPage">
        <Header centerText="마이쓰롱" type="logout" />
        <div className="body">
          <div className="name">{myName}</div>
          <MyLevel />
          <MyPageMenu />
          <MyThrowngHistoryMenu />
        </div>
      </div>
      {logoutModal && <LogoutModal />}
    </>
  );
};

export default MyPage;

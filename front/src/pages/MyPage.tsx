import Header from "@components/Header";
import LogoutModal from "@components/auth/LogoutModal";
import MyLevel from "@components/myPage/MyLevel";
import MyPageMenu from "@components/myPage/MyPageMenu";
import MyThrowngHistoryMenu from "@components/myPage/MyThrowngHistoryMenu";
import { logoutModalState } from "@store/auth/atom";
import {
  levelInfoModal,
  loadingState,
  myLevel,
  myPickHistoryList,
  myThrowHistoryList,
  pageIdx,
  scrollHistoryIndex,
} from "@store/myPage/atoms";
import { useEffect } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import "@styles/myPage/MyPage.scss";
import {
  getMyDropHistory,
  getMyLevel,
  getMyPickHistory,
} from "@services/myPageHistoryApi/MyPageHistoryApi";
import Loading from "@components/Loading";

const MyPage = () => {
  const logoutModal = useRecoilValue(logoutModalState);
  const resetLogoutModal = useResetRecoilState(logoutModalState);
  const resetLevelInfoModal = useResetRecoilState(levelInfoModal);
  const resetPageIdx = useResetRecoilState(pageIdx);
  const [myLevelValue, setMyLevelValue] = useRecoilState(myLevel);
  const setThrownHistoryList = useSetRecoilState(myThrowHistoryList);
  const setPickHistoryList = useSetRecoilState(myPickHistoryList);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  const scrollHistoryIndexValue = useRecoilValue(scrollHistoryIndex);

  useEffect(() => {
    setIsLoading(true);
    loadData();
    resetLogoutModal();
    resetLevelInfoModal();
  }, []);

  const loadData = async () => {
    try {
      if (scrollHistoryIndexValue === "") {
        await apiGetMyLevel();
        await apiGetMyPickHistory();
        await apiGetMyThrowngHistory();
        resetPageIdx();
      }
    } catch (error) {
      throw new Error("MyPage-loadData");
    }
    setIsLoading(false);
  };

  const apiGetMyLevel = async () => {
    try {
      const data = await getMyLevel();
      setMyLevelValue(data);
    } catch (error) {
      throw new Error("MyPage-apiGetMyLevel");
    }
  };

  const apiGetMyPickHistory = async () => {
    try {
      const pickData = await getMyPickHistory();
      setPickHistoryList(pickData);
    } catch (error) {
      throw new Error("MyPage-apiGetMyPickHistory");
    }
  };

  const apiGetMyThrowngHistory = async () => {
    try {
      const thownData = await getMyDropHistory();
      setThrownHistoryList(thownData);
    } catch (error) {
      throw new Error("MyPage-apiGetMyThrowngHistory");
    }
  };

  return (
    <div className="MyPage">
      <div className="top">
        <Header centerText="마이쓰롱" type="logout" />
      </div>
      <div className="bottom">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="content">
              <div className="name">{myLevelValue.nickName}</div>
              <MyLevel />
              <MyPageMenu />
            </div>
            <div className="body">
              <MyThrowngHistoryMenu />
            </div>
          </>
        )}
      </div>
      {logoutModal && <LogoutModal />}
    </div>
  );
};

export default MyPage;

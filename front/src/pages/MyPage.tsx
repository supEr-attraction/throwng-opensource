import Header from "@components/Header";
import MyLevel from "@components/myPage/MyLevel";
import MyPageMenu from "@components/myPage/MyPageMenu";
import MyThrowngHistoryMenu from "@components/myPage/MyThrowngHistoryMenu";
import { myNickName } from "@store/myPage/atoms";
import "@styles/myPage/MyPage.scss"
import { useRecoilValue } from "recoil";

const MyPage = () => {
  const myName = useRecoilValue(myNickName)

  return (
    <div className="MyPage">
      <Header centerText="My쓰롱" />
      <div className="body">
        <div className="name">{myName}</div>
        <MyLevel/>
        <MyPageMenu/>
        <MyThrowngHistoryMenu/>
      </div>
    </div>
  );
};

export default MyPage; 
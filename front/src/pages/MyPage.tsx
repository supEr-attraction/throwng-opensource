import Header from "@components/Header";
import MyLevel from "@components/myPage/MyLevel";
import MyPageMenu from "@components/myPage/MyPageMenu";
import MyThrowngHistoryMenu from "@components/myPage/MyThrowngHistoryMenu";
import "@styles/myPage/MyPage.scss"

const MyPage = () => {
  return (
    <div className="MyPage">
      <Header centerText="My쓰롱" />
      <div className="body">
        <div className="name">타이거즈~소크라테스🐅</div>
        <MyLevel/>
        <MyPageMenu/>
        <MyThrowngHistoryMenu/>
      </div>
    </div>
  );
};

export default MyPage; 
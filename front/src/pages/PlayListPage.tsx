import Header from "@components/Header";
// import Navbar from "@components/Navbar";
import PlayListBody from "@components/playList/PlayListBody";
import "@styles/playList/PlayListPage.scss";

const PlayListPage = () => {
  return (
    <div className="PlayListPage">
      <Header centerText="플레이리스트" />
      <div className="body none-scroll">
        <PlayListBody />
      </div>
      {/* <Navbar /> */}
    </div>
  );
};

export default PlayListPage;

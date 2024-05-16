import GameMainPage from "@/components/content/GameMainPage";
import rhythm from "@/assets/images/rhythm.webp";

const RhythmMainPage = () => {
  return (
    <GameMainPage
      imageSrc={rhythm}
      altText="RhythmLogo"
      mainText={`리듬-쓰롱을 통해서 <br /> 당신의 리듬감을 테스트 해보세요!`}
      infoRoute="/rhythm/info"
    />
  );
};

export default RhythmMainPage;

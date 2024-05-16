import GameMainPage from "@components/content/ContentMainPage";
import memory from "@/assets/images/memory.webp";

const MemoryMainPage = () => {
  return (
    <GameMainPage
      imageSrc={memory}
      altText="MemoryLogo"
      mainText={`도전 하지마세요 <br /> 당신의 하루가 날아갈 수 있습니다.`}
      infoRoute="/memory/info"
    />
  );
};

export default MemoryMainPage;

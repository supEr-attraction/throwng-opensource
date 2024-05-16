import ContentInfo from '@/components/content/ContentInfo';

const MemoryInfo = () => {
  const items = [
    { id: 1, text: <>총 <span className="highlight">20라운드</span>입니다.</>, checked: false },
    { id: 2, text: <><span className="highlight">2개 이상 틀리면</span> 라운드가<br />종료됩니다.</>, checked: false },
    { id: 3, text: <>쿠폰을 얻을 때 까지<span className="highlight"> 재도전</span> 가능합니다</>, checked: false },
    { id: 4, text: <>매일 쿠폰 발급은<span className="highlight"> 한 번</span>입니다.</>, checked: false }
  ];

  return <ContentInfo items={items} nextPath="/memory/game" buttonText="게임 시작" />;
};

export default MemoryInfo;
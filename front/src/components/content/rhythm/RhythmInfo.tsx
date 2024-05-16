import ContentInfo from '@/components/content/ContentInfo';

const RhythmInfo = () => {
  const items = [
    { id: 1, text: <>플레이 타임은 <span className="highlight">2분</span> 입니다.</>, checked: false },
    { id: 2, text: <><span className="highlight">1200점 이상</span> 점수를 얻어야 <br />성공입니다.</>, checked: false },
    { id: 3, text: <>가수의 <span className="highlight">하이라이트 메들리</span>가<br />매일 바뀝니다</>, checked: false },
    { id: 4, text: <>쿠폰을 얻을 때 까지<span className="highlight"> 재도전</span> 가능합니다</>, checked: false },
    { id: 5, text: <>매일 쿠폰 발급은<span className="highlight"> 한 번</span>입니다.</>, checked: false }
  ];

  return <ContentInfo items={items} nextPath="/rhythm/game" buttonText="게임 시작" />;
};

export default RhythmInfo;
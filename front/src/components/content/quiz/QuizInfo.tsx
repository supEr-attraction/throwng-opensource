import ContentInfo from '@/components/content/ContentInfo';

const QuizInfo = () => {
  const items = [
    { id: 1, text: <><span className="highlight">총 3문제</span>입니다.</>, checked: false },
    { id: 2, text: <><span className="highlight">객관식, 주관식, OX</span> 문제가<br />주어집니다.</>, checked: false },
    { id: 3, text: <>3문제 <span className="highlight">모두 맞춰야</span> 정답으로 인정됩니다.</>, checked: false },
    { id: 4, text: <>쿠폰을 얻을 때 까지<br /><span className="highlight">재도전</span> 가능합니다</>, checked: false },
    { id: 5, text: <>매일 쿠폰 발급은<span className="highlight"><br /> 한 번</span>입니다.</>, checked: false }
  ];

  return <ContentInfo items={items} nextPath="/quiz/count" buttonText="퀴즈 풀기" />;
};

export default QuizInfo;
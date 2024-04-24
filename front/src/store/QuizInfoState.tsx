import { atom } from "recoil";

export const quizInfoState = atom({
  key: 'quizInfoState',
  default: [
    { id: 1, text: <>문제는 <span className="highlight">총 3문제</span>입니다.</>, checked: false },
    { id: 2, text: <><span className="highlight">객관식, 주관식, OX</span> 문제로 주관식은 공백, 영어, 한글 모두 정답으로 인정됩니다.</>, checked: false },
    { id: 3, text: <>문제당 제한 시간은 <span className="highlight">10초</span>입니다.</>, checked: false },
    { id: 4, text: <>3문제 <span className="highlight">모두 맞춰야</span> 정답으로 인정됩니다.</>, checked: false },
    { id: 5, text: <>매일 <span className="highlight">기회는 한 번</span>뿐이니 신중하게 풀어주세요.</>, checked: false },
  ],
})
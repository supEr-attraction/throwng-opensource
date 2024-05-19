import { useRef, useEffect, useState } from "react";
import lottie, { AnimationItem } from "lottie-web";
import QuizAnimation from "@assets/lottie/quiz.json";
import "@styles/lottie/QuizMainLottie.scss";
import { AnimationData } from "../../types/lottieType";

const QuizMainLottie = () => {
  const animationContainer = useRef<HTMLDivElement>(null);
  const [animationData, setAnimationData] = useState<AnimationData>();

  useEffect(() => {
    setAnimationData(QuizAnimation);
  }, []);

  useEffect(() => {
    let anim: AnimationItem | null = null;

    if (animationContainer.current && animationData) {
      anim = lottie.loadAnimation({
        container: animationContainer.current,
        animationData: animationData,
        loop: true,
        autoplay: true,
      });
    }

    return () => {
      if (anim) {
        anim.destroy();
      }
    };
  }, [animationData]);

  return (
    <div className="quiz-main-lottie">
      <div className="quiz-main-container" ref={animationContainer}></div>
    </div>
  );
};

export default QuizMainLottie;

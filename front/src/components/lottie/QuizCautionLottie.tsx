import { useRef, useEffect, useState } from "react";
import lottie, { AnimationItem } from "lottie-web";
import QuizAnimation from "@assets/lottie/caution.json";
import "@styles/lottie/QuizCautionLottie.scss"

interface AnimationData {
  v: string;  
  fr: number; 
  ip: number; 
  op: number; 
  w: number;  
  h: number;  
  nm: string; 
  layers: Array<any>; 
}


const QuizCautionLottie = () => {
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
    <div className="quiz-caution-lottie">
      <div className="quiz-caution-container" ref={animationContainer}></div>
    </div>
  );
};

export default QuizCautionLottie;

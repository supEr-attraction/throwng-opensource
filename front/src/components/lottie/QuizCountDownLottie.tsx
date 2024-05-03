import { useRef, useEffect, useState } from "react";
import lottie, { AnimationItem } from "lottie-web";
import QuizAnimation from "@assets/lottie/count.json";
import "@styles/lottie/QuizCountDownLottie.scss"

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


const QuizCountDownLottie = () => {
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
    <div className="quiz-count-lottie">
      <div className="quiz-count-container" ref={animationContainer}></div>
    </div>
  );
};

export default QuizCountDownLottie;

import { useRef, useEffect, useState } from "react";
import lottie, { AnimationItem } from "lottie-web";
import Animation from "@assets/lottie/notFound.json";
import "@styles/Error404.scss";
import MusicDropBtn from "@components/musicDrop/MusicDropBtn";
import { useNavigate } from "react-router-dom";

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

const Error404 = () => {
  const animationContainer = useRef<HTMLDivElement>(null);
  const [animationData, setAnimationData] = useState<AnimationData>();
  const navigate = useNavigate();

  useEffect(() => {
    setAnimationData(Animation);
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

      anim.setSpeed(1.5);
    }

    return () => {
      if (anim) {
        anim.destroy();
      }
    };
  }, [animationData]);

  return (
    <div className="Error404">
      <div className="quiz-main-container" ref={animationContainer}></div>
      <MusicDropBtn btnText="홈으로" onClick={() => navigate("/")} />
    </div>
  );
};

export default Error404;

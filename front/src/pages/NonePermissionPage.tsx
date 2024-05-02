import { useRef, useEffect, useState } from "react";
import lottie, { AnimationItem } from "lottie-web";
import Animation from "@assets/lottie/locationPermission.json";
import "@styles/NonePermissionPage.scss";

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

const NonePermissionPage = () => {
  const animationContainer = useRef<HTMLDivElement>(null);
  const [animationData, setAnimationData] = useState<AnimationData>();

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
    }

    return () => {
      if (anim) {
        anim.destroy();
      }
    };
  }, [animationData]);

  return (
    <div className="NonePermissionPage">
      <div className="title">위치 정보를 허용해 주세요.</div>
      <div className="quiz-main-container" ref={animationContainer}></div>
    </div>
  );
};

export default NonePermissionPage;

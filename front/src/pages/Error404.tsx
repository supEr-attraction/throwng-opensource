import { useRef, useEffect, useState } from "react";
import lottie, { AnimationItem } from "lottie-web";
import Animation from "@assets/lottie/notFound.json";
import MusicDropBtn from "@components/musicDrop/MusicDropBtn";
import { useNavigate, useRouteError } from "react-router-dom";
import { AnimationData } from "../types/lottieType";
import "@styles/Error404.scss";

const Error404 = () => {
  const animationContainer = useRef<HTMLDivElement>(null);
  const [animationData, setAnimationData] = useState<AnimationData>();
  const [isLoad, setIsLoad] = useState(false);
  const error: any = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      error instanceof TypeError &&
      error.message.includes("Failed to fetch dynamically imported module")
    ) {
      window.location.reload();
    } else {
      setIsLoad((prev) => !prev);
      setAnimationData(Animation);
    }
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
      {isLoad && (
        <>
          <div className="quiz-main-container" ref={animationContainer}></div>
          <MusicDropBtn
            btnText="홈으로"
            onClick={() => navigate("/", { replace: true })}
          />
        </>
      )}
    </div>
  );
};

export default Error404;

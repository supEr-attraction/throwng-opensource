import { useState, useEffect } from "react";
import "@styles/myPage/MyLevel.scss";
import { getMyLevel } from "@services/myPageHistoryApi/MyPageHistoryApi";
import { useRecoilState, useSetRecoilState } from "recoil";
import { levelInfoModal, myNickName } from "@store/myPage/atoms";
import { IoMdInformationCircleOutline } from "react-icons/io";
import LevelInfoModal from "./LevelInfoModal";

const MyLevel = () => {
  const [level, setLevel] = useState(0);
  const [experiencePoint, setExperiencePoint] = useState(0);
  const [isBlock, setIsBlock] = useState("NONE");
  const setMyNickName = useSetRecoilState(myNickName);
  const [infoModal, setInfoModal] = useRecoilState(levelInfoModal)

  useEffect(() => {
    apiGetMyLevel();
  }, []);

  const apiGetMyLevel = async () => {
    const data = await getMyLevel();
    setLevel(data.level);
    setExperiencePoint(data.experiencePoint);
    setIsBlock(data.isBlock);
    setMyNickName(data.nickName);
  };

  const getLevelBarColor = (level: number) => {
    switch (level) {
      case 1:
        return "linear-gradient(to right, #D2FFE4, #34DB77)";
      case 2:
        return "linear-gradient(to right, #DEFFFB, var(--level-platinum))";
      case 3:
        return "linear-gradient(to right, #DAD4FF, var(--main-color))";
      case 4:
          return "linear-gradient(to right, #FFFEDC, var(--level-gold))";
      default:
        return "linear-gradient(to right, #D2FFE4, #34DB77)";
    }
  };

  const getLevelDiv = (level: number) => {
    switch (level) {
      case 1:
        return "#34DB77";
      case 2:
        return "var(--level-platinum)";
      case 3:
        return "var(--main-color)";
      case 4:
        return "var(--level-gold)";
      default:
        return "#0F1114";
    }
  };

  const getProductName = (level: number) => {
    switch (level) {
      case 1:
        return "이어폰";
      case 2:
        return "버즈";
      case 3:
        return "버즈프로";
      case 4:
        return '갤럭시';
      default:
        return "이어폰";
    }
  };

  const calculateWidth = () => {
    let total;
    let current = experiencePoint;

    if (level === 1) {
        total = 100;
    } else if (level === 2) {
        total = 400;
    } else if (level === 3) {
        total = 1000;
    } else {
        total = 1000;
    }
    return Math.ceil((current / total) * 100);
  };

  const openInfoModal = () => {
    setInfoModal(!infoModal)
  }

  return (
    <div className="MyLevel">
      {isBlock !== "NONE" ? (
        <div className="block-message">
          <p>7일 동안 음악 두기 기능이 정지됩니다.</p>
        </div>
      ) : (
        <div className="level-div">
          <div className="level-info">
            <div
              className="level-color"
              style={{
                color: getLevelDiv(level),
                border: `2px solid ${getLevelDiv(level)}`,
              }}
            >
              Lv.{level} {getProductName(level)}
            </div>
            <div className="drop-pick">
              {calculateWidth()}%
              <IoMdInformationCircleOutline onClick={openInfoModal} />
            </div>
          </div>
          <div className="level-bar">
            <div
              className="level-bar-fill"
              style={{
                width: `${calculateWidth()}%`,
                background: getLevelBarColor(level),
              }}
            ></div>
          </div>
          {infoModal && <LevelInfoModal/>}
        </div>
      )}
    </div>
  );
};

export default MyLevel;
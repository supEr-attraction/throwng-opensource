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
  const [infoModal, setInfoModal] = useRecoilState(levelInfoModal);

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
        return "linear-gradient(to right, #D3C1B4, var(--level-one))";
      case 2:
        return "linear-gradient(to right, #DAD4FF, var(--level-two))";
      case 3:
        return "linear-gradient(to right, #FFE8BC, var(--level-three))";
      case 4:
        return "linear-gradient(to right, #F6F049, var(--level-four))";
      case 5:
        return "linear-gradient(to right, #C7FBFA, var(--level-five))";
      case 6:
        return "linear-gradient(to right, #DEFFFB, var(--level-six))";
      case 7:
        return "linear-gradient(to right, #D2EDFF, var(--level-seven))";
      case 8:
        return "linear-gradient(to right, #FFC8CC, var(--level-eight))";
      default:
        return "linear-gradient(to right, #D3C1B4, var(--level-one))";
    }
  };

  const getLevelDiv = (level: number) => {
    switch (level) {
      case 1:
        return "var(--level-one)";
      case 2:
        return "var(--level-two)";
      case 3:
        return "var(--level-three)";
      case 4:
        return "var(--level-four)";
      case 5:
        return "var(--level-five)";
      case 6:
        return "var(--level-six)";
      case 7:
        return "var(--level-seven)";
      case 8:
        return "var(--level-eight)";
      default:
        return "var(--level-one)";
    }
  };

  const getProductName = (level: number) => {
    switch (level) {
      case 1:
        return "EARPHONE";
      case 2:
        return "BUDS_FE";
      case 3:
        return "BUDS";
      case 4:
        return "BUDS_PLUS";
      case 5:
        return "BUDS_PRO";
      case 6:
        return "LP";
      case 7:
        return "SPEAKER";
      case 8:
        return "GALAXY";
      default:
        return "EARPHONE";
    }
  };

  const openInfoModal = () => {
    setInfoModal(!infoModal);
  };

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
              <div>{experiencePoint}%</div>
              <IoMdInformationCircleOutline
                style={{ color: getLevelDiv(level) }}
                onClick={openInfoModal}
              />
            </div>
          </div>
          <div className="level-bar">
            <div
              className="level-bar-fill"
              style={{
                width: `${experiencePoint}%`,
                background: getLevelBarColor(level),
              }}
            ></div>
          </div>
          {infoModal && <LevelInfoModal />}
        </div>
      )}
    </div>
  );
};

export default MyLevel;

import "@styles/myPage/MyLevel.scss";
import { useRecoilState, useRecoilValue } from "recoil";
import { levelInfoModal, myLevel } from "@store/myPage/atoms";
import { IoMdInformationCircleOutline } from "react-icons/io";
import LevelInfoModal from "./LevelInfoModal";

const MyLevel = () => {
  const [infoModal, setInfoModal] = useRecoilState(levelInfoModal);
  const myLevelValue = useRecoilValue(myLevel);

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
      {myLevelValue.isBlock !== "NONE" ? (
        <div className="block-message">
          <p>7일 동안 음악 두기 기능이 정지됩니다.</p>
        </div>
      ) : (
        <div className="level-div">
          <div className="level-info">
            <div
              className="level-color"
              style={{
                color: getLevelDiv(myLevelValue.level),
                border: `2px solid ${getLevelDiv(myLevelValue.level)}`,
              }}
            >
              Lv.{myLevelValue.level} {getProductName(myLevelValue.level)}
            </div>
            <div className="drop-pick">
              <div>{myLevelValue.experiencePoint}%</div>
              <IoMdInformationCircleOutline
                style={{ color: getLevelDiv(myLevelValue.level) }}
                onClick={openInfoModal}
              />
            </div>
          </div>
          <div className="level-bar">
            <div
              className="level-bar-fill"
              style={{
                width: `${myLevelValue.experiencePoint}%`,
                background: getLevelBarColor(myLevelValue.level),
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

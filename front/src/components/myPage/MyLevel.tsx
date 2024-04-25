import { useState, useEffect } from "react";
import "@styles/myPage/MyLevel.scss";

const  MyLevel = () => {
  const [level, setLevel] = useState(1);
  const [drop, setDrop] = useState(7);
  const [pick, setPick] = useState(8);
  // const [isBlock, setIsBlock] = useState(false);
  const [isBlock, setIsBlock] = useState('7일 정지');

  useEffect(() => {
    // API 호출 후 setStat에 내 능력치 할당하기
  },[]);

  const getLevelBarColor = (level:number) => {
    switch (level) {
      case 2:
        return 'linear-gradient(to right, #ffffff, var(--level-platinum))';
      case 3:
        return 'linear-gradient(to right, #ffffff, var(--main-color))';
      default:
        return 'linear-gradient(to right, #ffffff, var(--level-gold))';
    }
  };

  const getLevelDiv = (level:number) => {
    switch (level) {
      case 2:
        return 'var(--level-platinum)';
      case 3:
        return 'var(--main-color)';
      default:
        return 'var(--level-gold)';
    }
  };

  const getProductName = (level:number) => {
    switch (level) {
      case 1:
        return '이어폰';
      case 2:
        return '버즈';
      case 3:
        return '버즈프로';
      default:
        return '이어폰';
    }
  };

  const calculateWidth = () => {
    let total;
    let current;
  
    if (level === 1) {
      total = 20;
      current = drop;
    } else {
      total = 100;
      current = drop + pick;
    }
  
    return (current / total) * 100;
  };
  
  return (
    <div className="MyLevel">
      {isBlock ? (
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
            <div className="drop-pick">두기 : {drop}
              {level === 1 && (<span>/20</span>)}
              {level === 2 && (<span>/100</span>)}
              {level === 3 && (<span>/100</span>)}
            </div>
            {level !== 1 && (
              <div className="drop-pick">줍기 : {pick}
                {level === 2 && (<span>/100</span>)}
                {level === 3 && (<span>/100</span>)}
              </div>
            )}
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
        </div>
      )}
    </div>
  );
};

export default MyLevel;
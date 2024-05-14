import { useSetRecoilState } from "recoil";
import "@styles/myPage/LevelInfoModal.scss";
import { useEffect } from "react";
import { levelInfoModal } from "@store/myPage/atoms";

const LevelInfoModal = () => {
  const setInfoModal = useSetRecoilState(levelInfoModal);

  const handleCloseModal = () => {
    setInfoModal(false);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="LevelInfoModal">
      <div className="background" onClick={handleCloseModal} />
      <div className="container">
        <div className="header">
          <div className="title">쓰롱을 재밌게 즐기려면?</div>

          <div className="content">
            <div className="item">
              <div>쓰롱을 하면?</div>
              <div>+3 😍</div>
            </div>

            <div className="item">
              <div>컨텐츠에 참여하면?</div>
              <div>+2 🤩</div>

            </div>

            <div className="item">
              <div>음악을 주우면?</div>
              <div>+1 😝</div>
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LevelInfoModal;

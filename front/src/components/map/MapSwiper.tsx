import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { activeMarkerState } from "@store/map/atoms";
import { initialSlideState, markerRadiusState } from "@store/map/selectors";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "@styles/map/MapSwiper.scss";

const MapSwiper = () => {
  const markerRadius = useRecoilValue(markerRadiusState);
  const initialSlide = useRecoilValue(initialSlideState);
  const setActiveMarkerId = useSetRecoilState(activeMarkerState);
  const navigate = useNavigate();

  return (
    <div className="MapSwiper">
      <div className="black-bottom-gradient"></div>
      <div
        className="close"
        onClick={() => {
          setActiveMarkerId(null);
        }}
      />
      <Swiper
        initialSlide={initialSlide}
        slidesPerView={3}
        centeredSlides={true}
        grabCursor={true}
        // spaceBetween={30}
        onSlideChange={(e) => {
          setActiveMarkerId(markerRadius[e.activeIndex].itemId);
        }}
        slideToClickedSlide={true}
        className="mySwiper"
      >
        {markerRadius.map((marker) => {
          return (
            <SwiperSlide
              key={marker.itemId}
              onClick={() => {
                navigate(`/music/pick/${marker.itemId}`);
              }}
            >
              <img src={marker.albumImage} loading="lazy" />
              <div className="content">
                <div className="title">{marker.songTitle}</div>
                <div className="singer">{marker.artistName}</div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default memo(MapSwiper);

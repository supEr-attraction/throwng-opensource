import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  radiusActiveIdState,
  couponUsageActiveIdState,
} from "@store/map/atoms";
import {
  initialSlideState,
  insideRadiusMarkerState,
  outsideRadiusMarkerState,
} from "@store/map/selectors";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "@styles/map/MapSwiper.scss";
import SwiperItem from "./SwiperItem";

const MapSwiper = () => {
  const insideRadiusMarker = useRecoilValue(insideRadiusMarkerState);
  const outsideRadiusMarker = useRecoilValue(outsideRadiusMarkerState);
  const initialSlide = useRecoilValue(initialSlideState);
  const setCouponUsageActiveId = useSetRecoilState(couponUsageActiveIdState);
  const setRadiusActiveId = useSetRecoilState(radiusActiveIdState);
  const navigate = useNavigate();

  const initialize = useCallback(() => {
    if (initialSlide !== -1) {
      setRadiusActiveId(null);
    } else {
      setCouponUsageActiveId(null);
    }
  }, []);

  return (
    <div className="MapSwiper">
      <div className="black-bottom-gradient"></div>
      <div className="close" onClick={initialize} />
      <Swiper
        initialSlide={initialSlide !== -1 ? initialSlide : 0}
        slidesPerView={3}
        centeredSlides={true}
        grabCursor={true}
        onSlideChange={(e) => {
          setRadiusActiveId(insideRadiusMarker[e.activeIndex].itemId);
        }}
        slideToClickedSlide={true}
        className="mySwiper"
      >
        {initialSlide !== -1
          ? insideRadiusMarker.map((marker) => {
              return (
                <SwiperSlide
                  key={marker.itemId}
                  onClick={() => {
                    navigate(`/music/pick/${marker.itemId}`);
                  }}
                >
                  <SwiperItem marker={marker} />
                </SwiperSlide>
              );
            })
          : outsideRadiusMarker.map((marker) => {
              return (
                <SwiperSlide
                  key={marker.itemId}
                  onClick={() => {
                    navigate(`/music/pick/${marker.itemId}`);
                  }}
                >
                  <SwiperItem marker={marker} />
                </SwiperSlide>
              );
            })}
      </Swiper>
    </div>
  );
};

export default memo(MapSwiper);

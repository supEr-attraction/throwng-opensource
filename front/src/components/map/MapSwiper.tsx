// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeMarkerState } from "@store/map/atoms";
import { markerRadiusState } from "@store/map/selectors";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "@styles/map/MapSwiper.scss";

const MapSwiper = () => {
  const markerRadius = useRecoilValue(markerRadiusState);
  const [activeMarkerId, setActiveMarkerId] = useRecoilState(activeMarkerState);

  return (
    <div className="MapSwiper">
      <div className="close" onClick={() => setActiveMarkerId(null)} />
      <Swiper
        initialSlide={markerRadius.findIndex(
          (marker) => marker.id === activeMarkerId
        )}
        modules={[EffectCoverflow]}
        effect={"coverflow"}
        slidesPerView={3}
        centeredSlides={true}
        grabCursor={true}
        // spaceBetween={30}
        onSlideChange={(e) => {
          console.log(e.activeIndex);
          console.log(markerRadius[e.activeIndex].id);
          setActiveMarkerId(markerRadius[e.activeIndex].id);
        }}
        slideToClickedSlide={true}
        coverflowEffect={{
          rotate: 0,
          depth: 0,
          slideShadows: false,
        }}
        className="mySwiper"
      >
        {markerRadius.map((marker) => {
          return (
            <SwiperSlide key={marker.id}>
              <img src={marker.music.img} />
              <div className="content">
                <div className="title">{marker.music.title}</div>
                <div className="singer">{marker.music.singer}</div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="ggg"></div>
    </div>
  );
};

export default MapSwiper;

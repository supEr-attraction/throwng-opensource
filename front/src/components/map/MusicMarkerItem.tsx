import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { MarkerF } from "@react-google-maps/api";
// import whitePin from "@assets/images/whitePin.webp";
// import purplePin from "@assets/images/purplePin.webp";
import { activeMarkerState, locationState } from "@store/map/atoms";
import { toastMsg } from "@/utils/toastMsg";
import { Marker, MarkerPosition } from "../../types/mapType";
import getDistance from "@/utils/map/fetchDistance";
import convertToDataUR from "@/utils/map/convertToDataURL";
import convertToSvg from "@/utils/map/convertToSvg";

interface Props {
  marker: Marker;
  clusterer?: any;
}

const MusicMarkerItem = ({ marker, clusterer }: Props) => {
  const [activeMarkerId, setActiveMarkerId] = useRecoilState(activeMarkerState);
  const location = useRecoilValue(locationState);
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    const aaa = async () => {
      const data = await convertToDataUR(marker.albumImage);
      setImgUrl(data as string);
    };

    aaa();
  }, []);

  const outsideCircleClick = () => {
    toastMsg("반경 밖 음악을 듣고 싶다면 위치를 이동해 보세요!");
    setActiveMarkerId(null);
  };

  const getOnClickFunction = (marker: MarkerPosition) => {
    const distance = getDistance(marker.position, location);

    return distance <= 600
      ? setActiveMarkerId(marker.id) // handleMarkerClick(marker.id)
      : outsideCircleClick();
  };

  const customIcon = {
    url: convertToSvg(activeMarkerId, marker, imgUrl),
    scaledSize: new window.google.maps.Size(35, 35), // 아이콘 크기 조절
    anchor: new window.google.maps.Point(16, 16), // 아이콘의 앵커 포인트
  };

  return (
    <MarkerF
      position={{ lat: marker.latitude, lng: marker.longitude }}
      icon={customIcon}
      clusterer={clusterer}
      zIndex={1}
      onClick={() => {
        getOnClickFunction({
          id: marker.itemId,
          position: { lat: marker.latitude, lng: marker.longitude },
        });
      }}
    ></MarkerF>
    // <OverlayViewF
    //   key={marker.itemId}
    //   position={{ lat: marker.latitude, lng: marker.longitude }}
    //   mapPaneName="overlayMouseTarget"
    //   getPixelPositionOffset={(width, height) => ({
    //     x: -width / 2,
    //     y: -height / 1.2,
    //   })}
    // >
    //   <div
    //     onClick={() => {
    //       getOnClickFunction({
    //         id: marker.itemId,
    //         position: { lat: marker.latitude, lng: marker.longitude },
    //       });
    //     }}
    //   >
    //     <img
    //       src={marker.itemId === activeMarkerId ? purplePin : whitePin}
    //       alt="Custom Overlay"
    //       style={{ width: "30px", height: "35px" }}
    //     />
    //     <div className="cover-img">
    //       <img src={marker.albumImage} alt="Custom Overlay" />
    //     </div>
    //   </div>
    // </OverlayViewF>
  );
};

export default MusicMarkerItem;

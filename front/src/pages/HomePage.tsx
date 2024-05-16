import { useEffect } from "react";
import { LoadScriptNext } from "@react-google-maps/api";
import { GOOGLE_MAPS_LIBRARIES } from "@constants/map";
import { requestPermission } from "@/notificaiton/firebase-messaging-sw";
import Map from "@components/map/Map";

const HomePage = () => {
  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <LoadScriptNext
      id="google-map-script"
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API}
      language="ko"
      libraries={GOOGLE_MAPS_LIBRARIES}
      loadingElement={<></>}
      onError={(e) => console.error("Error loading Google Maps", e)}
    >
      <Map />
    </LoadScriptNext>
  );
};

export default HomePage;

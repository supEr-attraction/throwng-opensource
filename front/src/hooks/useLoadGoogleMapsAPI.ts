// import { useJsApiLoader } from "@react-google-maps/api";
// import { mapApiState } from "@store/map/atoms";
// import { useEffect } from "react";
// import { useRecoilState } from "recoil";

// const useLoadGoogleMapsAPI = () => {
//   const [apiState, setApiState] = useRecoilState(mapApiState);
//   const { isLoaded, loadError } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: "AIzaSyB6-Xpzz_O5OWj5KOavve7YKqn2ii_4uoQ",
//     language: "ko",
//     libraries: ["places", "geometry"],
//   });

//   useEffect(() => {
//     if (!apiState.isLoaded && isLoaded) {
//       setApiState({
//         isLoaded,
//         loadError,
//       });
//     }
//   }, [isLoaded, loadError, apiState.isLoaded, setApiState]);

//   return apiState;
// };

// export default useLoadGoogleMapsAPI;

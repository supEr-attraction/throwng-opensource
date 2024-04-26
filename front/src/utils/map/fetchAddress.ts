import { useSetRecoilState } from "recoil";
import { Location } from "../../types/mapType";
import { addressState } from "@store/map/atoms";

const setAddress = useSetRecoilState(addressState);

const fetchAddress = (location: Location): void => {
  const geocoder = new window.google.maps.Geocoder();
  geocoder.geocode({ location }, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results?.[0]) {
        const addressComponents = results[0].address_components;
        let district = "";
        let neighborhood = "";
        // console.log(addressComponents);

        addressComponents.forEach((component) => {
          if (component.types.includes("sublocality_level_2")) {
            neighborhood = component.long_name;
          }
          if (
            component.types.includes("sublocality_level_1") &&
            component.types.includes("political")
          ) {
            district = component.long_name;
          }
        });
        // console.log(`구: ${district}, 동: ${neighborhood}`); // 구와 동을 콘솔에 출력
        setAddress(`${district} ${neighborhood}`);
      } else {
        console.error("No address found");
      }
    } else {
      console.error("Geocoder failed: " + status);
    }
  });
};

export default fetchAddress;

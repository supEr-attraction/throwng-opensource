import { Marker } from "../../types/mapType";

const convertToSvg = (
  activeMarkerId: number | null,
  marker: Marker,
  imgUrl: string
) => {
  const svgIcon = `
    <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="22" fill="url(#pattern)" stroke="${
        activeMarkerId === marker.itemId ? "#7b66ff" : "#FFFFFF"
      }" stroke-width="3"/>
      <defs>
        <pattern id="pattern" patternUnits="userSpaceOnUse" width="48" height="48">
          <image href="${imgUrl}" x="0" y="0" width="48" height="48"/>
        </pattern>
      </defs>
    </svg>`;

  const encodedIcon = `data:image/svg+xml;base64,${btoa(svgIcon)}`;

  return encodedIcon;
};

export default convertToSvg;

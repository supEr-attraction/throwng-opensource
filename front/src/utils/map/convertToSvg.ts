// import { Marker } from "../../types/mapType";

// const convertToSvg = (
//   activeMarkerId: number | null,
//   marker: Marker
//   // imgUrl: string
// ) => {
//   const strokeColor = activeMarkerId === marker.itemId ? "#7b66ff" : "#FFFFFF";

//   console.log(marker.albumImage);

//   const svgIcon = `<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="22" fill="url(#pattern)" stroke="${strokeColor}" stroke-width="3"/><defs><pattern id="pattern" patternUnits="userSpaceOnUse" width="48" height="48"><image href="${marker.albumImage}" x="0" y="0" width="48" height="48"/></pattern></defs></svg>`;

//   const encodedIcon = `data:image/svg+xml;base64,${btoa(svgIcon)}`;

//   // console.log(encodedIcon);

//   return encodedIcon;

//   // const encoder = new TextEncoder();
//   // const encodedArray = encoder.encode(svgIcon);
//   // const uint8ToBase64 = (uint8Array: any) => {
//   //   let binary = "";
//   //   for (let i = 0; i < uint8Array.length; i++) {
//   //     binary += String.fromCharCode(uint8Array[i]);
//   //   }
//   //   return btoa(binary);
//   // };

//   // const base64String = uint8ToBase64(encodedArray);

//   // const img = new Image();
//   // img.crossOrigin = "anonymous";
//   // // img.className = activeMarkerId === marker.itemId ? "bbbb" : "aaaa";
//   // img.src = encodedIcon;
//   // console.log(encodedIcon);

//   // img.onload = () => {
//   //   const canvas = document.createElement("canvas");
//   //   canvas.width = img.width;
//   //   canvas.height = img.height;
//   //   const ctx = canvas.getContext("2d");
//   //   console.log(ctx);

//   //   ctx!.drawImage(img, 0, 0);

//   //   const pngDataUrl = canvas.toDataURL("image/webp");
//   //   console.log(pngDataUrl); // 출력 또는 다른 곳에 사용 가능
//   // };

//   // return `data:image/svg+xml;base64,${base64String}`;
//   // return new Promise<string>((resolve, reject) => {
//   //   img.onload = () => {
//   //     const canvas = document.createElement("canvas");
//   //     canvas.className = "aaaa";
//   //     canvas.width = img.width;
//   //     canvas.height = img.height;
//   //     const ctx = canvas.getContext("2d");

//   //     ctx!.drawImage(img, 0, 0);

//   //     const pngDataUrl = canvas.toDataURL("image/webp");
//   //     resolve(pngDataUrl);
//   //   };

//   //   img.onerror = (error) => {
//   //     reject(error);
//   //   };
//   // });
// };

// export default convertToSvg;

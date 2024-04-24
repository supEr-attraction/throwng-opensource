import { atom } from "recoil";

// markers: {
//   id: number;
//   position: { lat: number; lng: number };
//   music: {
//     img: string;
//     title: string;
//     singer: string;
//   };
// }[];

export const markersState = atom({
  key: "markersState", // atom을 식별하는데 필요한 고유한 문자열
  default: [
    {
      id: 1,
      position: { lat: 35.203117334571935, lng: 126.80858111342218 },
      music: {
        img: "https://www.akbobada.com/home/akbobada/archive/akbo/img/202404011417025.jpg",
        title: "Magnetic",
        singer: "아일릿(ILLIT)",
      },
    },
    {
      id: 2,
      position: { lat: 35.203910921628214, lng: 126.81463012075089 },
      music: {
        img: "https://www.akbobada.com/home/akbobada/archive/akbo/img/202404031519030.jpg",
        title: "고민중독",
        singer: "QWER",
      },
    },
    {
      id: 3,
      position: { lat: 35.196855157684766, lng: 126.80999034944725 },
      music: {
        img: "https://i.namu.wiki/i/vhLGDDDc-Li_qN6coMRSYw8y9o6P35-LiCqqVD0cW6EtaDIkCv1qcRx0Pv7_B0y-Y3t2HOjhHXWgCkgvrBLgGg.webp",
        title: "밤양갱",
        singer: "비비 (BIBI)",
      },
    },
    {
      id: 4,
      position: { lat: 35.20844989024097, lng: 126.81213782231445 },
      music: {
        img: "https://image.bugsm.co.kr/album/images/500/200804/20080494.jpg",
        title: "예뻤어",
        singer: "DAY6 (데이식스)",
      },
    },
    {
      id: 5,
      position: { lat: 35.207737757465566, lng: 126.8120955340353 },
      music: {
        img: "https://i.namu.wiki/i/MSkG72jk148VM93WJM2eHTr0xWILekb__C3_Q_T-MyA1-j0sS4eTMkVfTg0k2ei3fVamgHlc8o2up2s0uqD9xQ.webp",
        title: "To. X",
        singer: "태연 (TAEYEON)",
      },
    },
    {
      id: 6,
      position: { lat: 35.20691042509998, lng: 126.80757284866725 },
      music: {
        img: "https://i.namu.wiki/i/k3jyp1dcS9jeKkeB_r9gVPgScFktA9FcSNAcpC1XACtxhD3jBs4--6zL-5WGSgSzzDIBfjvBf7PoYzNwVEL3Tg.webp",
        title: "Love 119",
        singer: "RIIZE",
      },
    },
    {
      id: 7,
      position: { lat: 35.20151326425343, lng: 126.80879352168917 },
      music: {
        img: "https://www.akbobada.com/home/akbobada/archive/akbo/img/202402211005009.jpg",
        title: "홀씨",
        singer: "아이유",
      },
    },
    {
      id: 8,
      position: { lat: 35.20247745303855, lng: 126.807209937287 },
      music: {
        img: "https://www.akbobada.com/home/akbobada/archive/akbo/img/202402211005009.jpg",
        title: "홀씨",
        singer: "아이유",
      },
    },
  ],
});

export const activeMarkerState = atom<number | null>({
  key: "activeMarkerState", // atom을 식별하는데 필요한 고유한 문자열
  default: null, // 초기값을 설정해준다.
});

export const locationState = atom<{ lat: number; lng: number }>({
  key: "locationState", // atom을 식별하는데 필요한 고유한 문자열
  default: { lat: 0, lng: 0 }, // 초기값을 설정해준다.
});

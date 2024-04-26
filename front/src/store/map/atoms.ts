import { Location, Marker } from "../../types/mapType";
import { atom } from "recoil";

// markers: {
//   itemId: number;
// latitude: number; longitude: number,
//     img: string;
//     title: string;
//     singer: string;
// }[];

// export const loadedStage = atom<{
//   isLoaded: boolean;
//   loadError: Error | undefined;
// }>({
//   key: "loadedStage",
//   default: {
//     isLoaded: false,
//     loadError: undefined,
//   },
// });

// interface MapApiState {
//   isLoaded: boolean;
//   loadError?: Error;
// }

// export const mapApiState = atom<MapApiState>({
//   key: "mapApiState",
//   default: {
//     isLoaded: false,
//     loadError: undefined,
//   },
// });

export const markersState = atom<Marker[]>({
  key: "markersState", // atom을 식별하는데 필요한 고유한 문자열
  default: [
    {
      itemId: 1,
      latitude: 35.203117334571935,
      longitude: 126.80858111342218,
      albumImage:
        "https://www.akbobada.com/home/akbobada/archive/akbo/img/202404011417025.jpg",
      songTitle: "Magnetic",
      artistName: "아일릿(ILLIT)",
    },
    {
      itemId: 2,
      latitude: 35.203910921628214,
      longitude: 126.81463012075089,
      albumImage:
        "https://www.akbobada.com/home/akbobada/archive/akbo/img/202404031519030.jpg",
      songTitle: "고민중독",
      artistName: "QWER",
    },
    {
      itemId: 3,
      latitude: 35.196855157684766,
      longitude: 126.80999034944725,
      albumImage:
        "https://i.namu.wiki/i/vhLGDDDc-Li_qN6coMRSYw8y9o6P35-LiCqqVD0cW6EtaDIkCv1qcRx0Pv7_B0y-Y3t2HOjhHXWgCkgvrBLgGg.webp",
      songTitle: "밤양갱",
      artistName: "비비 (BIBI)",
    },
    {
      itemId: 4,
      latitude: 35.20844989024097,
      longitude: 126.81213782231445,
      albumImage:
        "https://image.bugsm.co.kr/album/images/500/200804/20080494.jpg",
      songTitle: "예뻤어",
      artistName: "DAY6 (데이식스)",
    },
    {
      itemId: 5,
      latitude: 35.207737757465566,
      longitude: 126.8120955340353,
      albumImage:
        "https://i.namu.wiki/i/MSkG72jk148VM93WJM2eHTr0xWILekb__C3_Q_T-MyA1-j0sS4eTMkVfTg0k2ei3fVamgHlc8o2up2s0uqD9xQ.webp",
      songTitle: "To. X",
      artistName: "태연 (TAEYEON)",
    },
    {
      itemId: 6,
      latitude: 35.20691042509998,
      longitude: 126.80757284866725,
      albumImage:
        "https://i.namu.wiki/i/k3jyp1dcS9jeKkeB_r9gVPgScFktA9FcSNAcpC1XACtxhD3jBs4--6zL-5WGSgSzzDIBfjvBf7PoYzNwVEL3Tg.webp",
      songTitle: "Love 119",
      artistName: "RIIZE",
    },
    {
      itemId: 7,
      latitude: 35.20151326425343,
      longitude: 126.80879352168917,
      albumImage:
        "https://www.akbobada.com/home/akbobada/archive/akbo/img/202402211005009.jpg",
      songTitle: "홀씨",
      artistName: "아이유",
    },
    {
      itemId: 8,
      latitude: 35.21239434960787,
      longitude: 126.87592760473652,
      albumImage:
        "https://www.akbobada.com/home/akbobada/archive/akbo/img/202402211005009.jpg",
      songTitle: "홀씨",
      artistName: "아이유",
    },
    {
      itemId: 9,
      latitude: 35.20674655565142,
      longitude: 126.87512352772394,
      albumImage:
        "https://image.bugsm.co.kr/album/images/500/40832/4083248.jpg",
      songTitle: "그대가 내 안에 박혔다(그내박)",
      artistName: "순순희(기태)",
    },
    {
      itemId: 10,
      latitude: 35.20667402786965,
      longitude: 126.87471730485265,
      albumImage:
        "https://i.namu.wiki/i/gQq7yL2gbO3_EWZJvfmoFynKLj6fPk76XkIXuyyy8B2HKvK4U_O9db0j8oMUUFy3yrGCZFBazNVK9iSYwjNyEw.webp",
      songTitle: "I Don't Think That I Like Her",
      artistName: "Charlie Puth",
    },
    {
      itemId: 11,
      latitude: 35.217299078189626,
      longitude: 126.87728208677949,
      albumImage:
        "https://image.bugsm.co.kr/album/images/500/40850/4085086.jpg",
      songTitle: "사랑하지 않아서 그랬어",
      artistName: "임한별",
    },
    {
      itemId: 12,
      latitude: 35.20458055575659,
      longitude: 126.87248025018455,
      albumImage:
        "https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/085/017/795/85017795_1713318076675_1_600x600.JPG",
      songTitle: "By Your SitemIde",
      artistName: "Crush",
    },
    {
      itemId: 13,
      latitude: 35.207737757465566,
      longitude: 126.8120955340353,
      albumImage:
        "https://image.bugsm.co.kr/album/images/500/40452/4045282.jpg",
      songTitle: "다정히 내 이름을 부르면",
      artistName: "경서예지, 전건호",
    },
    {
      itemId: 14,
      latitude: 35.211289031658005,
      longitude: 126.87479807659642,
      albumImage:
        "https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/085/034/097/85034097_1713765075406_1_600x600.JPG",
      songTitle: "새봄의 노래 (Beginning)",
      artistName: "도영 (DOYOUNG)",
    },
    {
      itemId: 15,
      latitude: 35.20581024748837,
      longitude: 126.88068179327126,
      albumImage:
        "https://i1.sndcdn.com/artworks-eO0iYJWUBqNon8N3-2CqcGQ-t500x500.jpg",
      songTitle: "파이팅 해야지 (Feat. 이영지)",
      artistName: "부석순 (SEVENTEEN)",
    },
    {
      itemId: 16,
      latitude: 35.20673614550716,
      longitude: 126.87817654137028,
      albumImage:
        "https://www.akbobada.com/home/akbobada/archive/akbo/img/202311051932016.jpg",
      songTitle: "Standing Next to You",
      artistName: "정국",
    },
  ],
});

export const activeMarkerState = atom<number | null>({
  key: "activeMarkerState", // atom을 식별하는데 필요한 고유한 문자열
  default: null, // 초기값을 설정해준다.
});

export const swiperState = atom<string | null>({
  key: "swiperState", // atom을 식별하는데 필요한 고유한 문자열
  default: null, // 초기값을 설정해준다.
});

export const addressState = atom({
  key: "addressState", // atom을 식별하는데 필요한 고유한 문자열
  default: "", // 초기값을 설정해준다.
});

export const locationState = atom<Location>({
  key: "locationState", // atom을 식별하는데 필요한 고유한 문자열
  default: { lat: 0, lng: 0 }, // 초기값을 설정해준다.
});

export const prevLocationState = atom<Location>({
  key: "prevLocationState", // atom을 식별하는데 필요한 고유한 문자열
  default: { lat: 0, lng: 0 }, // 초기값을 설정해준다.
});

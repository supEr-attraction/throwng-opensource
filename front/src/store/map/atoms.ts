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
      position: { lat: 35.21239434960787, lng: 126.87592760473652 },
      music: {
        img: "https://www.akbobada.com/home/akbobada/archive/akbo/img/202402211005009.jpg",
        title: "홀씨",
        singer: "아이유",
      },
    },
    {
      id: 9,
      position: { lat: 35.203117334571935, lng: 126.80858111342218 },
      music: {
        img: "https://image.bugsm.co.kr/album/images/500/40832/4083248.jpg",
        title: "그대가 내 안에 박혔다(그내박)",
        singer: "순순희(기태)",
      },
    },
    {
      id: 10,
      position: { lat: 35.203910921628214, lng: 126.81463012075089 },
      music: {
        img: "https://i.namu.wiki/i/gQq7yL2gbO3_EWZJvfmoFynKLj6fPk76XkIXuyyy8B2HKvK4U_O9db0j8oMUUFy3yrGCZFBazNVK9iSYwjNyEw.webp",
        title: "I Don't Think That I Like Her",
        singer: "Charlie Puth",
      },
    },
    {
      id: 11,
      position: { lat: 35.217299078189626, lng: 126.87728208677949 },
      music: {
        img: "https://image.bugsm.co.kr/album/images/500/40850/4085086.jpg",
        title: "사랑하지 않아서 그랬어",
        singer: "임한별",
      },
    },
    {
      id: 12,
      position: { lat: 35.20458055575659, lng: 126.87248025018455 },
      music: {
        img: "https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/085/017/795/85017795_1713318076675_1_600x600.JPG",
        title: "By Your Side",
        singer: "Crush",
      },
    },
    {
      id: 13,
      position: { lat: 35.207737757465566, lng: 126.8120955340353 },
      music: {
        img: "https://image.bugsm.co.kr/album/images/500/40452/4045282.jpg",
        title: "다정히 내 이름을 부르면",
        singer: "경서예지, 전건호",
      },
    },
    {
      id: 14,
      position: { lat: 35.211289031658005, lng: 126.87479807659642 },
      music: {
        img: "https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/085/034/097/85034097_1713765075406_1_600x600.JPG",
        title: "새봄의 노래 (Beginning)",
        singer: "도영 (DOYOUNG)",
      },
    },
    {
      id: 15,
      position: { lat: 35.20581024748837, lng: 126.88068179327126 },
      music: {
        img: "https://i1.sndcdn.com/artworks-eO0iYJWUBqNon8N3-2CqcGQ-t500x500.jpg",
        title: "파이팅 해야지 (Feat. 이영지)",
        singer: "부석순 (SEVENTEEN)",
      },
    },
    {
      id: 16,
      position: { lat: 35.20673614550716, lng: 126.87817654137028 },
      music: {
        img: "https://www.akbobada.com/home/akbobada/archive/akbo/img/202311051932016.jpg",
        title: "Standing Next to You",
        singer: "정국",
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

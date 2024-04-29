import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAvpaLumUt3oSgo0VxNfOmUWlVa7B-vi5U",
  authDomain: "throwng-a72e9.firebaseapp.com",
  projectId: "throwng-a72e9",
  storageBucket: "throwng-a72e9.appspot.com",
  messagingSenderId: "857673974729",
  appId: "1:857673974729:web:fd8c37ef63556ca19c9e18",
  measurementId: "G-12ZP96ZF2R"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export async function requestPermission() {
  console.log("권한 요청 중...");

  const permission = await Notification.requestPermission();
  if (permission === "denied") {
    console.log("알림 권한 허용 안됨");
    return;
  }

  console.log("알림 권한이 허용됨");

  const token = await getToken(messaging, {
    vapidKey: "BCSszT3YW8snVQJvsaxGXHAzWALd90j1dnWdVlbvoG6I6GL1pRmdu7bfkHa6LELNBdOlumJmTSmeiWQAXjRH08Q"
    ,
  });

  if (token) console.log("token: ", token);
  else console.log("Can not get Token");

  onMessage(messaging, (payload) => {
    console.log("메시지가 도착했습니다.", payload);
    // ...
  });
}

// requestPermission();

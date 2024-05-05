import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { postFcmToken } from "@services/noticeApi/FirebaseApi.tsx";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FCM_API_KEY,
  authDomain: import.meta.env.VITE_APP_FCM_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FCM_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FCM_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FCM_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FCM_APP_ID,
  measurementId: import.meta.env.VITE_APP_FCM_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export async function requestPermission() {
  const permission = await Notification.requestPermission();
  if (permission === "denied") {
    // console.log("Notification permission denied");
    return;
  }

  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
  });

  if (token) {
    // console.log("FCM token:", token);
    postFcmToken(token);
  } else {
    // console.log("Cannot retrieve FCM token");
  }
}

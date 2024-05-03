import { atom } from "recoil";

export const logoutModalState = atom({
  key: "logoutModalState", // atom을 식별하는데 필요한 고유한 문자열
  default: false,
});

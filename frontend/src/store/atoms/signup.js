import { atom } from "recoil";

export const signupAtom = atom({
  key: "signupAtom",
  default: {
    username: "",
    firstName: "",
    lastName: "",
    password: "",
  },
});

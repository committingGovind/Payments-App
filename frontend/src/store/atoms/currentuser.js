import { atom } from "recoil";

export const curretuserAtom = atom({
  key: "curretuserAtom",
  default: {
    firstName: "",
    lastName: "",
  },
});

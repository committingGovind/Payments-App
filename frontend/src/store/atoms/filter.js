import { atom, selector } from "recoil";
import { usersAtom } from "./users";

export const filterAtom = atom({
  key: "filterAtom",
  default: "",
});

export const filterSelector = selector({
  key: "filterSelector",
  get: ({ get }) => {
    const users = get(usersAtom);
    const filter = get(filterAtom);

    if (filter == "") return users;
    else {
      return users.filter((user) =>
        user.firstName.toLowerCase().includes(filter.toLowerCase())
      );
    }
  },
});

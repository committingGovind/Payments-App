import { useSetRecoilState } from "recoil";
import { filterAtom } from "../store/atoms/filter";

export function Filter() {
  const setFilter = useSetRecoilState(filterAtom);

  return (
    <div className="grid grid-cols-1">
      <input
        placeholder="Search users..."
        type="text"
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        className="shadow-md col-span-1 ml-7 mt-4 mr-7 p-3 rounded-md border-2"
      ></input>
    </div>
  );
}

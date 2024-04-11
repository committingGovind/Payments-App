import { useRecoilValue } from "recoil";
import { curretuserAtom } from "../store/atoms/currentuser";

export function Topbar() {
  const currentUser = useRecoilValue(curretuserAtom);
  return (
    <div className="grid grid-cols-6 shadow-md">
      <div className="col-span-5 text-3xl font-semibold p-3 mt-5 ml-7">
        Payments App
      </div>
      <div className="col-span-1 p-2 m-4">
        <div className="flex justify-start text-center">
          <div className="text-xl mt-3">Hello, {currentUser.firstName}</div>
          <div className="w-12 h-12 rounded-full bg-gray-100 ml-7 flex items-center justify-center text-xl">
            {currentUser.firstName[0].toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}

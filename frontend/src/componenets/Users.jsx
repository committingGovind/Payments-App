import axios from "axios";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { filterAtom } from "../store/atoms/filter";
import { usersAtom } from "../store/atoms/users";
import { User } from "./User";

export function Users() {
  const [users, setUsers] = useRecoilState(usersAtom);
  const filter = useRecoilValue(filterAtom);
  const token = localStorage.getItem("paytmToken");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      });
  }, [filter]);

  return (
    <div className="mt-10">
      {users &&
        users.map((user) => {
          return <User user={user} />;
        })}
    </div>
  );
}

import { useEffect, useState } from "react";
import { Balance } from "../componenets/Balance";
import { Filter } from "../componenets/Filter";
import { Topbar } from "../componenets/Topbar";
import { Users } from "../componenets/Users";
import axios from "axios";

export function Dashboard() {
  const [userBalance, setUserBalance] = useState(0);

  const token = localStorage.getItem("paytmToken");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserBalance(response.data.balance);
      })
      .catch((err) => {
        console.log("error occured during getting balance");
      });
  }, []);

  return (
    <div>
      <Topbar />
      <Balance userBalance={userBalance} />
      <Filter />
      <Users />
    </div>
  );
}

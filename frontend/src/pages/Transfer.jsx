import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export function Transfer() {
  const [amount, setAmount] = useState("");
  const [searchParams] = useSearchParams();

  const toId = searchParams.get("toId");
  const username = searchParams.get("name");

  const token = localStorage.getItem("paytmToken");

  return (
    <div className="bg-[#F2F4F7] flex h-screen justify-center items-center">
      <div className="w-1/3 h-1/2 bg-[#FEFFFE] border-2 rounded-2xl">
        <h1 className="text-center font-bold text-4xl m-4 pt-7">Send Money</h1>
        <br></br>
        <br></br>
        <br></br>
        <div className="flex justify-start ml-7 pl-3 items-center">
          <div className="flex items-center justify-center text-xl w-16 h-16 rounded-full bg-[#20C55C] text-white">
            {username[0].toUpperCase()}
          </div>
          <h1 className="ml-3 pl-3 text-4xl font-semibold">{username}</h1>
        </div>
        <h1 className="mt-5 ml-10 pl-3 text-xl font-medium">Amount (in Rs)</h1>
        <div className="grid grid-cols-1 grid-rows-2">
          <input
            placeholder="Enter amount"
            type="text"
            className="col-span-1 row-span-1 ml-12 mr-12 mt-5 h-14 p-4 shadow-md border-2 rounded-lg"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          ></input>
          <button
            className="row-span-1 col-span-1 text-xl bg-[#20C55C] text-white ml-12 mr-12 mt-6 h-14 p-4 mb-6 border-2 rounded-lg"
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/account/transfer",
                {
                  to: toId,
                  amount: amount,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (response.status == 200) alert("transfer successful.");
            }}
          >
            Initiate transfer
          </button>
        </div>
      </div>
    </div>
  );
}

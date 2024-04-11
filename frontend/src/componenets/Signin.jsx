import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { signinAtom } from "../store/atoms/signin";
import { useNavigate } from "react-router-dom";
import { curretuserAtom } from "../store/atoms/currentuser";

export function Signin() {
  const navigate = useNavigate();

  const [signin, setSignin] = useRecoilState(signinAtom);

  const setCurrentUser = useSetRecoilState(curretuserAtom);

  return (
    <div className="flex h-screen bg-[#7e7f7e] items-center justify-center">
      <div className="h-1/2 w-1/4 bg-slate-50 rounded-md shadow-md">
        <div className="text-center p-3">
          <h1 className="font-bold p-4 text-4xl">Sign in</h1>
          <h1 className="text-gray-500 font-medium text-2xl">
            Enter your credentials to access your account
          </h1>
        </div>
        <br></br>
        <h1 className="text-left text-xl font-medium pl-6">Email</h1>
        <div className="flex justify-center m-3">
          <input
            placeholder="johndoe@example.com"
            type="text"
            className="border-2 w-96 h-14 p-2 shadow-sm"
            onChange={(e) => {
              setSignin((signin) => ({
                username: e.target.value,
                password: signin.password,
              }));
            }}
          ></input>
        </div>
        <h1 className="text-left text-lg font-medium pl-6 mt-2">Password</h1>
        <div className="flex justify-center m-3">
          <input
            type="text"
            className="border-2 w-96 h-12 p-2 shadow-sm"
            onChange={(e) => {
              setSignin((signin) => ({
                username: signin.username,
                password: e.target.value,
              }));
            }}
          ></input>
        </div>

        <div className="flex justify-center m-4">
          <button
            className="bg-black text-white text-center w-96 h-12 border-2 p-2 shadow-sm rounded-lg"
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signin",
                signin
              );
              const data = response.data;

              if (response.status == 200) {
                localStorage.setItem("paytmToken", data.token);
                setCurrentUser({
                  firstName: data.firstName,
                  lastName: data.lastName,
                });
                navigate("/dashboard");
              }
            }}
          >
            Sign In
          </button>
        </div>
        <div className="flex justify-center">
          <h2>Don't have an account?</h2>
          <a href="/signup" className="pl-2 underline">
            Signup
          </a>
        </div>
      </div>
    </div>
  );
}

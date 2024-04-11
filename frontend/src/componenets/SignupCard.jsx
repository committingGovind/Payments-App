import axios from "axios";

import { useRecoilState, useSetRecoilState } from "recoil";

import { signupAtom } from "../store/atoms/signup";

import { useNavigate } from "react-router-dom";
import { curretuserAtom } from "../store/atoms/currentuser";

export function SignupCard() {
  const navigate = useNavigate();

  const [signup, setSignup] = useRecoilState(signupAtom);
  const setCurrentUser = useSetRecoilState(curretuserAtom);

  return (
    <div className="bg-[#7e7f7e] h-screen flex items-center justify-center">
      <div className="h-2/3 w-1/4 bg-slate-50 p-2 rounded-lg">
        <div>
          <h1 className="text-center text-4xl font-bold p-4">Sign up</h1>
          <h2 className="text-center text-gray-500 font-medium text-2xl">
            Enter your information to create an account
          </h2>
        </div>
        <br></br>
        <h1 className="text-left text-lg font-medium pl-6">First Name</h1>
        <div className="flex justify-center m-3">
          <input
            placeholder="John"
            type="text"
            onChange={function (e) {
              setSignup((signup) => ({
                firstName: e.target.value,
                lastName: signup.lastName,
                username: signup.username,
                password: signup.password,
              }));
            }}
            className="border-2 w-96 h-12 p-2 shadow-sm"
          ></input>
        </div>
        <h1 className="text-left text-lg font-medium pl-6 mt-2">Last Name</h1>
        <div className="flex justify-center m-3">
          <input
            placeholder="Doe"
            type="text"
            onChange={function (e) {
              setSignup((signup) => ({
                lastName: e.target.value,
                firstName: signup.firstName,
                username: signup.username,
                password: signup.password,
              }));
            }}
            className="border-2 w-96 h-12 p-2 shadow-sm"
          ></input>
        </div>
        <h1 className="text-left text-lg font-medium pl-6 mt-2">Email</h1>
        <div className="flex justify-center m-3">
          <input
            placeholder="johndoe@example.com"
            type="text"
            onChange={function (e) {
              setSignup((signup) => ({
                username: e.target.value,
                firstName: signup.firstName,
                lastName: signup.lastName,
                password: signup.password,
              }));
            }}
            className="border-2 w-96 h-12 p-2 shadow-sm"
          ></input>
        </div>
        <h1 className="text-left text-lg font-medium pl-6 mt-2">Password</h1>
        <div className="flex justify-center m-3">
          <input
            type="text"
            onChange={function (e) {
              setSignup((signup) => ({
                password: e.target.value,
                firstName: signup.firstName,
                lastName: signup.lastName,
                username: signup.username,
              }));
            }}
            className="border-2 w-96 h-12 p-2 shadow-sm"
          ></input>
        </div>
        <div className="flex justify-center m-4">
          <button
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                signup
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
            className="bg-black text-white text-center w-96 h-12 border-2 p-2 shadow-sm rounded-lg"
          >
            Sign Up
          </button>
        </div>

        <div className="flex justify-center">
          <h2>Already have an account?</h2>
          <a href="/signin" className="pl-2 underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}

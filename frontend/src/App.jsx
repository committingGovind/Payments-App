import "./App.css";
import { Dashboard } from "./pages/Dashboard";
import { Signin } from "./componenets/Signin";
import { SignupCard } from "./componenets/SignupCard";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Transfer } from "./pages/Transfer";

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignupCard />} />
            <Route path="signin" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transfer" element={<Transfer />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;

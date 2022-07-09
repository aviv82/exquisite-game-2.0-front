import "./Home.css";

import { useState } from "react";

import { SignUp } from "../signup/SignUp";
import { Button } from "../../component/button/Button";

export const Home = () => {
  const [cookieConfirm, setCookieConfirm] = useState(false);

  // users.length === 0 ? initUsers() : console.log("what");

  return cookieConfirm === false ? (
    <Button
      kind="submit"
      title="confirm cookies"
      face="green"
      action={() => setCookieConfirm(true)}
    ></Button>
  ) : (
    <SignUp />
  );
};

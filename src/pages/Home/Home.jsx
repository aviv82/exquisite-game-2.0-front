import "./Home.css";

import { useState } from "react";
import { Link } from "react-router-dom";

import { SignUp } from "../signup/SignUp";
import { Button } from "../../component/button/Button";

export const Home = () => {
  // users.length === 0 ? initUsers() : console.log("what");

  return (
    <div className="intro">
      <h1>welcome</h1>
      <p>LogIn to Play!</p>
      <Link to="/login">
        <Button
          kind="submit"
          title="LogIn"
          face="green"
          // action={() => setCookieConfirm(true)}
        ></Button>
      </Link>
      <p>Not Exquisite yet?</p>
      <Link to="/signup">
        <Button
          kind="submit"
          title="SignUp"
          face="blue"
          // action={() => setCookieConfirm(true)}
        ></Button>
      </Link>
      <p>The Exquisite Lobby</p>
      <Link to="/lobby">
        <Button kind="submit" title="Exquisite Lobby" face="pink"></Button>
      </Link>
    </div>
  );
};

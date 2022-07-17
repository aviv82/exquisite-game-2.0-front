import "./Home.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { SignUp } from "../signup/SignUp";
import { Button } from "../../component/button/Button";
import { authenticate } from "../../api/authenticate";
import Cookies from "js-cookie";

export const Home = () => {
  const initToken = async (name, pass) => {
    const authPromise = await authenticate(name, pass);
    Cookies.set("token", authPromise.jwt);
  };

  useEffect(() => {
    initToken("ghost", "jocKor-qufva5-vinqax");
  }, []);

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

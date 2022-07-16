import "./Lobby.css";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { authenticate } from "../../api/authenticate";
import { getAuth } from "../../api/getAuth";
import { Link } from "react-router-dom";
import { Button } from "../../component/button/Button";
import { LobbyUserList } from "./LobbyUserList";
import { LobbyTaleList } from "./LobbyTaleList";

export const Lobby = () => {
  useEffect(() => {
    Cookies.get("id");
    // initTales("ghost", "jocKor-qufva5-vinqax");
  }, []);

  return !Cookies.get("id") ? (
    <div className="lobby">
      <h2 className="lobby-head">
        Welcome to the Exquisite Lobby{Cookies.get("username")}!
      </h2>
      <p>You must login in order to play the exquisite game</p>
      <Link to="/login">
        <Button kind="submit" title="LogIn" face="green"></Button>
      </Link>
    </div>
  ) : (
    <div className="lobby">
      <h2 className="lobby-head">
        Welcome to the Exquisite Lobby {Cookies.get("username")}!
      </h2>
      <LobbyTaleList />
      <LobbyUserList />
    </div>
  );
};

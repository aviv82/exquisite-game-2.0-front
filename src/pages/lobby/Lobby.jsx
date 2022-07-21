import "./Lobby.css";

import Cookies from "js-cookie";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { Button } from "../../component/button/Button";

import { LobbyUserList } from "./LobbyUserList";
import { LobbyTaleList } from "./LobbyTaleList";
import { Workspace } from "../workspace/Workspace";

export const Lobby = () => {
  useEffect(() => {
    Cookies.get("id");
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
      <div className="lobby-items">
        <LobbyTaleList />
        <Workspace />
        <LobbyUserList />
      </div>
    </div>
  );
};

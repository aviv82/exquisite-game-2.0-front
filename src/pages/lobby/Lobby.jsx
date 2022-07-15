import "./Lobby.css";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { authenticate } from "../../api/authenticate";
import { getAuth } from "../../api/getAuth";
import { Link } from "react-router-dom";
import { Button } from "../../component/button/Button";

export const Lobby = () => {
  const [users, setUsers] = useState([]);
  const [tales, setTales] = useState([]);

  const initUsers = async (name, pass) => {
    const authPromise = await authenticate(name, pass);
    const jwt = authPromise.jwt;
    const usersPromise = await getAuth("users", jwt);
    setUsers(usersPromise);
  };

  const initTales = async (name, pass) => {
    const authPromise = await authenticate(name, pass);
    const jwt = authPromise.jwt;
    const usersPromise = await getAuth("tales?populate=*", jwt);
    setTales(usersPromise);
  };

  useEffect(() => {
    Cookies.get("id");
    initUsers("ghost", "jocKor-qufva5-vinqax");
    initTales("ghost", "jocKor-qufva5-vinqax");
    console.log("lobby logged in?", Cookies.get("id"));
    console.log("lobby user list", users);
    console.log("lobby tale list", tales);
  }, []);

  return !Cookies.get("id") ? (
    <div className="lobby">
      <h2 className="lobby-head">Welcome to the Exquisite Lobby!</h2>
      <p>You must login in order to play the exquisite game</p>
      <Link to="/login">
        <Button kind="submit" title="LogIn" face="green"></Button>
      </Link>
    </div>
  ) : (
    <div className="lobby">
      <h2 className="lobby-head">Welcome to the Exquisite Lobby!</h2>
    </div>
  );
};

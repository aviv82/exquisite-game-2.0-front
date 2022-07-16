import "./LobbyUserList.css";

import { useEffect, useRef } from "react";
import Cookies from "js-cookie";

import { authenticate } from "../../api/authenticate";
import { getAuth } from "../../api/getAuth";

export const LobbyUserList = () => {
  const users = useRef([]);

  const initUsers = async (name, pass) => {
    const authPromise = await authenticate(name, pass);
    const jwt = authPromise.jwt;
    const usersPromise = await getAuth("users", jwt);
    users.current = usersPromise;
  };

  useEffect(() => {
    initUsers("ghost", "jocKor-qufva5-vinqax");
  }, []);

  if (users.current) {
    console.log("lobby user list", users.current);
  }
  return (
    <div className="user-list">
      <h4 className="user-list-head">Exquisites:</h4>
      <ul className="user-un-list">
        {users.current.map((user) =>
          user.username === Cookies.get("username") ? (
            <></>
          ) : (
            <li key={user.id} className="user-list-item">
              {user.username}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

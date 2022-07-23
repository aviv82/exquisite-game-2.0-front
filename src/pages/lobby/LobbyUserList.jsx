import "./LobbyUserList.css";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { getAuth } from "../../api/getAuth";

export const LobbyUserList = () => {
  const [users, setUsers] = useState([]);

  const initUsers = async (name, pass) => {
    const usersPromise = await getAuth("users", Cookies.get("token"));
    setUsers(usersPromise);
  };

  useEffect(() => {
    initUsers("ghost", "jocKor-qufva5-vinqax");
  }, []);

  /*
  if (users) {
    console.log("lobby user list", users);
  }
  */

  return users.length === 0 ? (
    <h3>Loading...</h3>
  ) : (
    <div className="user-list">
      <h4 className="user-list-head">Exquisites:</h4>
      <ul className="user-un-list">
        {users.map((user) =>
          user.username === Cookies.get("username") ||
          user.username === "ghost" ? (
            <React.Fragment key={user.id}></React.Fragment>
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

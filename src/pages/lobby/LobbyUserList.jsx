import { useEffect, useRef } from "react";
import { authenticate } from "../../api/authenticate";
import { getAuth } from "../../api/getAuth";
import "./LobbyUserList.css";

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
    <ul>
      {users.current.map((user) => (
        <li key={user.id}>{user.username}</li>
      ))}
    </ul>
  );
};

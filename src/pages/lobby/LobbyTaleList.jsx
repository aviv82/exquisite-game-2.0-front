import { useEffect, useRef } from "react";
import { authenticate } from "../../api/authenticate";
import { getAuth } from "../../api/getAuth";
import "./LobbyTaleList.css";

export const LobbyTaleList = () => {
  const tales = useRef([]);

  const initTales = async (name, pass) => {
    const authPromise = await authenticate(name, pass);
    const jwt = authPromise.jwt;
    const usersPromise = await getAuth("tales?populate=*", jwt);
    tales.current = usersPromise;
  };

  useEffect(() => {
    initTales("ghost", "jocKor-qufva5-vinqax");
    console.log("lobby tale list", tales.current.data);
  }, []);

  return <h3>tales</h3>;
};

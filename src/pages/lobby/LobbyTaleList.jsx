import "./LobbyTaleList.css";

import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

import { getAuth } from "../../api/getAuth";

export const LobbyTaleList = () => {
  const [tales, setTales] = useState([]);

  const initTales = async (name, pass) => {
    const usersPromise = await getAuth(
      "tales?populate=*",
      Cookies.get("token")
    );
    setTales(usersPromise);
  };

  useEffect(() => {
    initTales("ghost", "jocKor-qufva5-vinqax");
  }, []);

  console.log("lobby tale list", tales.data);

  return tales.length === 0 ? (
    <h4>Loading</h4>
  ) : (
    <div className="lobby-tale-list">
      <h4 className="lobby-tale-head">exquisite tales:</h4>
      <h5 className="lobby-tale-sub">your ongoing tales:</h5>
      <ul className="lobby-tale-un">
        {tales.data.map((tale) =>
          tale.attributes.complete === false &&
          tale.attributes.creators.data[0].attributes.username ===
            Cookies.get("username") ? (
            <li key={tale.id} className="lobby-tale-li">
              {tale.attributes.title}
            </li>
          ) : (
            <React.Fragment key={tale.id}></React.Fragment>
          )
        )}
      </ul>
      <h5 className="lobby-tale-sub">ongoing tales you contribute to:</h5>
      <ul className="lobby-tale-un">
        {tales.data.map((tale) =>
          tale.attributes.complete === false &&
          tale.attributes.creators.data[0].attributes.username !==
            Cookies.get("username") ? (
            <li key={tale.id} className="lobby-tale-li">
              {tale.attributes.title}
            </li>
          ) : (
            <React.Fragment key={tale.id}></React.Fragment>
          )
        )}
      </ul>
    </div>
  );
};

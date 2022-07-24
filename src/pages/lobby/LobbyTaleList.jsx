import "./LobbyTaleList.css";

import Cookies from "js-cookie";
import React from "react";

// import { getAuth } from "../../api/getAuth";
import { Button } from "../../component/button/Button";
import { handleCreateNewTale } from "../../handlers/handleCreateNewTale";
import { handleOngoingTale } from "../../handlers/handleOngoingTale";

export const LobbyTaleList = ({ tales }) => {
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
            <li
              key={tale.id}
              id={tale.id}
              onClick={handleOngoingTale}
              className="lobby-tale-li"
            >
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
            Cookies.get("username") &&
          tale.attributes.contributor.data.filter(
            (name) => name.attributes.username === Cookies.get("username")
          ).length !== 0 ? (
            <li
              id={tale.id}
              key={tale.id}
              onClick={handleOngoingTale}
              className="lobby-tale-li"
            >
              {tale.attributes.title}
            </li>
          ) : (
            <React.Fragment key={tale.id}></React.Fragment>
          )
        )}
      </ul>
      <h5 className="lobby-tale-sub">other ongoing tales:</h5>
      <ul className="lobby-tale-un">
        {tales.data.map((tale) =>
          tale.attributes.complete === false &&
          tale.attributes.creators.data[0].attributes.username !==
            Cookies.get("username") &&
          tale.attributes.contributor.data.filter(
            (name) => name.attributes.username === Cookies.get("username")
          ).length === 0 ? (
            <li
              key={tale.id}
              id={tale.id}
              onClick={handleOngoingTale}
              className="lobby-tale-li"
            >
              {tale.attributes.title}
            </li>
          ) : (
            <React.Fragment key={tale.id}></React.Fragment>
          )
        )}
      </ul>
      <Button
        face="blue"
        type="submit"
        title="Create New Tale"
        action={handleCreateNewTale}
      />
    </div>
  );
};

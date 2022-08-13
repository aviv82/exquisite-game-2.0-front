import "./LibraryTaleList.css";

import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import { handleTaleLink } from "../../handlers/handleTaleLink";

export const LibraryTaleList = ({ tales }) => {
  Cookies.remove("tale");
  // console.log("is cookie?", Cookies.get("tale"));

  return tales === undefined ? (
    <h4 className="library-tale-head">Loading...</h4>
  ) : (
    <div className="library-tale-list">
      <h4 className="library-tale-head">Tale list:</h4>
      {tales.map((tale) =>
        tale.attributes.complete === false ? (
          <React.Fragment key={tale.id}></React.Fragment>
        ) : (
          <div
            className="library-tale-item"
            key={tale.id}
            onClick={() => handleTaleLink(tale.id)}
          >
            <Link to="/tale">
              <h5 className="library-tale-title">{tale.attributes.title}</h5>
              <h6 className="library-tale-author">
                Created by:{" "}
                {tale.attributes.creators.data[0].attributes.username}
                {tale.attributes.contributor.data.map((name, i) =>
                  i === tale.attributes.contributor.data.length - 1
                    ? String(` & ${name.attributes.username}`)
                    : String(`, ${name.attributes.username}`)
                )}
              </h6>
              <p className="library-tale-dark">
                {tale.attributes.segment[0].body.slice(
                  0,
                  Number(tale.attributes.segment[0].body.length) / 3
                )}
              </p>
            </Link>
          </div>
        )
      )}
    </div>
  );
};

/*
<Link to="/library">
        <Button kind="submit" title="Exquisite Library" face="yellow"></Button>
      </Link>
*/

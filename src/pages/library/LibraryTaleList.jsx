import "./LibraryTaleList.css";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { getAuth } from "../../api/getAuth";

export const LibraryTaleList = () => {
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

  if (tales.data) {
    console.log("library tale list", tales.data);
  }
  return tales.length === 0 ? (
    <h4 className="library-tale-head">Loading...</h4>
  ) : (
    <div className="library-tale-list">
      <h4 className="library-tale-head">Tale list:</h4>
      {tales.data.map((tale) =>
        tale.attributes.complete === false ? (
          <React.Fragment key={tale.id}></React.Fragment>
        ) : (
          <div className="library-tale-item" key={tale.id}>
            <h5 className="library-tale-title">{tale.attributes.title}</h5>
            <h6 className="library-tale-author">
              Created by: {tale.attributes.creators.data[0].attributes.username}
              {tale.attributes.contributor.data.map((name, i) =>
                i === tale.attributes.contributor.data.length - 1
                  ? String(` & ${name.attributes.username}`)
                  : String(`, ${name.attributes.username}`)
              )}
            </h6>
            <p className="library-tale-pre">
              {tale.attributes.segment[0].body}
            </p>
          </div>
        )
      )}
    </div>
  );
};

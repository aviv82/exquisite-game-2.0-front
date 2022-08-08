import "./LibraryTaleList.css";

import React from "react";

export const LibraryTaleList = ({ tales }) => {
  /*
  if (tales.data) {
    const text = String(tales.data[0].attributes.segment[0].body);
    // console.log("library tale list", text.slice(0, 40));
  }
*/

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
            <p className="library-tale-dark">
              {tale.attributes.segment[0].body.slice(
                0,
                Number(tale.attributes.segment[0].body.length) / 3
              )}
            </p>
          </div>
        )
      )}
    </div>
  );
};

import "./LibrarySearch.css";

import React, { useState } from "react";
import { LibraryTaleList } from "./LibraryTaleList";

export const LibrarySearch = ({ tales }) => {
  const [searchTale, setSearchTale] = useState("");
  const [toDisplay, setToDisplay] = useState([]);

  const handleTaleSearch = (type, value) => {
    if (type === "all") {
      setSearchTale(value);
      if (tales !== undefined) {
        setToDisplay(
          tales.filter(
            (tale) =>
              (tale.attributes.complete === true &&
                tale.attributes.title.includes(value)) ||
              (tale.attributes.complete === true &&
                tale.attributes.creators.data[0].attributes.username.includes(
                  value
                )) ||
              (tale.attributes.complete === true &&
                tale.attributes.contributor.data.filter((name) =>
                  name.attributes.username.includes(value)
                ).length !== 0)
          )
        );
      }
    } else if (type === "title") {
      setToDisplay(
        tales.filter(
          (tale) =>
            tale.attributes.complete === true && tale.attributes.title === value
        )
      );
      setSearchTale("");
    } else if (type === "author") {
      setToDisplay(
        tales.filter(
          (tale) =>
            tale.attributes.complete === true &&
            tale.attributes.creators.data[0].attributes.username === value
        )
      );
      setSearchTale("");
    } else if (type === "contributor") {
      setToDisplay(
        tales.filter(
          (tale) =>
            tale.attributes.complete === true &&
            tale.attributes.contributor.data.filter(
              (name) => name.attributes.username === value
            ).length !== 0
        )
      );
      setSearchTale("");
    }
  };

  const authors = [];
  const contributors = [];

  const pushName = (type, name) => {
    if (!type.includes(name)) {
      type.push(name);
    }
    // console.log(`${type}`, type);
  };

  /*
  console.log(
    "search tales",
    tales,
    "title",
    tales[0].attributes.title,
    "author",
    tales[0].attributes.creators.data[0].attributes.username,
    "contributors",
    tales[0].attributes.contributor.data[0].attributes.username
  );
*/

  // console.log("search values", searchTale);

  return tales === undefined ? (
    <h2>Loading...</h2>
  ) : (
    <div className="library-search-wrap">
      <h3 className="library-search-head">Search Tales</h3>
      <div className="library-search-section">
        <div className="library-search-field">
          <h4>Search Field</h4>
          <input
            type="input"
            className="library-input-field"
            placeholder="Search Tales"
            value={searchTale}
            onChange={(e) => {
              handleTaleSearch("all", e.target.value);
            }}
          ></input>
          <div className="library-input-preview">
            <ul>
              {searchTale.length !== 0 ? <h5>Titles</h5> : null}
              {tales.map((tale) =>
                searchTale.length !== 0 ? (
                  tale.attributes.complete === true &&
                  tale.attributes.title.includes(searchTale) ? (
                    <li
                      key={tale.id}
                      onClick={() =>
                        handleTaleSearch("title", tale.attributes.title)
                      }
                    >
                      {tale.attributes.title}
                    </li>
                  ) : (
                    <React.Fragment key={tale.id}></React.Fragment>
                  )
                ) : null
              )}
              {searchTale.length !== 0 ? <h5>Creator</h5> : null}
              {tales.map((tale) =>
                searchTale.length !== 0
                  ? tale.attributes.complete === true &&
                    tale.attributes.creators.data[0].attributes.username.includes(
                      searchTale
                    )
                    ? pushName(
                        authors,
                        tale.attributes.creators.data[0].attributes.username
                      )
                    : null
                  : null
              )}
              {authors.map((name, i) => (
                <li key={i} onClick={() => handleTaleSearch("author", name)}>
                  {name}
                </li>
              ))}
              {searchTale.length !== 0 ? <h5>Contributor</h5> : null}
              {searchTale.length !== 0
                ? tales.map((tale) =>
                    tale.attributes.contributor.data.map((name) =>
                      tale.attributes.complete === true &&
                      name.attributes.username.includes(searchTale)
                        ? pushName(contributors, name.attributes.username)
                        : null
                    )
                  )
                : null}
              {contributors.map((name, i) => (
                <li
                  key={i}
                  onClick={() => handleTaleSearch("contributor", name)}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="library-display">
          <h4>Display Field</h4>
          {toDisplay.length === 0 && searchTale === "" ? (
            <LibraryTaleList tales={tales} />
          ) : (
            <LibraryTaleList tales={toDisplay} />
          )}
        </div>
      </div>
    </div>
  );
};

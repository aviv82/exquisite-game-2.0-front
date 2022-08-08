import "./LibrarySearch.css";

export const LibrarySearch = ({ tales }) => {
  console.log("search tales", tales);
  return (
    <div className="library-search-wrap">
      <h3 className="library-search-head">Search Tales</h3>
      <div className="library-sub">
        <h4>Search Field</h4>
        <h4>Display Field</h4>
      </div>
    </div>
  );
};

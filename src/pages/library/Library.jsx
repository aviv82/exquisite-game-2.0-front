import "./Library.css";

import { LibraryTaleList } from "./LibraryTaleList";

export const Library = () => {
  return (
    <div className="library-wrap">
      <h3 className="library-head">The Exquisite Library</h3>
      <LibraryTaleList />
    </div>
  );
};

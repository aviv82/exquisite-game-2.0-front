import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getAuth } from "../../api/getAuth";
import "./Library.css";

import { LibrarySearch } from "./LibrarySearch";
import { LibraryTaleList } from "./LibraryTaleList";

export const Library = () => {
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

  return (
    <div className="library-wrap">
      <h3 className="library-head">The Exquisite Library</h3>
      <LibrarySearch tales={tales.data} />
      <LibraryTaleList tales={tales} />
    </div>
  );
};

import "./Library.css";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import { getAuth } from "../../api/getAuth";
import { handleCookieConfirm } from "../../handlers/handleCookieConfirm";

import { Button } from "../../component/button/Button";
import { LibrarySearch } from "./LibrarySearch";

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

  return !Cookies.get("cookieConfirm") ? (
    <div className="cookie-confirm">
      <h2>confirm cookies</h2>
      <Button
        kind="submit"
        title="confirm cookies"
        face="green"
        action={handleCookieConfirm}
      ></Button>
    </div>
  ) : (
    <div className="library-wrap">
      <h3 className="library-head">The Exquisite Library</h3>
      <LibrarySearch tales={tales.data} />
    </div>
  );
};

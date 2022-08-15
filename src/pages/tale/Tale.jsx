import "./Tale.css";

import Cookies from "js-cookie";
import { useState } from "react";
import { Link } from "react-router-dom";

import { handleCookieConfirm } from "../../handlers/handleCookieConfirm";
import { handleClearTaleCookie } from "../../handlers/handleClearTaleCookie";

import { Button } from "../../component/button/Button";
import { useEffect } from "react";
import { getAuth } from "../../api/getAuth";

export const Tale = () => {
  const [tales, setTales] = useState([]);

  const initTales = async (name, pass) => {
    const usersPromise = await getAuth(
      "tales?populate[0]=contributor&populate[1]=creators&populate[2]=segment.writer",
      Cookies.get("token")
    );
    setTales(usersPromise);
  };

  const taleToShow = [];

  useEffect(() => {
    if (Cookies.get("cookieConfirm")) {
      initTales("ghost", "jocKor-qufva5-vinqax");
    }
  }, []);

  // console.log("cookie test", Cookies.get("tale"), "tales", tales.data);

  if (tales.data !== undefined) {
    taleToShow.push(
      tales.data.filter((tale) => tale.id === Number(Cookies.get("tale")))
    );
    // console.log("this tale", taleToShow[0][0]);
  }

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
  ) : tales.data === undefined || taleToShow[0][0] === undefined ? (
    <h1>Loading...</h1>
  ) : (
    <div className="tale-wrap">
      <h2 className="tale-title">{taleToShow[0][0].attributes.title}</h2>
      <h4 className="tale-authors">
        Written by{" "}
        {taleToShow[0][0].attributes.creators.data[0].attributes.username}
        {taleToShow[0][0].attributes.contributor.data.map((name, i) =>
          i === taleToShow[0][0].attributes.contributor.data.length - 1
            ? String(` & ${name.attributes.username}`)
            : String(`, ${name.attributes.username}`)
        )}
      </h4>
      {taleToShow[0][0].attributes.segment.map((seg) => (
        <p key={seg.id} className="tale-segment">
          {seg.body}
        </p>
      ))}
      <div className="return-to-library" onClick={handleClearTaleCookie}>
        <Link to="/library">
          <Button kind="submit" title="return to library" face="red"></Button>
        </Link>
      </div>
    </div>
  );
};

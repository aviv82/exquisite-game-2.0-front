import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import { Button } from "./component/button/Button";

/*
import { handleGet } from "./handlers/handleGet";
import { handlePost } from "./handlers/handlePost";
import { handlePut } from "./handlers/handlePut";
import { handleDelete } from "./handlers/handleDelete";
import { handleAuth } from "./handlers/handleAuth";
*/

import { Home } from "./pages/Home/Home";
import { SignUp } from "./pages/signup/SignUp";
import { LogIn } from "./pages/login/LogIn";
import { Lobby } from "./pages/lobby/Lobby";
import { Library } from "./pages/library/Library";
import { Tale } from "./pages/tale/Tale";
import { handleCookieConfirm } from "./handlers/handleCookieConfirm";
import { handleCookieReject } from "./handlers/handleCookieReject";
import { authenticate } from "./api/authenticate";
import { useEffect } from "react";

function App() {
  const initToken = async (name, pass) => {
    const authPromise = await authenticate(name, pass);
    Cookies.set("token", authPromise.jwt);
  };

  useEffect(() => {
    if (Cookies.get("cookieConfirm")) {
      initToken("ghost", "jocKor-qufva5-vinqax");
    }
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
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/library" element={<Library />} />
          <Route path="/tale" element={<Tale />} />
        </Routes>

        {/*<div className="api tests">
          <input type="input" placeholder="value"></input>
          <Button kind="button" title="get" face="green" action={handleGet} />
          <Button
            kind="button"
            title="update"
            face="yellow"
            action={handlePut}
          />
          <Button kind="button" title="add" face="blue" action={handlePost} />
          <Button
            kind="button"
            title="delete"
            face="red"
            action={handleDelete}
          />
          <Button kind="button" title="auth" face="pink" action={handleAuth} />
  </div>*/}

        <div className="reject-cookies">
          <div className="cookie-confirm">
            <h2>reject cookies</h2>
            <Button
              kind="submit"
              title="reject cookies"
              face="red"
              action={handleCookieReject}
            ></Button>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

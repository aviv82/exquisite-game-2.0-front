import "./App.css";

import { useState, useRef } from "react";

import { Button } from "./component/button/Button";

import { handleGet } from "./handlers/handleGet";
import { handlePost } from "./handlers/handlePost";
import { handlePut } from "./handlers/handlePut";
import { handleDelete } from "./handlers/handleDelete";
import { handleAuth } from "./handlers/handleAuth";

function App() {
  return (
    <div className="App">
      <div className="api tests">
        <input type="input" placeholder="value"></input>
        <Button kind="button" title="get" face="green" action={handleGet} />
        <Button kind="button" title="update" face="yellow" action={handlePut} />
        <Button kind="button" title="add" face="blue" action={handlePost} />
        <Button kind="button" title="delete" face="red" action={handleDelete} />
        <Button kind="button" title="auth" face="pink" action={handleAuth} />
      </div>
    </div>
  );
}

export default App;

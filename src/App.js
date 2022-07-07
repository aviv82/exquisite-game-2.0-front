import "./App.css";

import { Button } from "./component/button/Button";

import { handleGet } from "./handlers/handleGet";
import { handlePost } from "./handlers/handlePost";
import { handlePut } from "./handlers/handlePut";

function App() {
  return (
    <div className="App">
      <div className="api tests">
        <input type="input" placeholder="value"></input>
        <Button kind="button" title="get" face="green" action={handleGet} />
        <Button kind="button" title="update" face="yellow" action={handlePut} />
        <Button kind="button" title="add" face="blue" action={handlePost} />
      </div>
    </div>
  );
}

export default App;

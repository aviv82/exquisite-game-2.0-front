import "./App.css";

import { Button } from "./component/button/Button";

import { handleGet } from "./handlers/handleGet";
import { handlePut } from "./handlers/handlePut";

function App() {
  return (
    <div className="App">
      <div className="api tests">
        <input type="input"></input>
        <Button kind="button" title="get" face="green" action={handleGet} />
        <Button kind="button" title="update" face="yellow" action={handlePut} />
      </div>
    </div>
  );
}

export default App;

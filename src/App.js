import "./App.css";
import { Button } from "./component/button/Button";

import { handleGet } from "./handlers/handleGet";

function App() {
  return (
    <div className="App">
      <input type="input"></input>
      <Button kind="button" title="get" face="green" action={handleGet} />
    </div>
  );
}

export default App;

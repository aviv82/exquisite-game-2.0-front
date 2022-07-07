import "./App.css";

import { Button } from "./component/button/Button";

import { handleGet } from "./handlers/handleGet";
import { handlePost } from "./handlers/handlePost";
import { handlePut } from "./handlers/handlePut";
import { handleDelete } from "./handlers/handleDelete";

function App() {
  return (
    <div className="App">
      <div className="api tests">
        <input type="input" placeholder="value"></input>
        <Button kind="button" title="get" face="green" action={handleGet} />
        <Button kind="button" title="update" face="yellow" action={handlePut} />
        <Button kind="button" title="add" face="blue" action={handlePost} />
        <Button kind="button" title="delete" face="red" action={handleDelete} />
      </div>
    </div>
  );
}

export default App;

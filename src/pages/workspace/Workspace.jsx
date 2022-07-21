import Cookies from "js-cookie";
import { Button } from "../../component/button/Button";
import "./Workspace.css";
import { WorkSpaceIntro } from "./WorkSpaceIntro";

export const Workspace = () => {
  const handleClearMode = () => {
    Cookies.set("mode", "blank");
    window.location.reload(false);
  };

  return (
    <div className="workspace">
      {Cookies.get("mode") === "new" ? <h2>new!</h2> : <WorkSpaceIntro />}
      <Button
        title="reset mode cookie"
        kind="submit"
        face="red"
        action={handleClearMode}
      />
    </div>
  );
};

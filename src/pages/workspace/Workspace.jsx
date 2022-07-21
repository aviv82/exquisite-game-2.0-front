import Cookies from "js-cookie";
import { Button } from "../../component/button/Button";
import "./Workspace.css";
import { WorkspaceIntro } from "./WorkspaceIntro";
import { WorkspaceNewTale } from "./WorkspaceNewTale";

export const Workspace = () => {
  const handleClearMode = () => {
    Cookies.set("mode", "blank");
    window.location.reload(false);
  };

  return (
    <div className="workspace">
      {Cookies.get("mode") === "new" ? (
        <WorkspaceNewTale />
      ) : (
        <WorkspaceIntro />
      )}
      <Button
        title="reset mode cookie"
        kind="submit"
        face="red"
        action={handleClearMode}
      />
    </div>
  );
};

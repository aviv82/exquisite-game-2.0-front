import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getAuth } from "../../api/getAuth";
import { Button } from "../../component/button/Button";
import "./Workspace.css";
import { WorkspaceIntro } from "./WorkspaceIntro";
import { WorkspaceNewTale } from "./WorkspaceNewTale";
import { WorkspaceOngoingTale } from "./WorkspaceOngoingTale";

export const Workspace = ({ tales }) => {
  if (tales.data) {
    // const titles = [];
    // tales.data.map((tale) => titles.push(tale.attributes.title));
    // Cookies.set("tales", titles);
    // console.log("lobby tales:", tales);
  }

  const handleClearMode = () => {
    Cookies.set("mode", "blank");
    window.location.reload(false);
  };

  return (
    <div className="workspace">
      {Cookies.get("mode") === "new" ? (
        <WorkspaceNewTale tales={tales} />
      ) : Cookies.get("mode") === "ongoing" ? (
        <WorkspaceOngoingTale num={Cookies.get("tale")} tales={tales.data} />
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

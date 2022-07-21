import Cookies from "js-cookie";

export const handleCreateNewTale = () => {
  Cookies.set("mode", "new");
  console.log("workspace mode:", Cookies.get("mode"));
  window.location.reload(false);
  return;
};

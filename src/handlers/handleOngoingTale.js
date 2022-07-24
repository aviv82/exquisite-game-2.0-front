import Cookies from "js-cookie";

export const handleOngoingTale = (event) => {
  Cookies.set("tale", event.target.id);
  Cookies.set("mode", "ongoing");
  window.location.reload(false);
  // console.log("ongoing tale", Cookies.get("tale"));
};

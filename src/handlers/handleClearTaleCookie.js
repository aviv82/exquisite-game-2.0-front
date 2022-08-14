import Cookies from "js-cookie";

export const handleClearTaleCookie = () => {
  Cookies.remove("tale");
  window.location.reload(false);
};

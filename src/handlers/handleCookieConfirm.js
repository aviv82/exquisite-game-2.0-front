import Cookies from "js-cookie";

export const handleCookieConfirm = () => {
  Cookies.set("cookieConfirm", true);
  window.location.reload(false);
};

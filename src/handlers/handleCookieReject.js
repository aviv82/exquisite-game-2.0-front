import Cookies from "js-cookie";

export const handleCookieReject = () => {
  Cookies.remove("cookieConfirm");
  window.location.reload(false);
};

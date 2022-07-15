import Cookies from "js-cookie";

export const handleLogout = () => {
  Cookies.remove("username");
  Cookies.remove("email");
  Cookies.remove("password");
  Cookies.remove("id");
  Cookies.remove("jwt");
  window.location.reload(false);
};

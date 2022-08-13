import Cookies from "js-cookie";

export const handleTaleLink = (taleId) => {
  Cookies.set("tale", taleId);
};

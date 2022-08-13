import "./Tale.css";

import Cookies from "js-cookie";

export const Tale = ({ tales }) => {
  console.log("cookie test", Cookies.get("tale"));

  return <h2 className="tale-test">tales test</h2>;
};

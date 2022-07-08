import { authenticate } from "../api/authenticate";
import { getAuth } from "../api/getAuth";

export const handleAuth = async (event) => {
  const toAuth = event.target.parentElement.children[0].value;
  const authPromise = await authenticate(toAuth);
  console.log("test authenticate", authPromise.jwt);
  const getPromise = await getAuth(authPromise.jwt);
  console.log("test auth get", getPromise);
  event.target.parentElement.children[0].value = "";
  return authPromise.jwt;
};

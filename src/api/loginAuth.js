import { ORIGIN } from "../config";

export const loginAuth = async (value = "", pass = "") => {
  const path = "auth/local";
  const body = {
    identifier: value,
    password: pass,
  };
  const url = encodeURI(`${ORIGIN}${path}`);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    // throw new Error(`${response.status}: ${response.statusText}`);
    const err = `${response.status}: ${response.statusText}`;
    return { err: err };
  }
  const result = await response.json();
  // console.log("authenticate", result);
  return result;
};

import { ORIGIN } from "../config";

export const authenticate = async (value = "") => {
  const path = "auth/local";
  const body = {
    identifier: value,
    password: value,
  };
  const url = encodeURI(`${ORIGIN}${path}`);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  const result = await response.json();
  // console.log("authenticate", result);
  return result;
};

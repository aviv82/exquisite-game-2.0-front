import { ORIGIN } from "../config";

export const postAuth = async (path, value, token) => {
  const category = path;
  const body = value;
  const url = encodeURI(`${ORIGIN}${category}`);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      accept: "application/javascript",
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  const result = await response.json();
  console.log("add", result);
  return result;
};

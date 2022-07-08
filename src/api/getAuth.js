import { ORIGIN } from "../config";

export const getAuth = async (value = "") => {
  const path = "aspects";

  const url = encodeURI(`${ORIGIN}${path}`);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${value}`,
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  const result = await response.json();
  // console.log("update", result);
  return result;
};

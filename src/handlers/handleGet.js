import { get } from "../api/get";

export const handleGet = async (event) => {
  const toGet = await get(event.target.parentElement.children[0].value);
  console.log("to get", toGet);
  return toGet;
};

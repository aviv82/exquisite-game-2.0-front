import { Delete } from "../api/delete";

export const handleDelete = async (event) => {
  const toDelete = Number(event.target.parentElement.children[0].value);
  const dataCategory = "tests";
  const deletePromise = await Delete(dataCategory, toDelete);
  console.log("delete test", deletePromise);
  event.target.parentElement.children[0].value = "";
  return;
};

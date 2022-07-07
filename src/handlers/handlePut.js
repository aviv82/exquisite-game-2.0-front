import { put } from "../api/put";

export const handlePut = async (event) => {
  const toSearch = "tests/1";
  const toUpdate = {
    data: {
      field: event.target.parentElement.children[0].value,
    },
  };
  const updatePromise = await put(toSearch, toUpdate);
  console.log("update test", updatePromise);
  event.target.parentElement.children[0].value = "";
  return;
};

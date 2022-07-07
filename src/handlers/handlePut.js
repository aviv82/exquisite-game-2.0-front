import { put } from "../api/put";

export const handlePut = async (event) => {
  const toUpdate = {
    data: {
      field: event.target.parentElement.children[0].value,
    },
  };
  const updatePromise = await put("tests/1", toUpdate);
  console.log("update test", updatePromise);
  event.target.parentElement.children[0].value = "";
  return updatePromise;
};

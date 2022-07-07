import { post } from "../api/post";

export const handlePost = async (event) => {
  const toAdd = "tests";
  const inputValue = event.target.parentElement.children[0].value;
  const addValue = {
    data: {
      field: inputValue,
    },
  };
  const addPromise = await post(toAdd, addValue);
  console.log("test post", addPromise);
  event.target.parentElement.children[0].value = "";
  return;
};

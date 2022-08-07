import { putAuth } from "../api/putAuth";
import { pageReload } from "../handlers/pageReload";

export const handleFinishTale = (taleId, token) => {
  const path = `tales/${Number(taleId)}`;
  const toUpdate = {
    data: {
      complete: true,
    },
  };
  console.log("tale to close", Number(taleId), token);
  putAuth(path, toUpdate, token);
  setTimeout(pageReload, 800);
};

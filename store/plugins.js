import { CTX_ADD } from "./mutation-types";
import { setLocal } from "./localStorage";
const localStoragePlugin = (store) => {
  store.subscribe((mutation, store) => {
    const { type } = mutation;
    if (type === `ctxs/${CTX_ADD}`) {
      setLocal("ctxs", store.ctxs);
    }
  });
};

const navPlugin = (store) => {
  store.subscribe((mutation, store) => {
    const { type } = mutation;
    console.log(store);
  });
};
export default [localStoragePlugin];

import { CTX_ADD, CTX_DEL } from "./mutation-types";
import { setLocal } from "./localStorage";
const localStoragePlugin = (store) => {
  store.subscribe((mutation, store) => {
    const { type } = mutation;
    if ([`ctxs/${CTX_ADD}`, `ctxs/${CTX_DEL}`].includes(type)) {
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

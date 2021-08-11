import { checkCtx } from "../services";
import { CTX_ADD } from "./mutation-types.js";
export default {
  namespaced: true,
  state: {
    current: "",
    list: [],
  },
  actions: {
    async checkCtxAndSave({ commit }, { type, name }) {
      try {
        const item = await checkCtx(type, name);
        commit(CTX_ADD, item);
      } catch (e) {}
    },
  },
  mutations: {
    [CTX_ADD](state, item) {
      state.list.push(item);
    },
  },
  getters: {
    currentCtx({ current, list }) {
      if (!current) return null;
      const [theType, theName] = current.split("-");
      return list.find(
        ({ type, name }) => type === theType && name === theName
      );
    },
  },
};

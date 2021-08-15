import { checkCtx } from "@/services";
import { getLocal } from "../localStorage";
import {
  CTX_ADD,
  CTX_CURRENT_SET,
  CTX_CURRENT_DEL,
} from "../mutation-types.js";
export default {
  namespaced: true,
  state: getLocal("ctxs") || {
    current: "",
    list: [],
  },
  actions: {
    async checkCtxAndSave({ commit, state }, { type, name }) {
      const item = state.list.find(
        ({ type: aType, name: aName }) => type === aType && name === aName
      );
      if (item) {
        throw "Context existed";
      }
      try {
        const item = await checkCtx(type, name);
        commit(CTX_ADD, item);
      } catch (e) {
        // todo: some msg to show
      }
    },
  },
  mutations: {
    [CTX_ADD](state, item) {
      state.list.push(item);
    },
    [CTX_CURRENT_SET](state, current) {
      state.current = current;
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

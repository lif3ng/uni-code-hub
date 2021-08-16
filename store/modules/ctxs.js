import { checkCtx } from "@/services";
import { getLocal } from "../localStorage";
import {
  CTX_ADD,
  CTX_DEL,
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
    async checkCtxAndSave({ commit, state }, { platform, name }) {
      const item = state.list.find(
        ({ platform: aPlatform, name: aName }) =>
          platform === aPlatform && name === aName
      );
      if (item) {
        throw "Context existed";
      }
      try {
        const item = await checkCtx(platform, name);
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
    [CTX_DEL](state, item) {
      const { name, platform } = item;
      const targetIndex = state.list.findIndex(
        ({ name: aName, platform: aPlatform }) =>
          aPlatform === platform && aName === name
      );
      state.list.splice(targetIndex, 1);
    },
    [CTX_CURRENT_SET](state, current) {
      state.current = current;
    },
  },
  getters: {
    currentCtx({ current, list }) {
      if (!current) return null;
      const [thePlatform, theName] = current;
      return list.find(
        ({ platform, name }) => platform === thePlatform && name === theName
      );
    },
  },
};

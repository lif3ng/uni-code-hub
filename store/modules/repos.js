import { getUserRepos } from "@/services/index.js";
import { REPO_LIST_SET, REPO_LIST_RESET } from "../mutation-types";
export default {
  namespaced: true,
  state: {
    repos: [],
    loading: true,
  },
  actions: {
    async loadRepos({ commit }, user) {
      commit(REPO_LIST_SET, await getUserRepos(user));
    },
  },
  mutations: {
    [REPO_LIST_SET](state, repos) {
      state.repos = repos;
      state.loading = false;
    },
    [REPO_LIST_RESET](state, repos) {
      state.repos = [];
      state.loading = true;
    },
  },
};

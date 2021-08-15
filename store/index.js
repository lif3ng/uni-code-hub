import Vuex from "vuex";
import Vue from "vue";
import plugins from "./plugins";
import repos from "./modules/repos";
import ctxs from "./modules/ctxs";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  modules: {
    repos,
    ctxs,
  },
  plugins,
});
export default store;

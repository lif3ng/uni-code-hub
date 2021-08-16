<template>
  <view>
    <my-loading v-if="loading" />
    <uni-list v-else>
      <uni-list-item
        v-for="{ id, name, description, owner, updated_at } in repos"
        :key="id"
        :title="name"
        :note="description || ''"
        :rightText="formatDate(updated_at)"
        @click.native="openRepoPage(owner.login, name)"
      ></uni-list-item>
    </uni-list>
  </view>
</template>

<script>
import { createNamespacedHelpers, mapGetters } from "vuex";
import { REPO_LIST_RESET } from "../../store/mutation-types";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers("repos");
const { mapGetters: mapCtxsGetters } = createNamespacedHelpers("ctxs");
export default {
  onLoad() {
    if (!this.currentCtx) {
      uni.navigateTo({ url: "/pages/ctxs/ctxs" });
    } else {
      const { platform, name } = this.currentCtx;
      this.loadRepos(name);
      uni.setNavigationBarTitle({ title: `${platform}/${name}` });
    }
  },
  onUnload() {
    this[REPO_LIST_RESET]();
  },
  computed: {
    ...mapState(["repos", "loading"]),
    ...mapCtxsGetters(["currentCtx"]),
  },
  methods: {
    ...mapActions(["loadRepos"]),
    ...mapMutations([REPO_LIST_RESET]),
    formatDate(dateStr) {
      const d = new Date(dateStr);
      return d.toLocaleString();
    },
    openRepoPage(owner, repo) {
      uni.navigateTo({
        url: `../repo/repo?owner=${owner}&repo=${repo}`,
      });
    },
  },
};
</script>

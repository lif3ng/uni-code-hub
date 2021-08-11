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
const { mapState, mapActions } = createNamespacedHelpers("repos");
const { mapGetters: mapCtxsGetters } = createNamespacedHelpers("ctxs");
export default {
  onLoad() {
    console.log(this.currentCtx);
    if (!this.currentCtx) {
      uni.navigateTo({ url: "/pages/ctxs/ctxs" });
    } else {
      // todo
      this.loadRepos("lif3ng");
      uni.setNavigationBarTitle({ title: "lllf3ng" });
    }
  },
  computed: {
    ...mapState(["repos", "loading"]),
    ...mapCtxsGetters(["currentCtx"]),
  },
  methods: {
    ...mapActions(["loadRepos"]),
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

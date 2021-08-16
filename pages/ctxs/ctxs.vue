<template>
  <view>
    <uni-list>
      <uni-swipe-action v-for="(item, index) of ctxList" :key="index">
        <uni-swipe-action-item
          :right-options="options"
          @click="handleDel($event, item)"
        >
          <uni-list-item
            :title="item.name"
            :note="item.isUser ? 'User' : 'Org'"
            @longpress.native="handleLongPress(item.name)"
            @click.native="handleNavToRepos(item.platform, item.name)"
          ></uni-list-item>
        </uni-swipe-action-item>
      </uni-swipe-action>
    </uni-list>
    <uni-easyinput
      placeholder="username/org"
      style="text-align: center"
      v-model="userInputText"
      confirmType="done"
      @confirm="check"
    ></uni-easyinput>
  </view>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import uniList from "../../uni_modules/uni-list/components/uni-list/uni-list.vue";
import { CTX_DEL, CTX_CURRENT_SET } from "../../store/mutation-types";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers("ctxs");

export default {
  components: { uniList },
  data() {
    return {
      userInputText: "",
      options: [
        // {
        //   text: "取消",
        //   style: {
        //     backgroundColor: "#007aff",
        //   },
        // },
        {
          text: "删除",
          style: {
            backgroundColor: "#dd524d",
          },
        },
      ],
    };
  },
  onLoad() {},
  computed: {
    ...mapState({ ctxList: "list", currentCtx: "current" }),
    // ...mapGetters({ ctxList: "list" }),
  },
  watch: {
    currentCtx(cur) {
      if (cur) {
        uni.navigateTo({ url: "/pages/repo/list" });
      }
    },
  },
  methods: {
    ...mapActions(["checkCtxAndSave"]),
    ...mapMutations([CTX_DEL, CTX_CURRENT_SET]),
    async check() {
      try {
        await this.checkCtxAndSave({
          platform: "github",
          name: this.userInputText,
        });
      } catch (e) {
        alert(e);
      }
    },
    handleNavToRepos(platform, name) {
      this[CTX_CURRENT_SET]([platform, name]);
    },
    handleDel(e, item) {
      const { platform, name, isUser } = item;
      if (
        window.confirm(
          `确认删除 ${platform} ${isUser ? "user" : "org"} 【${name}】 ？`
        )
      ) {
        //  todo
        setTimeout(() => {
          this[CTX_DEL](item);
        }, 100);
      }
    },
  },
};
</script>

<style></style>

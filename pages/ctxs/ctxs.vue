<template>
  <view>
    {{ ctxList }}
    <uni-swipe-action>
      <uni-swipe-action-item
        :right-options="options"
        @click="onClick"
        @change="change"
      >
        <view>SwipeAction 基础使用场景</view>
      </uni-swipe-action-item>
      <!-- 使用插槽 （请自行给定插槽内容宽度）-->
      <uni-swipe-action-item>
        <template v-slot:left>
          <view><text>置顶</text></view>
        </template>
      </uni-swipe-action-item>
    </uni-swipe-action>
    <uni-list>
      <uni-swipe-action>
        <uni-swipe-action-item
          :right-options="options"
          v-for="(item, index) of ctxList"
          :key="index"
          @click="handleDel"
        >
          <uni-list-item
            :title="item.name"
            :note="item.isUser ? 'User' : 'Org'"
            @longpress.native="handleLongPress(item.name)"
            @click.native="handleNavToRepos(item.type, item.name)"
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
const { mapState, mapActions } = createNamespacedHelpers("ctxs");
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
    ...mapState({ ctxList: "list" }),
  },
  methods: {
    ...mapActions(["checkCtxAndSave"]),
    async check() {
      try {
        await this.checkCtxAndSave({
          type: "github",
          name: this.userInputText,
        });
      } catch (e) {
        alert(e);
      }
    },
    handleLongPress(name) {
      console.log("long press", name);
      // uni.showActionSheet({
      //   itemList: ["delete"],
      // });
    },
    handleNavToRepos(type, name) {
      console.log("handleNavToRepos", type, name);
    },
    handleClick(e) {
      console.log(e);
    },
  },
};
</script>

<style></style>

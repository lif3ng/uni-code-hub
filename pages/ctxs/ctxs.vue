<template>
  <view>
    {{ ctxList }}
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
    };
  },
  onLoad() {},
  computed: {
    ...mapState({ ctxList: "list" }),
  },
  methods: {
    ...mapActions(["checkCtxAndSave"]),
    check() {
      this.checkCtxAndSave({ type: "github", name: this.userInputText });
    },
  },
};
</script>

<style></style>

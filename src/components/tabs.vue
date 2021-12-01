<template>
  <div class="main-tabbar">
    <div class="item" @click="toHome">
      <img class="icon" src="../assets/images/icon-home.png" />
      <span class="text">首页</span>
    </div>
    <div class="item" @click="toMe">
      <img class="icon" src="../assets/images/icon-my.png" />
      <span class="text">我的</span>
    </div>
  </div>
</template>
<script>
import { api } from "@/api/api";
export default {
  methods: {
    toHome() {
      this.$router.push("/");
    },
    toMe() {
      this.$router.push("/mine");
    }
  }
};
</script>
<style lang="less">
.main-tabbar {
  border-top: 1px solid #f6f6f6;
  height: 60px;
  width: 100%;
  left: 0;
  bottom: 0 !important;
  position: fixed;
  background: #fff;
  display: flex;
  z-index: 99;
}
.main-tabbar .item {
  display:flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #c1c1c1;
}
.main-tabbar .item.selected {
  color: #747474;
}
.main-tabbar .item .icon {
  height: 32px;
  width: 32px;
}
.main-tabbar .item .text {
  font-size: 14px;
  margin-top:6px;
}
</style>
<template>
    <div class="pad-tabbar">
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
    </div>
</template>
<script>
import { api } from "@/api/api"
export default {
  methods: {
    toHome(){
        this.$router.push('/')
    },
    toMe(){
        this.$router.push('/mine')
    }
  }
};
</script>
<style lang="less">
.pad-tabbar{
    height:50px;
    border-top: 1px solid #f6f6f6;
    z-index: 99;
    width: 100%;
    bottom: 0;
    left: 0;
    position:fixed;
    background: #fff;
}
.main-tabbar {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.main-tabbar .item {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-flex: 1;
        -ms-flex: 1;
            flex: 1;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    color: #c1c1c1;
}
.main-tabbar .item.selected {
      color: #747474;
}
.main-tabbar .item .icon {
      height: 7.5vw;
      width: 7.5vw;
}
.main-tabbar .item .text {
      font-size: 3.2vw;
      margin-top: 0.5vw;
}

</style>
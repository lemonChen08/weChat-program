<template>
  <div class="tableBox">
    <div class="stats">
      <span>查看团队统计</span>
      <van-icon name="arrow" />
    </div>
    <div class="list">
      <div class="l-item">
        <div class="l-i">
          <img src="" class="h-img"/>
          <img src="" class="l-img" />
          <span>3个客户啊</span>
        </div>
        <div>2020/12/22</div>
      </div>
    </div>
  </div>
</template>
<script>
import { api } from "@/api/api";
export default {
  data() {
    return {
      payData: {},
      inviteList: [],
      userInfo: null
    };
  },
  created() {
    let userInfo = localStorage.getItem("userInfo");
    this.userInfo = JSON.parse(userInfo);
    this.getInviteList();
  },
  methods: {
    async getInviteList() {
      let res = await api.getinvitelist({
        action: "recommend_user",
        user_id: this.userInfo.user_id
      });
      if (res.data.code == 200) {
        this.inviteList = res.data.result;
      } else {
        this.$layer.msg(res.data.msg);
      }
    }
  }
};
</script>
<style scoped lang='less'>
  .stats{
    color: #333;
    font-size: 14px;
    font-weight: 500;
    background: #F1FCFF;
    height: 48px;
    display: flex;
    padding: 0 30px;
    align-items: center;
    justify-content: space-between;
  }
  .l-item{
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color:#666;
    margin: 0 15px;
    padding:0 15px;
    border-bottom: 1px solid #fafafa;
    font-size: 12px;
    .h-img{
      width: 39px;
      height: 39px;
      border-radius: 39px;
      margin-right: 20px;
    }
    .l-img{
      width: 18px;
      height: 18px;
      margin-right: 9px;
    }
    .l-i {
      display: flex;
      font-size: 14px;
      align-items: center;
    } 
  }
</style>
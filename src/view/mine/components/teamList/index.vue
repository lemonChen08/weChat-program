<template>
  <div class="tableBox">
    <div class="stats" @click="toStats">
      <span>查看团队统计</span>
      <van-icon name="arrow" />
    </div>
    <div class="list">
      <div class="l-item" v-for="item in teamList" :key="item.id">
        <div class="l-i">
          <img :src="item.headimgurl" class="h-img" v-if="item.headimgurl" />
          <img src="@/assets/images/headImg.jpg" class="h-img" v-else />
          <img :src='"@/assets/images/V" + item.user_level + "-s.png"' class="l-img" />
          <span>{{item.nickname}}</span>
        </div>
        <div>{{item.member_time}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { api } from "@/api/api";
export default {
  data() {
    return {
      teamList: [],
      userInfo:{}
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
        action: "team_user",
        user_id: this.userInfo.user_id
      });
      if (res.data.code == 200) {
        this.teamList = res.data.result;
      } else {
        this.$message.warning(res.data.msg);
      }
    },
    //查看团队统计
    toStats(){
      this.$router.push({
        path:'/teamStats'
      })
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
<template>
  <div class="tableBox">
    <div class="s-list">
      <div class="s-item" v-for="item in inviteList" :key="item.id">
        <span>{{item.ctime}}</span>
        <span style="text-align:center;">{{item.user_num}}人</span>
        <span style="text-align:right;">￥{{item.price}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { api } from "@/api/api";
export default {
  data() {
    return {
      inviteList: []
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
        action: "user_bill",
        user_id: this.userInfo.user_id
      });
      if (res.data.code == 200) {
        this.inviteList = res.data.result;
        this.inviteList.forEach((item, index) => {
          item.ctime = moment(parseInt(item.ctime) * 1000).format("YYYY-MM-DD");
        });
      } else {
        this.$layer.msg(res.data.msg);
      }
    }
  }
};
</script>
<style scoped lang='less'>
.s-list {
  display: flex;
  flex-direction: column;
  .s-item {
    height: 48px;
    display: flex;
    font-size: 14px;
    color: #666;
    align-items: center;
    padding: 0 30px;
    span {
      flex: 1;
    }
  }
}
</style>
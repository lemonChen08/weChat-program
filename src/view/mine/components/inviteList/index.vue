<template>
  <div class="t-box">
    <img src class="poster-img" />
    <img src class="poster-img" />
    <img src class="poster-img" />
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
<style scoped>
.t-box{
    display: flex;
    padding: 0 30px;
    justify-content: space-between;
}
.poster-img {
  width: 94px;
  height: 166px;
  margin: 16px 0;
}
</style>
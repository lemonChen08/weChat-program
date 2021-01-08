<template>
  <div class="t-box">
    <img :src='item.img_url' class="poster-img" v-for="item in inviteList" :key="item.id" />
  </div>
</template>
<script>
import { api } from "@/api/api";
export default {
  data() {
    return {
      inviteList: []
    };
  },
  created() {
    this.getInviteList();
  },
  methods: {
    async getInviteList() {
      let res = await api.getinvitelist({
        action: "get_poster"
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
}
.poster-img {
  width: 94px;
  height: 166px;
  margin: 16px 16px 0 0;
}
</style>
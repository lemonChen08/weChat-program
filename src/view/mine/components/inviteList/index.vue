<template>
  <div class="t-box">
    <img
      :src="item.img_url"
      class="poster-img"
      v-for="item in inviteList"
      :key="item.id"
      @click="getSharePoster(item.id)"
    />
    <div class="poster-box" v-if="showPoster">
      <div class="c-box">
        <img src="@/assets/images/close.png" class="close-img" @click="close" />
        <div>长按图片分享给好友</div>
        <img :src="posterImg" class="p-img" @click="previewImg" />
      </div>
    </div>
  </div>
</template>
<script>
import { api } from "@/api/api";
export default {
  data() {
    return {
      inviteList: [],
      posterImg: "",
      showPoster: false
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
    },
    //生成分享海报
    async getSharePoster(id) {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let res = await api.getinvitelist({
        action: "get_qrcode",
        id: id,
        inviteCode: userInfo.invite_code
      });
      this.showPoster = true;
      let data = res.data.url;
      this.posterImg = data;
    },
    //关闭
    close() {
      this.showPoster = false;
    },
    //查看大图
    previewImg() {
      wx.previewImage({
        urls: [this.posterImg],
        current: this.posterImg
      });
    }
  }
};
</script>
<style scoped>
.t-box {
  display: flex;
  padding: 0 30px;
}
.poster-img {
  width: 94px;
  height: 166px;
  margin: 16px 16px 0 0;
}
.c-box {
  color: #fff;
  margin-top: 30px;
  text-align: center;
  position: relative;
  width: 280px;
  left: 50%;
  margin-left: -140px;
}
.close-img {
  width: 20px;
  height: 20px;
  right: 0;
  top: 0;
  position: absolute;
}
.poster-box {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.p-img {
  width: 280px;
  margin-top: 10px;
}
</style>
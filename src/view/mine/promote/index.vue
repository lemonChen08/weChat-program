<template>
  <div class="container">
    <div class="info-box">
      <div class="t-b">
        <img :src="userData.headimgurl" class="u-img" v-if="userData.headimgurl" />
          <img src="@/assets/images/headImg.jpg" class="u-img" v-else />
        <div class="t-r">
          <div class="c-name">{{userData.nickname}}</div>
          <div class="o-info">
            <img :src='"@/assets/images/V" + (userData.user_level || 1) + "-s.png"' class="l-img" />
            <span class="l-txt">
              <span v-if="userData.user_level == 1">普通会员</span>
              <span v-else-if="userData.user_level == 2">VIP会员</span>
              <span v-else-if="userData.user_level == 3">服务商</span>
              <span v-else-if="userData.user_level == 4">金牌服务商</span>
              <span v-else-if="userData.user_level == 5">分公司服务商</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="share-btn" @click="doToggleShareMask">分享链接给更多人，领取丰厚奖金</div>
    <div class="tabs-box">
      <van-tabs v-model="action" color="#46B2FF" line-width='30' line-height='2' title-active-color='#46b2ff'>
        <van-tab title="海报推广"></van-tab>
        <van-tab title="我的团队"></van-tab>
        <van-tab title="奖金明细"></van-tab>
      </van-tabs>
      <div>
        <inviteList v-show="action==0" :doShare="doToggleShareMask"></inviteList>
        <teamList v-show="action==1"></teamList>
        <fanyongList v-show="action==2"></fanyongList>
      </div>
    </div>
    <div class='mask' v-if="showShareMask" @click="doToggleShareMask">
      <div class="content">
        <span class="text">点击右上角“...”, 分享好友或朋友圈邀请好友购买车主卡，成为您的团队成员</span>
      </div>
    </div>
  </div>
</template>

<script>
import inviteList from "@/view/mine/components/inviteList/index";
import fanyongList from "@/view/mine/components/fanyongList/index";
import teamList from "@/view/mine/components/teamList/index";
import { getUserInfo } from "@/api/mine";
export default {
  components: {
    inviteList,
    fanyongList,
    teamList
  },
  data() {
    return {
      action: 0,
      userData: {},
      myInfo: {},
      showShareMask: false
    };
  },
  created() {
    this.myInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.getUserInfo()
  },
  methods: {
    doToggleShareMask() {
      this.showShareMask = !this.showShareMask;
    },
     //获取用户基本信息
    async getUserInfo(){
      let res = await getUserInfo({action:'get_userinfo',user_id:this.myInfo.user_id})
      let data = res.data.data
      this.userData = data
    },
  
  }
};
</script>
<style lang="less" scope>
.info-box {
  margin: 6px 15px;
  padding: 6px 15px;
  .t-b {
    display: flex;
  }
  .t-r {
    display: flex;
    align-items: center;
  }
  .u-img {
    width: 48px;
    height: 48px;
    border-radius: 48px;
    margin-right: 15px;
  }
  .c-name {
    color: #333;
    font-size: 19px;
    font-weight: 500;
  }
  .l-img {
    width: 18px;
    height: 18px;
    margin-right: 6px;
  }
  .l-txt {
    color: #666;
    font-size: 14px;
  }
  .t-x {
    width: 49px;
    height: 22.5px;
    background: #46b2ff;
    border-radius: 11.5px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    line-height: 22.5px;
  }
  .o-info {
    display: flex;
    align-items: center;
  }
  .t-m {
    margin-top: 17px;
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    .c-blue {
      color: #46b2ff;
    }
    .fs_16 {
      font-size: 16px;
    }
  }
}
.share-btn {
  width: 320px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  background-image: linear-gradient(to right, #eacda3 , #d6ae7b);
  border-radius: 28px;
  margin: 15px auto;
}
.van-tabs{
  height: 48px;
}
.mask{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.content{
  color: #fff;
  padding: 50px 30px;
  line-height: 30px;
}
</style>


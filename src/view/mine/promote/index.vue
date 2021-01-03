<template>
  <div class="container">
    <div class="info-box">
      <div class="t-b">
        <img :src="myInfo.headimgurl" class="u-img" />
        <div class="t-r">
          <div class="c-name">{{myInfo.nickname}}</div>
          <div class="o-info">
            <img src="@/assets/images/V0-s.png" class="l-img" />
            <span class="l-txt">黑金会员</span>
          </div>
        </div>
      </div>
      <div class="t-m">
        <div class>
          <span>我的奖金：</span>
          <span class="c-blue">
            <span class="fs_16">{{ myInfo.balance || '0' }}</span>元
          </span>
        </div>
        <div class="t-x" @click="doShowConfirm" :disabled="!balance">提现</div>
      </div>
    </div>
    <div class="share-btn" @click="doToggleShareMask">分享链接给更多人，领取丰厚奖金</div>
    <div class="tabs-box">
      <van-tabs v-model="action" color="#46B2FF" line-width='30' line-height='2' title-active-color='#46b2ff'>
        <van-tab title="海报推广"></van-tab>
        <van-tab title="我的团队"></van-tab>
        <van-tab title="奖金明细"></van-tab>
      </van-tabs>
      <div class="content">
        <inviteList v-show="action==0" :doShare="doToggleShareMask"></inviteList>
        <teamList v-show="action==1"></teamList>
        <fanyongList v-show="action==2"></fanyongList>
      </div>
    </div>
    <!-- <div :class="['pad-guide-share', showShareMask && 'show']">
      <div class="mask"></div>
      <div class="content" @click="doToggleShareMask">
        <span class="text">点击右上角“...”, 分享好友或朋友圈邀请好友购买车主卡，成为您的团队成员</span>
      </div>
    </div>-->
  </div>
</template>

<script>
import inviteList from "@/view/mine/components/inviteList/index";
import fanyongList from "@/view/mine/components/fanyongList/index";
import teamList from "@/view/mine/components/teamList/index";
export default {
  components: {
    inviteList,
    fanyongList,
    teamList
  },
  data() {
    return {
      action: 0,
      myInfo: {},
      showUpgrade: false, // 是否升级
      showShareMask: false,
      channelAgentApis: null,
      balance: "",
      isLoadingFinance: false,
      showWithdraw: false,
      isWithdrawing: false,
      isProcessing: false,
      showRuleModal: false,
      value: 2,
      isSet: false // 是否设置好微信分享
    };
  },
  methods: {
    doToggleShareMask() {
      this.showShareMask = !this.showShareMask;
    },
    onConfirm() {
      this.showRuleModal = false;
    },
    doShowConfirm() {
      this.getMyFinance();
      this.showWithdraw = true;
    },
    async getMyFinance() {
      this.isLoadingFinance = true;
      let res = await this.channelAgentApis.finance();
      this.isLoadingFinance = false;
      if (res.code === 200) {
        const { remain: balance } = res.data;
        this.balance = balance ? balance / 100 : 0;
      }
    },
    async doWithdraw() {
      const money = this.balance * 100;
      this.isWithdrawing = true;
      let res = await this.channelAgentApis.withdraw({ money });
      this.isWithdrawing = false;
      if (res.code === 200) {
        this.$hxui.toast.success(`已成功提现 ${money / 100}元`);
        this.showWithdraw = false;
        this.getMyFinance();
      }
    }
  },
  created() {
    document.title = "我的推广";
    this.myInfo = JSON.parse(localStorage.getItem("userInfo"));
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
  background: #ffbd3e;
  border-radius: 28px;
  margin: 15px auto;
}
.van-tabs{
  height: 48px;
}
</style>


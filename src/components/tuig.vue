<template>
  <div class="pad-agent-home">
    <div class="banner-agent-info">
      <img class="bg-banner" src="../assets/images/bg-extension-short.png" alt="">
      <!-- <img class="img-vip" src="@/assets/icon-extension-vip.png" alt=""> -->
      <div class="pad-user-info">
        <img :src="myInfo.headimgurl" alt="" class="avatar">
        <div class="pad-name">
          <span class="text-nickname" v-text="myInfo.nickname"></span>
        </div>
      </div>
      <div class="row">
        <span class="text">
          我的奖金： <strong>{{ myInfo.balance || '0'  }}</strong>元
        </span>
        <button class="btn-upgrade"
          @click="doShowConfirm"
          :disabled="!balance">提现
        </button>
      </div>     
      <button class="btn-link">
        <span class="desc">分享购卡链接给更多人，领取丰厚奖金</span>
        <span class="tag" @click="doToggleShareMask">分享</span>
      </button>
    </div>
    <div class="pad-tabbar-options">
      <div class="hx-tabbar">
        <div class="item" @click="action=0" :class="action==0?'selected':''">我的推广</div>
        <div class="item" @click="action=1" :class="action==1?'selected':''">奖金明细</div>
      </div>
    </div>
    <div class="pad-main-content">
      <inviteList v-show="action==0" :doShare="doToggleShareMask"></inviteList> 
      <fanyongList v-show="action==1"></fanyongList> 
    </div>

    <div :class="['pad-guide-share', showShareMask && 'show']" >
      <div class="mask"></div>
      <div class="content" @click="doToggleShareMask">
        <!-- <img class="icon-guide" src="@/assets/vip/icon-guide-right.png" alt=""> -->
        <span class="text">
          点击右上角“...”, 分享好友或朋友圈邀请好友购买车主卡，成为您的团队成员
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import inviteList from './inviteList'
import fanyongList from './fanyongList'
export default {
  components: {
    inviteList,
    fanyongList
  },
  data () {
    return {
      action:0,
      myInfo:{},
      showUpgrade: false, // 是否升级
      showShareMask: false,
      channelAgentApis: null,
      balance: '',
      isLoadingFinance: false,
      showWithdraw: false,
      isWithdrawing: false,
      isProcessing: false,
      showRuleModal: false,
      value: 2,
      isSet: false // 是否设置好微信分享
    }
  },
  methods: {
    doToggleShareMask () {
      this.showShareMask = !this.showShareMask
    },
    onConfirm () { 
      this.showRuleModal = false
    },
    doShowConfirm () {
      this.getMyFinance()
      this.showWithdraw = true
    },
    async getMyFinance () {
      this.isLoadingFinance = true
      let res = await this.channelAgentApis.finance()
      this.isLoadingFinance = false
      if (res.code === 200) {
        const { remain: balance } = res.data
        this.balance = balance ? balance / 100 : 0
      }
    },
    async doWithdraw () {
      const money = this.balance * 100 
      this.isWithdrawing = true
      let res = await this.channelAgentApis.withdraw({ money })
      this.isWithdrawing = false
      if (res.code === 200) {
        this.$hxui.toast.success(`已成功提现 ${money / 100}元`)
        this.showWithdraw = false
        this.getMyFinance()
      }
    }
  },
  created () {
    document.title = '我的推广'
    this.myInfo = JSON.parse(localStorage.getItem('userInfo'))
  },
  mounted () {
  }
}
</script>
<style lang="less">
.pad-agent-home {
  height: 100%;
  width: 100%;
  display: block;
  overflow-y: auto;
}
.banner-agent-info {
  display: block;
  width: 100%;
  height: 43vw;
  padding: 3vw;
  position: relative;
  box-sizing: border-box;
}
.banner-agent-info.proxy {
    height: 58vw;
}
.banner-agent-info .bg-banner {
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}
.banner-agent-info .img-vip {
    width: 32%;
    height: auto;
    position: absolute;
    top: 0;
    right: 0;
}
.banner-agent-info .pad-user-info {
    z-index: 1;
    position: relative;
}
.banner-agent-info .pad-user-info .avatar {
      height: 12vw;
      width: 12vw;
      border-radius: 12vw;
      border: 2px solid white;
}
.banner-agent-info .pad-user-info .pad-name {
      vertical-align: top;
      height: 12vw;
      display: -webkit-inline-box;
      display: -ms-inline-flexbox;
      display: inline-flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
              flex-direction: column;
      -webkit-box-pack: justify;
          -ms-flex-pack: justify;
              justify-content: space-between;
      margin-left: 3vw;
}
.banner-agent-info .pad-user-info .pad-name .text-nickname {
        font-size: 3.8vw;
        display: block;
        padding-left: 1vw;
        padding-top: 5vw;
}
.banner-agent-info .pad-user-info .pad-name .text-member-ship {
        font-size: 2.8vw;
        padding: 0 1vw;
        height: 5vw;
        width: 15vw;
        color: white;
        font-weight: 600;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
        border-radius: 5vw;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        background-color: #f9a037;
        background: -webkit-gradient(linear, left top, right top, from(#fbc961), to(#f9a037));
        background: linear-gradient(90deg, #fbc961, #f9a037);
        -webkit-box-shadow: 0 1vw 1vw rgba(0, 0, 0, 0.05);
                box-shadow: 0 1vw 1vw rgba(0, 0, 0, 0.05);
}
.banner-agent-info .pad-user-info .icon-vip {
      height: 2.8vw;
      width: auto;
      margin-right: 1vw;
}
.banner-agent-info .row {
    display: block;
    width: 100%;
    margin-top: 1.6vw;
}
.banner-agent-info .row .text, .banner-agent-info .row .desc {
      height: 7vw;
      line-height: 7vw;
      display: inline-block;
      font-size: 3.8vw;
}
.banner-agent-info .row .text strong, .banner-agent-info .row .desc strong {
        font-size: 5vw;
}
.banner-agent-info .row .text {
      color: #ac691a;
}
.banner-agent-info .row .desc {
      color: #747474;
}
.banner-agent-info .row .icon-mark {
      height: 3.8vw;
      width: 3.8vw;
      float: right;
      top: 1.6vw;
      position: relative;
      pointer-events: all;
}
.banner-agent-info .btn-upgrade {
    height: 7vw;
    padding: 0 4vw;
    border-radius: 14vw;
    color: white;
    font-size: 3.8vw;
    background-color: #f9a037;
    background: -webkit-gradient(linear, left top, right top, from(#fbc961), to(#f9a037));
    background: linear-gradient(90deg, #fbc961, #f9a037);
    float: right;
}
.banner-agent-info .btn-upgrade:disabled {
      background: none;
      background-color: #ddd;
      color: #aaa;
}
.banner-agent-info .btn-link {
    height: 12vw;
    position: absolute;
    bottom: 0.5vw;
    left: 3vw;
    z-index: 10;
    -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    width: calc(100% - 6vw);
    border-radius: 14vw;
    font-size: 3.8vw;
    color: white;
    background-color: #f9a037;
    background: linear-gradient(145deg, #f0c172, #d8a663);
    text-align: left;
    padding: 0 3vw;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
}
.banner-agent-info .btn-link .tag {
      padding: 1vw 4vw;
      background-color: #bd8237;
      border-radius: 14vw;
}
.pad-tabbar-options {
  display: block;
  text-align: center;
  margin-top: 3vw;
}
.pad-binded {
  text-align: center;
}
.pad-binded .img-qrcode, .pad-binded .icon-coin {
    display: block;
    margin: 0 auto 1vw;
}
.pad-binded .icon-coin {
    height: 21vw;
    width: 21vw;
    margin: 7vw auto 3vw;
}
.pad-binded .text-amount {
    margin-bottom: 5vw;
    color: #000;
    position: relative;
    font-size: 40px;
    font-weight: 500;
}
.pad-binded .text-amount::before {
      position: absolute;
      content: "\FFE5";
      left: -5vw;
      font-size: 5vw;
      bottom: 1vw;
      font-weight: 300;
}
.pad-binded .text-tip {
    font-size: 3.8vw;
    font-weight: 300;
    color: #747474;
}
.pad-tabbar-options {
  display: block;
  text-align: center;
  margin-top: 3vw;
}
.pad-binded {
  text-align: center;
}
.pad-binded .img-qrcode, .pad-binded .icon-coin {
    display: block;
    margin: 0 auto 1vw;
}
.pad-binded .icon-coin {
    height: 21vw;
    width: 21vw;
    margin: 7vw auto 3vw;
}
.pad-binded .text-amount {
    margin-bottom: 5vw;
    color: #000;
    position: relative;
    font-size: 40px;
    font-weight: 500;
}
.pad-binded .text-amount::before {
      position: absolute;
      content: "\FFE5";
      left: -5vw;
      font-size: 5vw;
      bottom: 1vw;
      font-weight: 300;
}
.pad-binded .text-tip {
    font-size: 3.8vw;
    font-weight: 300;
    color: #747474;
}
.pad-upgrade-modal {
  padding: 5vw;
}
.pad-upgrade-modal h2 {
    margin-top: 3vw;
    margin-bottom: 8vw;
}
.pad-upgrade-modal h4 {
    margin: 3vw 0;
}
.pad-upgrade-modal .tips {
    font-size: 3.8vw;
    color: #aaa;
    margin-top: 7vw;
    display: block;
}
.pad-upgrade-modal .btn-dial {
    display: block;
    padding: 3vw;
    background-color: #f9a037;
    background: -webkit-gradient(linear, left top, right top, from(#fbc961), to(#f9a037));
    background: linear-gradient(90deg, #fbc961, #f9a037);
    color: white;
    text-align: center;
    margin-top: 7vw;
    border-radius: 1vw;
}
.hx-tabbar {
  height: 12vw;
  overflow: hidden;
  display: inline-block;
  position: relative;
}
.hx-tabbar .item {
    padding: 0 5vw;
    height: 12vw;
    line-height: 12vw;
    display: inline-block;
    font-size: 4.3vw;
    cursor: default;
    position: relative;
    z-index: 2;
    -webkit-transition: color .4s;
    transition: color .4s;
    color: #888;
}
.hx-tabbar .item.selected {
      color: #000;
      font-weight: bold;
}
.hx-tabbar .item.selected:hover {
        color: #000;
        font-weight: bold;
}
.hx-tabbar .move-item {
    z-index: 0;
    position: absolute;
    bottom: 0;
    height: 100%;
    -webkit-transition: left .4s;
    transition: left .4s;
    display: block;
}
.hx-tabbar .move-item::after {
      content: '';
      width: 45%;
      height: .8vw;
      background-color: #FFBC00;
      position: absolute;
      bottom: 0;
      left: 50%;
      -webkit-transform: translateX(-50%);
              transform: translateX(-50%);
}

.pad-article[data-v-974f03cc] {
  font-size: 14px;
  color: #636363;
  padding: 16px 16px 60px;
  text-align: justify;
  line-height: 1.8;
  height: 80vh;
  display: block;
  overflow: auto;
}
.pad-article h2[data-v-974f03cc] {
    text-align: center;
    color: #000;
}
.text-center[data-v-974f03cc] {
  text-align: center;
  line-height: 2;
  display: block;
  margin: 3vw 0;
}
.pad-footer[data-v-974f03cc] {
  display: block;
  text-align: center;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 12px 0 8px;
  background-color: rgba(255, 255, 255, 0.8);
}
.pad-guide-share {
  height: 100%;
  width: 100%;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: fixed;
  opacity: .0;
  visibility: hidden;
  -webkit-transition: all .4s;
  transition: all .4s;
  z-index: 100;
}
.pad-guide-share.show {
    opacity: 1.0;
    visibility: visible;
}
.pad-guide-share .mask {
    height: 100%;
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background-color: rgba(0, 0, 0, 0.75);
}
.pad-guide-share .content {
    z-index: 10;
    position: relative;
    height: 100%;
}
.pad-guide-share .content .icon-guide {
      width: 20%;
      position: absolute;
      top: 3vw;
      right: 4vw;
}
.pad-guide-share .content .text {
      width: 62%;
      display: block;
      text-align: justify;
      position: absolute;
      line-height: 2;
      color: white;
      right: 23%;
      top: 15%;
      font-size: 4.3vw;
}
.pad-main-content{
  display: block;
    height: 67%;
    width: 100%;
    position: relative;
    left: -5vw;
}
</style>


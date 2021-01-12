<template>
  <div>
    <div class="main">
      <div class="bg-blue"></div>
      <div class="center_box">
        <div class="car_box">
          <img :src='"@/assets/images/bg_" + userData.user_level + ".png"' alt class="car_img" />
          <div class="user-box">
            <img :src="userData.headimgurl" class="car_header" v-if="userData.headimgurl" />
            <img src="@/assets/images/headImg.jpg" class="car_header" v-else />
            <span class="c-name">{{userData.nickname}}</span>
            <img :src='"@/assets/images/V" + userData.user_level + "-s.png"' class="l-img" />
            <span class="l-txt">
              <span v-if="userData.user_level == 1">普通会员</span>
              <span v-else-if="userData.user_level == 2">VIP会员</span>
              <span v-else-if="userData.user_level == 3">服务商</span>
              <span v-else-if="userData.user_level == 4">金牌服务商</span>
              <span v-else-if="userData.user_level == 5">分公司服务商</span>
            </span>
          </div>
        </div>
        <!-- 会员基本信息 -->
        <div class="i-box">
          <div class="i-data">
            <div class="i-item">
              <div class="c-green">
                <span class="fs-12">￥</span>
                <span class="fs-18">{{userData.oil_money}}</span>
              </div>
              <div class="mt-6">加油金</div>
            </div>
            <div class="i-item">
              <div class="c-yellow fs-18">{{userData.coupon_total}}</div>
              <div class="mt-6">优惠券(张)</div>
            </div>
          </div>
          <div class="i-mem mt-10">
            <div>余额 {{userData.balance}}</div>
            <div class="add-mem" @click="doShowConfirm" :disabled="!userData.balance">提现</div>
          </div>
          <div class="i-mem" v-if='userData.user_level == 2' @click='toXufei'>
            <div>会员卡有效期至 {{userData.member_time}}</div>
            <div class="add-mem">续费</div>
          </div>
          <div class="i-mem" v-else-if='userData.user_level == 1' @click='toXufei'>
            <div>开通为会员</div>
            <div class="add-mem">开通</div>
          </div>
        </div>
        <div class="i-mem">
          <div class="item_name">我的邀请码</div>
          <p class="c-code">{{inviteCode}}</p>
        </div>
        <div class="m-list">
          <div class="m-item f_row">
            <div class="m-l">
              <img src="@/assets/images/mine-03.png" class="m-i1" />
              <span class="ml_20">我的手机号</span>
            </div>
            <div v-if="userInfo.phone">{{userInfo.phone | phoneFilter}}</div>
            <div @click="openPhone" v-else>
              <span>绑定手机号</span>
              <van-icon name="arrow"/>
            </div>
          </div>
          <div class="m-item f_row">
            <div class="m-l">
              <img src="@/assets/images/mine-02.png" class="m-i2" />
              <span class="ml_20">我的加油银行卡</span>
            </div>
            <van-icon name="arrow" />
          </div>
          <router-link to="promote" class="m-item f_row">
            <div class="m-l">
              <img src="@/assets/images/mine-01.png" class="m-i2" />
              <span class="ml_20">我的推广</span>
            </div>
            <van-icon name="arrow" />
          </router-link>
        </div>
        <div class="car_list">
          <div class="item_text">我的订单</div>
          <router-link to="jyorder1" class="car_item">
            <div class="f_row f_r_cnt">
              <img src="@/assets/images/item_icon2.png" alt class="item_img" />
              <div>
                <div class="item_name">加油订单</div>
                <div class="item_tips">9折加油，全国10000+合作加油站</div>
              </div>
            </div>
            <van-icon name="arrow" />
          </router-link>
          <router-link to="xcorder1" class="car_item">
            <div class="f_row f_r_cnt">
              <img src="@/assets/images/item_icon3.png" alt class="item_img" />
              <div>
                <div class="item_name">洗车订单</div>
                <div class="item_tips">全国60000+门店通用</div>
              </div>
            </div>
            <van-icon name="arrow" />
          </router-link>
        </div>
      </div>
    </div>
    <Tab></Tab>
    <!-- 绑定手机号 -->
    <Bindphone @closepop="closePhone" v-show="phoneShow"></Bindphone>
  </div>
</template>
<script>
import { getUserInfo } from "@/api/mine";
import Bindphone from "@/components/bindPhone";
import Tab from "@/components/tabs"
export default {
  components: {
    Bindphone,
    Tab
  },
  data() {
    return {
      phoneShow: false,
      inviteCode: "",
      userInfo: {},
      userData:{},
      showWithdraw:false,
      isLoadingFinance:false,
      channelAgentApis:''
    };
  },
  filters:{
    phoneFilter(val){
      let reg = /^(.{3}).*(.{4})$/
      return val.replace(reg,'$1****$2')
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.inviteCode = this.userInfo.invite_code;
    this.getUserInfo()
  },
  methods: {
    // 打开手机绑定
    openPhone() {
      this.phoneShow = true;
    },
    //获取用户基本信息
    async getUserInfo(){
      let res = await getUserInfo({action:'get_userinfo',user_id:this.userInfo.user_id})
      let data = res.data.data
      this.userData = data
    },
    // 关闭手机绑定
    closePhone() {
      this.phoneShow = false;
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
    },
    //跳转到续费页面
    toXufei(){
      this.$router.push('/xufei');
    }
  }
};
</script>
<style scoped>
.mt-10{
  margin-bottom: 10px;
}
.bg-blue {
  position: absolute;
  left: 0;
  top: 0;
  background: #f1fcff;
  height: 265px;
  width: 100%;
}
.main {
  margin-bottom: 120px;
}
.center_box {
  padding: 10px 15px;
  position: relative;
}
.car_box {
  position: relative;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.i-box {
  margin: 15px 0;
  border-radius: 10px;
}

.i-data {
  display: flex;
  position: relative;
  background: #fff;
}

.i-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 62px;
  justify-content: center;
  color: #333;
  font-size: 14px;
  flex: 1;
  margin: 12px 0;
  border-right: 1.5px solid #fafafa;
}

.i-item:last-child {
  border: none;
}

.i-mem {
  height: 48px;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding: 0 15px 0 22.5px;
  background: #f1fcff;
  border-radius: 0 0 10px 10px;
}

.add-mem {
  width: 49px;
  height: 22.5px;
  background: #46b2ff;
  border-radius: 11.5px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 22.5px;
}

.mt-6 {
  margin-top: 6px;
}

.fs-12 {
  font-size: 12px;
}

.fs-18 {
  font-size: 18px;
  font-weight: bold;
}
.c-green {
  color: #44be3e;
}
.c-red {
  color: #fa4c42;
}
.c-yellow {
  color: #ffbe3e;
}

.c-code {
  font-size: 16px;
  margin-right: 30px;
  color: #333;
}

.m-list {
  margin-top: 13.5px;
  border-radius: 10px;
  padding: 0 16px;
  box-shadow: 0 1.5px 4.5px 0 rgba(107, 215, 241, 0.19);
}

.f_row {
  display: flex;
}

.m-item {
  height: 45px;
  justify-content: space-between;
  align-items: center;
  color: #333;
  font-size: 14px;
}

.m-l {
  display: flex;
  align-items: center;
}

.ml_20 {
  margin-left: 20px;
}

.car_img {
  width: 345px;
  height: 190px;
  border-radius: 10px;
}
.user-box{
  position: absolute;
  top:0;
  left: 0;
  padding: 10px;
  z-index:10;
  display: flex;
  align-items: center;
  color: #000;
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
.car_header {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 40px;
}
.car_list {
  margin-top: 9px;
}
.car_item {
  display: flex;
  height: 72px;
  padding: 0 10px;
  justify-content: space-between;
  border-radius: 10px;
  align-items: center;
  margin-top: 15px;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 1.5px 4.5px 0 rgba(107, 215, 241, 0.19);
}

.f_r_cnt {
  align-items: center;
}

.item_img {
  height: 35px;
  margin-right: 14px;
}
.m-i1{
  width: 16.5px;
  height: 25px;
}
.m-i2 {
  width: 22.5px;
  height: 18px;
}
.item_text {
  height: 48px;
  color: #333;
  line-height: 48px;
}
.item_name {
  color: #333;
  font-size: 14px;
}
.item_tips {
  font-size: 11px;
  color: #666;
  margin-top: 4px;
}
</style>
<template>
  <div>
    <div class="main">
      <div class="bg-blue"></div>
      <div class="center_box">
        <div class="car_box">
          <img src="@/assets/images/w_car.jpg" alt class="car_img" />
          <img :src="userInfo.headimgurl" alt class="car_header" />
        </div>
        <!-- 会员基本信息 -->
        <div class="i-box">
          <div class="i-data">
            <div class="i-item">
              <div class="c-green">
                <span class="fs-12">￥</span>
                <span class="fs-18">99.99</span>
              </div>
              <div class="mt-6">加油金</div>
            </div>
            <div class="i-item">
              <div class="c-red">
                <span class="fs-12">￥</span>
                <span class="fs-18">1990.99</span>
              </div>
              <div class="mt-6">余额</div>
            </div>
            <div class="i-item">
              <div class="c-yellow fs-18">10</div>
              <div class="mt-6">优惠券(张)</div>
            </div>
          </div>
          <div class="i-mem">
            <div>会员卡有效期至 2021/10/20</div>
            <div class="add-mem">续费</div>
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
            <van-icon name="arrow" />
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
import { api } from "@/api/api";
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
      userInfo: {}
    };
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.inviteCode = this.userInfo.invite_code;
  },
  methods: {
    // 打开手机绑定
    openPhone() {
      this.phoneShow = true;
    },
    // 关闭手机绑定
    closePhone() {
      this.phoneShow = false;
    }
  }
};
</script>
<style scoped>
.bg-blue {
  position: absolute;
  left: 0;
  top: 0;
  background: #f1fcff;
  height: 265px;
  width: 100%;
}
.main {
  margin-bottom: 60px;
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
  display: block;
  width: 100%;
  border-radius: 10px;
}
.car_header {
  position: absolute;
  width: 10vh;
  height: 10vh;
  border-radius: 50%;
  right: 10%;
  top: 15%;
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
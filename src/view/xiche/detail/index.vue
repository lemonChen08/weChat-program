<template>
  <div class="details_box">
    <div class="list_item">
      <div class="ls_top flexbox">
        <div class="ls_l">
          <img :src="xcDetail.shop_img" alt class="ls_img" />
          <!-- 如果休息中显示 -->
          <div class="if_stop" v-show="!xcDetail.is_open">
            <span>休息中</span>
            <span>营业时间</span>
            <span>{{xcDetail.start_opentime}}--{{xcDetail.end_opentime}}</span>
          </div>
        </div>
        <div class="ls_m">
          <div class="flexbox f_jc_sb">
            <span class="p_name">{{xcDetail.shop_name}}</span>
          </div>
          <div class="p_cord flexbox">
            <div class="rank">{{xcDetail.score}}</div>
            <div class="sale">已售 {{xcDetail.total_num}}</div>
          </div>
        </div>
      </div>
      <div class="ls_bot flexbox">
        <van-icon name="location-o" />
        <div class="d_name">{{xcDetail.shop_address}}</div>
      </div>
    </div>
    <div class="dt_top" v-if="!parseInt(xcDetail.isOpen) && parseInt(xcDetail.isStatus) === 4">
      <div class="dt_time">营业时间 {{ xcDetail.openTimeStart }}-{{ xcDetail.openTimeEnd }}</div>
      <div class="dt_name">{{xcDetail.shop_name}}</div>
      <div class="dt_adress flexbox">
        <img src="@/assets/images/icon-address.png" alt class="dt_img" />
        <div class="dt_text">{{xcDetail.shop_address}}</div>
        <button class="dt_btn flexbox" v-show="false">
          <img src="@/assets/images/icon-nav-white.png" alt />
          一键导航
        </button>
      </div>
    </div>
    <div class="dt_mid">
      <div class="s-box">
        <p class="tit">门店服务</p>
        <div class="s-list">
          <span class="s-item">洗车</span>
          <span class="s-item">保养</span>
        </div>
      </div>
      <div class="t-box">
        <p class="tit">选择类型</p>
        <div
          class="dt_item flexbox"
          v-for="(item,key) in services"
          @click="checkFuntion(item,key)"
          :key="key"
        >
          <div class="dt_check">
            <div class="no_chek" :class="{checked: key==n}"></div>
          </div>
          <div class="dt_cont">
            <div class="dm_name">{{item.service_name}}</div>
          </div>
          <div class="dt_pay">
            <del class="t_price">￥{{item.price}}</del>
            <div class="f_price">￥{{item.final_price}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="dt_bot flexbox">
      <div class="bot_left">
        <div class="bot_t flexbox">
          <div class="b_price">￥{{current.final_price}}</div>
          <del class="t_price">￥{{current.price}}</del>
        </div>
        <div class="bot_f">{{current.service_name}}</div>
      </div>
      <div class="bot_right flexbox">
        <button
          class="btn-main"
          @click="doCreateOrder"
          :disabled="isProcessing"
          v-text="isProcessing ? '结算中' : '去结算'"
        ></button>
      </div>
    </div>
    <Bindphone @closepop="closePhone" v-show="showBindPhone"></Bindphone>
  </div>
</template>
<script>
import { xcpayorders, getxcPayConfig } from "@/api/wx";
import { api } from "@/api/api";
import Bindphone from "@/components/bindPhone";
import { WXinvoke } from "@/util/wxUtil";
export default {
  components: {
    Bindphone
  },
  data() {
    return {
      showBindPhone: false,
      isProcessing: false,
      xcDetail: {},
      images: [],
      services: [],
      current: {},
      n: null,
      phone: null
    };
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.myInfo = userInfo;
    this.getXcDetail();
  },
  methods: {
    // 关闭手机绑定
    closePhone() {
      this.showBindPhone = false;
    },
    checkFuntion(item, key) {
      this.price = item.finalPrice;
      this.current = item;
      this.n = key;
    },
    async getXcDetail() {
      let res = await api.storesDetail({
        action: "get_shopinfo",
        phone: this.myInfo.phone,
        shopId: this.$route.query.shopId
      });
      if (res.data.code == 200) {
        this.xcDetail = res.data.result;
        this.services = res.data.result.service_list;
        this.checkFuntion(this.services[0], 0);
      } else if (res.data.code == 100) {
        localStorage.clear();
        window.location.reload();
      } else {
        this.$layer.msg(res.data.message);
      }
    },
    doCreateOrder() {
      let that = this;
      const bundle = {
        action: "order_save",
        phone: this.myInfo.phone,
        shop_name: this.xcDetail.shop_name,
        shopId: this.xcDetail.id,
        price: this.current.price,
        final_price: this.current.final_price,
        serviceId: this.current.id
      };
      this.isProcessing = true;
      xcpayorders(bundle).then(res => {
        if (res.data.code == 200) {
          let configdata = {
            order_id: res.data.result.order_id,
            user_id: this.myInfo.user_id
          };
          getxcPayConfig(configdata).then(result => {
            WXinvoke(result, response => {
              if (response.err_msg == "get_brand_wcpay_request:ok") {
                this.isProcessing = false;
                this.$layer.msg("支付成功");
                this.isPay = true;
                this.$router.push({ path: "/xcorder1", query: {} });
              } else {
                this.$router.push({
                  path: "/xcorder",
                  query: { payData: JSON.stringify(bundle) }
                });
              }
            });
          });
        } else {
          that.$layer.msg("下单失败");
        }
      });
    }
  }
};
</script>
<style scoped lang='less'>
.flexbox {
  display: flex;
}
.if_stop {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-display: flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  justify-content: center;
  line-height: 1.2;
  align-items: center;
}
.if_stop span {
  font-size: 12px;
}
.ls_m {
  flex: 1;
}
.p_name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}
.p_cord {
  margin-top: 10px;
  -webkit-align-items: center;
  align-items: center;
}
.rank {
  font-size: 12px;
  color: #fff;
  padding: 3px 6px;
  border-radius: 3px;
  background: #ffbc00;
}
.sale {
  font-size: 12px;
  color: #747474;
  margin-left: 5px;
}
.ls_bot {
  margin-top: 10px;
  -webkit-align-items: center;
  align-items: center;
}
.d_name {
  font-size: 12px;
  color: #747474;
  margin-left: 10px;
  margin-right: 20px;
}
.list_item {
  margin: 15px;
  padding: 15px;
  box-shadow: 0 1.5px 4.5px 0 rgba(107, 215, 241, 0.19);
  border-radius: 10px;
  .ls_img {
    width: 40px;
    height: 40px;
    border-radius: 2.5px;
    margin-right: 10px;
  }
}
.dt_top {
  background: #fff;
  position: relative;
  z-index: 5;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  margin: -5vh 4% 0;
  padding: 3% 4%;
}
.dt_time {
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  height: 4vh;
  line-height: 4vh;
  border-radius: 5px;
  top: -4vh;
  left: 0;
  font-size: 12px;
  color: #fff;
  padding: 0 15px;
}
.dt_name {
  font-size: 2.2vh;
  color: #000;
}
.dt_adress {
  margin-top: 10px;
  -webkit-align-items: center;
  align-items: center;
}
.dt_img {
  height: 3.5vw;
}
.dt_text {
  margin-left: 1vw;
  margin-right: 3vw;
  -webkit-flex: 1;
  flex: 1;
  font-size: 12px;
  color: #aaa;
}
.dt_btn {
  -webkit-align-items: center;
  align-items: center;
  font-size: 12px;
  color: #fff;
  border-radius: 5px;
  padding: 5px;
  background-color: #ff8d0a;
}
.dt_btn img {
  height: 4vw;
  margin-right: 5px;
}
.dt_mid {
  padding: 0 15px;
  margin-top: 15px;
  .tit {
    height: 48px;
    color: #333;
    font-weight: 500;
    font-size: 15px;
    line-height: 48px;
  }
  .s-list {
    display: flex;
    margin: 7.5px 0 22.5px;
    .s-item {
      display: inline-block;
      width: 93px;
      height: 33px;
      line-height: 33px;
      text-align: center;
      margin-right: 15px;
      font-size: 13px;
      color: #666;
      font-weight: 500;
      border-radius: 2.5px;
      border: 1px solid #aaaaaa;
    }
    .s-item.active {
      border-color: #46b2ff;
      color:#46b2ff;
      background: #F1FCFF;
    }
  }
}
.dt_title {
  font-size: 2.5vh;
  line-height: 6vh;
  border-bottom: 1px solid #ececec;
}
.dt_title span {
  font-size: 2vh;
  color: #aaa;
  margin-right: 10px;
}
.dt_item {
  height: 48px;
  align-items: center;
}
.dt_check {
  position: relative;
}
.dt_item img {
  width: 5.5vw;
  height: 5.5vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
.dt_pay {
  display: flex;
  align-items: center;
}
.no_chek {
  width: 16px;
  height: 16px;
  border: 1px solid #666;
  border-radius: 50%;
}
.checked{
  border-color: #46b2ff;
  background: #46b2ff;
  position: relative;
}
.checked::after{
  position: absolute;
  content: '';
  width: 8px;
  height: 4px;
  border:2px solid #fff;
  border-width: 0 0 2px 2px;
  left: 3px;
  top:3px;
  transform: rotate(-45deg);
}
.dt_cont {
  margin-left: 3vw;
  margin-right: 3vw;
  -webkit-flex: 1;
  flex: 1;
}
.dm_name {
  font-size: 2.2vh;
}
.dm_text {
  font-size: 1.8vh;
  color: #aaa;
  margin-top: 2vw;
}
.f_price {
  font-size: 14px;
  color: #fa4c42;
  font-weight: bold;
  margin-left: 13px;
}
.t_price {
  color: #666;
  font-size: 13px;
}
.dt_bot {
  position: fixed;
  width: 100%;
  background-color: #fff;
  height: 15vw;
  bottom: 0;
  left: 0;
  border-top: 1px solid #ececec;
  padding: 0 4%;
  box-sizing: border-box;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
.bot_t{
  align-items: center;
}
.b_price {
  font-size:20px;
  color: #FA4C42;
}
.t_price {
  font-size:11px;
  color: #666;
  margin-left: 4px;
}
.bot_f {
  font-size: 1.8vh;
  color: #aaa;
  margin-top: 2vw;
}
.bot_right {
  -webkit-align-items: center;
  align-items: center;
}

.bot_right button {
  width: 220px;
  height: 33px;
  background: #46b2ff;
  border: 1px solid #46b2ff;
  border-radius: 32px;
  text-align: center;
  line-height: 33px;
  color: #fff;
  font-weight: 500;
  font-size: 15px;
}
</style>
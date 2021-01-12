<template>
  <div class="pad-gas-station">
    <div class="b-info" v-if="!isLoading">
      <div class="t-info">
        <img class="c-img" :src="item.gas_logo_big || item.gas_logo_small" />
        <div class="r-info">
          <div class="c-name">{{item.gas_name}}</div>
          <div class="c-price">
            <span class="o-price">{{ selectInfo.discount_price }}</span>
            <span class="n-price">{{ selectInfo.official_price }}</span>
          </div>
        </div>
      </div>
      <div class="add-info">
        <van-icon name="location-o" />
        <span>{{item.gas_address}}</span>
      </div>
    </div>
    <div class="s-box">
      <section class="s-item">
        <label class="l-tit">选择类型</label>
        <div class="s-i">
          <van-radio-group v-model="selectInfo.oilType">
            <van-radio
              v-for="type in oilTypes"
              :key="type.value"
              :name="type.value"
              @click="doSelectOilType(type.value)"
            >{{type.key}}</van-radio>
          </van-radio-group>
        </div>
      </section>
      <section class="s-item">
        <label class="l-tit">选择油号</label>
        <div class="s-i">
          <span
            class="s-option"
            v-for="oilItem in item.oilList"
            :key="oilItem.id"
            v-show="oilItem.oil_type==selectInfo.oilType"
            :class="selectInfo.oil_no==oilItem.oil_name?'selected':''"
            @click="doSelectOilNumber(oilItem)"
          >{{oilItem.oil_name}}</span>
        </div>
      </section>
      <section class="s-item">
        <label class="l-tit">选择枪号</label>
        <div class="s-i">
          <span
            class="s-option"
            v-for="(gunNo, idx) in gunNumbers"
            :key="idx"
            :class="selectInfo.gunNumber==gunNo?'selected':''"
            @click="doSelectGunNumber(gunNo)"
          >{{gunNo}}号</span>
        </div>
      </section>
      <section class="s-item" v-if="selectInfo.gunNumber">
        <label class="l-tit">输入金额</label>
        <input
          class="ipt_num"
          type="number"
          v-model="price"
          @focus="doScrollBottom"
          @input="onInput"
          placeholder-style="color:#FA4C42;"
          placeholder="请输入金额"
        />
        <div class="pad-default-options">
          <div
            class="pad-default-option"
            :class="{selected : price === opt }"
            v-for="(opt, idx) in options"
            :key="idx"
            @click="doInput(opt)"
          >
            ￥
            {{ opt }}
          </div>
        </div>
      </section>
    </div>
    <div class="fix-btn" v-if="selectInfo.gunNumber">
      <div class="l-box">
        <span>￥{{price}}</span>
        <span v-if="benefit" class="b-txt">按油价已优惠{{benefit}}元</span>
      </div>
      <div class="r-box">
        <div class="g-button" :disabled="!price || isProcessing">
          <div v-if="!isProcessing && price && myInfo.phone && !isPay" @click="checkPhone">
            确认支付
            <span style="font-size: 5vw;">{{ finalPayPrice }}</span> 元
          </div>
          <span v-if="!price">请先输入加油金额</span>
          <span v-if="isProcessing">正在支付中</span>
          <span v-if="isPay">
            <router-link to="home">返回首页</router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { payorders, getPayConfig } from "@/api/wx";
import { api } from "@/api/api";
import {
  GasStationSource,
  GhyyOrderStatuses,
  oilTypeArray
} from "@/util/const";
import { WXinvoke } from "@/util/wxUtil";
export default {
  data() {
    return {
      showAuth: false,
      equityBind: false,
      equity_points: 0,
      searchInfo: {},
      isSelect: false,
      discountId: "",
      discountTitle: "选择优惠券 ▶",
      CouponDetail: {
        channel: {
          name: ""
        }
      },
      isBag: true,
      isUse: false,
      showBanner: false,
      showDiscount: false,
      list: [],
      ghyyRechargeSwitch: 0,
      scrollElement: ".pad-gas-station",
      showBindPhone: false,
      id: "",
      currentChannelId: parseInt(this.$route.query.channel_id),
      isWxReady: false,
      isProcessing: false,
      item: {},
      prices: {},
      oilTypes: [
        { value: 1, key: "汽油" },
        { value: 2, key: "柴油" },
        { value: 3, key: "天然气" }
      ],
      remain: {},
      service_fee_rate: "",
      options: [100, 200, 300, 500], // 默认金额选项
      price: null, // 准备支付的价格
      oilNumber: [], // 选中的油号
      gunNumbers: [],
      gunNumber: null, // 选中的枪号
      isLoading: false,
      isMiniProgram: window.isMiniProgram,
      myPoint: 0,
      pointPrice: 0,
      point: 0, // 使用的积分数
      discountBundle: {},
      usePoint: 0, // 使用的积分数
      bank: {
        company: null, // 银行卡所属
        cardNum: null, // 卡号
        rebate: null // 银行卡返利
      },
      isBindCard: false,
      isPay: false,
      authentication: false,
      alertObject: {},
      myInfo: {
        phone: ""
      },
      selectInfo: {
        oilType: 1,
        oil_no: this.$route.query.oil_number || "",
        gunNumber: "",
        station_price: "",
        discount_price: ""
      }
    };
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.myInfo = userInfo;
    this.getGasDetail();
  },
  computed: {
    truePrice() {
      // 计算后的总价 = 四舍五入到2位小数(输入金额 * 优惠价 / 枪价)
      let truePrice = 0;
      if (!this.selectInfo.station_price) {
        return 0;
      }
      // 当用户选择的油号的优惠价等于枪价时，最终支付的订单价格即用户输入的金额数
      truePrice = Math.round(
        ((this.price * this.selectInfo.discount_price) /
          this.selectInfo.station_price) *
          100
      );
      return truePrice / 100;
    },
    finalPayPrice() {
      // 最终展示在按钮上的金额
      const pointPrice = 0;
      let result = this.truePrice - pointPrice;
      if (this.discountBundle && this.discountBundle.threshold <= this.price) {
        result = result - this.discountBundle.money;
      }
      return result.toFixed(2);
    },
    benefit() {
      // 优惠金额
      const pointPrice = 0;
      let result = this.truePrice - pointPrice;
      return Math.round((this.price - parseFloat(result)) * 100) / 100;
    },
    amount() {
      // 加油升数
      if (isNaN(this.price)) {
        return 0;
      }
      let data = 0;
      if (!this.selectInfo.discount_price) {
        return;
      }
      data = Math.round((this.price / this.selectInfo.discount_price) * 100);
      return data / 100;
    }
  },
  methods: {
    getDiscount() {
      this.showDiscount = true;
      this.isUse = false;
      // this.requestTicket()
    },
    toLocation(item) {
      try {
        const { lat_gcj02, lng_gcj02, name, address } = item;
        // 如果是车主邦的位置使用非百度坐标系
        wechat.openLocation({
          lng: lng_gcj02,
          lat: lat_gcj02,
          name,
          address
        });
        report("加油详情", "点击", "打开导航成功");
      } catch (err) {
        console.log(err);
        report("加油详情", "点击", "打开导航失败");
      }
    },
    doSelectOilType(item) {
      this.selectInfo.oilType = item;
    },
    doSelectOilNumber(item) {
      this.selectInfo.oil_no = item.oil_name;
      this.gunNumbers = item.oils_gunNo;
      this.selectInfo.discount_price = item.discount_price;
      this.selectInfo.station_price = item.station_price;
      this.selectInfo.official_price = item.official_price;
      this.selectInfo.oil_id = item.oil_id;
    },
    doSelectGunNumber(gunNo) {
      this.selectInfo.gunNumber = gunNo;
    },
    doInput(value) {
      this.price = value;
    },
    doScrollBottom() {
      let timer = window.setTimeout(() => {
        document.body.scrollTop = document.body.scrollHeight;
        window.clearTimeout(timer);
      }, 300);
    },
    onInput() {
      if (this.price && isNaN(this.price)) {
        this.$layer.msg("请输入数字");
        this.price = "";
        return;
      }
      if (
        this.price &&
        !isNaN(this.price) &&
        (this.price > 1800 || this.price <= 0)
      ) {
        this.$layer.msg("单次充值金额在1800元内");
        this.price = this.price <= 0 ? "" : 1800;
      }
    },
    async getGasDetail() {
      let res = await api.get_station({
        action: "get_station",
        phone: this.myInfo.phone,
        gasId: this.$route.query.gasId
      });
      if (res.data.code == 200) {
        if (this.$route.query.platform_type == 2) {
          window.location.href = res.data.url;
        }
        let data = res.data.result;
        this.item = data;
        this.$_analyseOptions();
      } else if (res.data.code == 100) {
        localStorage.clear();
        window.location.reload();
      } else {
        this.$layer.msg(res.data.message);
      }
    },
    async userLogin() {
      let res = await api.get_station({
        action: "user_login",
        phone: this.myInfo.phone
      });
      if (res.data.code == 200) {
        this.getGasDetail();
      }
    },
    // 根据传入的油号获取检测站的价格信息
    getPriceByOilNumber(v, oil_numbers) {
      if (!v.prices || (v.prices && !v.prices.length)) {
        return null;
      }
      if (!oil_numbers) {
        return v.prices[0];
      }
      for (let i = 0; i < v.prices.length; i++) {
        // eslint-disable-next-line
        if (parseInt(oil_numbers) == v.prices[i].oilNo) {
          return v.prices[i];
        }
      }
      return {};
    },
    $_analyseOptions() {
      let oilTypes = [];
      const oil_number = this.$route.query.oil_number;
      if (!Array.isArray(this.item.oilList)) {
        return;
      }
      for (let oliItem of this.item.oilList) {
        console.log(oilTypes);
        console.log(oliItem);
        if (
          !this.oilTypes.filter(v => v.value === oliItem.oil_type).length &&
          oilTypes.filter(v => v.value == oliItem.oil_type).length == 0
        ) {
          let val = this.oilTypes.filter(item => {
            return item.value == oliItem.oil_type;
          });
          oilTypes.push({
            key: val[0].key,
            value: val[0].value
          });
        }
        if (oliItem.oil_name == oil_number) {
          this.doSelectOilNumber(oliItem);
        }
      }
      this.oilTypes = oilTypes; // 初始化该加油站可以选的商品类型（柴油、汽油或者天然气）
      if (!oil_number && this.oilTypes && this.oilTypes.length === 1) {
        this.selectInfo.oilType = this.oilTypes[0].value;
      }
    },
    checkPhone() {
      if (this.myInfo.phone) {
        this.toPay();
      } else {
        this.showBindPhone = true;
      }
    },
    toPay() {
      this.isProcessing = true;
      let price = this.truePrice;
      let data = {};
      if (this.$route.query.platform_type == 1) {
        data = {
          action: "order_save",
          phone: this.myInfo.phone,
          gasId: this.$route.query.gasId,
          oilId: this.selectInfo.oil_id,
          oilNo: this.selectInfo.gunNumber
        };
      } else if (this.$route.query.platform_type == 3) {
        data = {
          action: "order_save",
          phone: this.myInfo.phone,
          gasId: this.$route.query.gasId,
          oilId: this.selectInfo.oil_id,
          oilName: this.selectInfo.oil_no,
          oilNo: this.selectInfo.gunNumber,
          price: price,
          origin_price: this.price,
          discount_price: this.selectInfo.station_price,
          station_price: this.selectInfo.discount_price,
          oil_type: this.selectInfo.oilType,
          units: parseFloat(this.amount)
        };
      }
      payorders(data).then(res => {
        if (res.data.code == 200) {
          if (this.$route.query.platform_type == 1) {
            window.location.href = res.data.url;
          }
          let configdata = {
            order_id: res.data.result.order_id,
            user_id: this.myInfo.user_id
          };
          getPayConfig(configdata).then(result => {
            WXinvoke(result, response => {
              if (response.err_msg == "get_brand_wcpay_request:ok") {
                this.isProcessing = false;
                this.$toast.success("支付成功");
                this.isPay = true;
                this.$router.push("jyorder1");
              } else {
                this.$router.push({
                  path: "/jyorder",
                  query: { payData: JSON.stringify(data) }
                });
              }
            });
          });
        } else {
          this.$toast.fail(res.data.message);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.b-info {
  margin: 15px;
  padding: 15px;
  box-shadow: 0px 3px 9px 0px rgba(107, 215, 241, 0.19);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  .t-info {
    display: flex;
    .c-img {
      width: 40px;
      height: 40px;
      border-radius: 2.5px;
      margin-right: 12px;
    }
    .c-name {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 12px;
    }
    .c-price {
      display: flex;
      align-items: center;
      .o-price {
        color: #999;
        font-size: 11px;
        text-decoration: line-through;
      }
      .n-price {
        color: #fa4c42;
        font-size: 18px;
        font-weight: 500;
        margin-left: 15px;
      }
    }
  }
  .add-info {
    font-size: 11px;
    color: #666;
    font-weight: bold;
    line-height: 18px;
    margin-top: 15px;
  }
}
.s-box {
  margin: 0 15px 140px;
  .l-tit {
    height: 48px;
    color: #333;
    font-weight: 500;
    line-height: 48px;
    font-size: 15px;
    display: block;
  }
  .van-radio {
    height: 48px;
  }
  .s-i {
    display: flex;
    flex-wrap: wrap;
  }
  .s-option {
    color: #666;
    font-size: 13px;
    height: 33px;
    line-height: 33px;
    display: inline-block;
    border: 0.5px solid #aaa;
    margin: 0 15px 11px 0;
    padding: 0 20px;
  }
  .s-option.selected {
    background: #f1fcff;
    color: #46b2ff;
    border-color: #46b2ff;
  }
}
.pad-default-options {
  display: flex;
  justify-content: space-between;
}
.ipt_num {
  height: 48px;
  border: 1px solid #46b2ff;
  background: #f1fcff;
  color: #fa4c42;
  width: 100%;
  box-sizing: border-box;
  padding: 0 15px;
  margin-bottom: 15px;
}
.ipt_num::placeholder {
  color: #fa4c42;
}
.pad-default-option {
  width: 65px;
  height: 33px;
  line-height: 33px;
  text-align: center;
  border: 1px solid #aaa;
  border-radius: 2.5px;
  font-size: 14px;
  color: #666;
  font-weight: 500;
}
.selected {
  background: #f1fcff;
  border-color: #46b2ff;
}
.fix-btn {
  height: 72px;
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #cacacb;
  align-items: center;
  background: #fff;
  z-index: 10;
  justify-content: space-between;
  padding:0 24px;
  box-sizing: border-box;
}
.g-button {
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
.l-box {
  display: flex;
  flex-direction: column;
  color: #fa4c42;
  font-size: 20px;
  font-weight: 500;
}
.b-txt {
  color: #666;
  font-size: 11px;
  margin-top: 4px;
}
</style>

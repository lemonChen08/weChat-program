<template>
  <div class="pro-box">
    <div class="main">
      <!-- 轮播图 -->
      <van-swipe :autoplay="3000" class="my-swipe">
        <van-swipe-item v-for="(item, key) in bannerList" :key="key">
          <img v-lazy="item.url" />
        </van-swipe-item>
      </van-swipe>
      <!-- 首页两个项目 加油和洗车 -->
      <div class="index-box flexbox">
        <div class="f-item flexbox" @click="toXclist">
          <div class="f_col">
            <div class="f-bold">汽车养护</div>
            <div>折扣低至8折</div>
          </div>
          <img src="@/assets/images/xiche.png" class="icon" />
        </div>
        <div class="f-item flexbox" @click="toJylist">
          <div class="f_col">
            <div class="f-bold">加油</div>
            <div>折扣低至9折</div>
          </div>
          <img src="@/assets/images/jiayou.png" class="icon" />
        </div>
      </div>
      <!-- 列表 -->
      <div class="list-box">
        <div class="list-item" v-if="jyzlist.length>0">
          <div class="listtitle">
            <div class="title">附近加油站</div>
            <router-link to="jylist" class="more">更多 >></router-link>
          </div>
          <div class="ls-top flexbox" @click="routerTo(jyzlist[0])">
             <jyModel :item='jyzlist[0]'></jyModel>
          </div>
        </div>
      </div>
      <!-- 列表 -->
      <div class="list-box">
        <div class="list-item" v-if="xclist.length>0">
          <div class="listtitle">
            <div class="title">附近洗车保养</div>
            <router-link to="xclist" class="more">更多 >></router-link>
          </div>
          <div class="ls-top" @click="toxcdetail(xclist[0])">
            <div class="flexbox">
              <img :src="xclist[0].shop_img" alt class="ls-img" />
              <div class="ls-r">
                <div class="l-name">{{xclist[0].shop_name}}</div>
                <div class="l-add">
                  <van-icon name="location-o" />
                  <span>{{xclist[0].shop_address}}</span>
                </div>
                <div class="l-distance">驾车全程约{{$_toDistance(xclist[0].juli)}}公里</div>
              </div>
              <img src='@/assets/images/icon-add.png' class="add-i" />
            </div>
            <div class="xc-item">
              <span>标准洗车-SUV/MPV</span>
              <span class="x-o">￥45</span>
              <span class="x-n">
                <span class="fs-14">￥</span>35
              </span>
              <span class="buy-btn">购买</span>
            </div>
            <div class="xc-item">
              <span>手工打蜡-SUV/MPV</span>
              <span class="x-o">￥189</span>
              <span class="x-n">
                <span class="fs-14">￥</span>177
              </span>
              <span class="buy-btn">购买</span>
            </div>
          </div>
        </div>
      </div>
      <Tab></Tab>
      <Bindphone @closepop="closePhone" v-show="popShow"></Bindphone>
    </div>
  </div>
</template>
<script>
import Bindphone from "@/components/bindPhone";
import Tab from "@/components/tabs"
import jyModel from '@/components/jyModel';
import { api } from "@/api/api";
import { getLocation } from "@/util/wxUtil";
import wxShare from "@/util/wxShare";
import img1 from "@/assets/images/banner1.png";
import img2 from "@/assets/images/banner1.png";
const qs = require("qs");
export default {
  components: {
    Bindphone,
    jyModel,
    Tab
  },
  data() {
    return {
      fadePop: true,
      popShow: false,
      // 打开搜索下拉
      phoneShow: 0,
      bannerList: [
        {
          url: require("@/assets/images/banner1.png")
        },
        {
          url: require("@/assets/images/banner2.png")
        }
      ],
      // 打开搜索地址
      mapShow: false,
      xclist: [{}],
      jyzlist: [{ price: { priceYfq: 0 } }],
      list: [
        {
          img: require("@/assets/images/details_baner.jpg"),
          time: "8:00-12:00",
          name: "新业汽车美容有限公司",
          rank: "4.7分",
          sale: "2",
          dazhe: "7.6折",
          pay: "38",
          adress: "广东省深圳市龙岗区布沙路78号樟树布综合楼后侧",
          km: "0.23km"
        }
      ]
    };
  },
  created() {
    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    if (userInfo.phone == "") {
      this.popShow = true;
    }
  },
  methods: {
    routerTo(item) {
      this.$router.push({
        path: "/jydetail",
        query: {
          gasItem: JSON.stringify(item),
          gasId: item.gas_id,
          oil_number: "92",
          platform_type: item.platform_type
        }
      });
    },
    toxcdetail(item) {
      this.$router.push({
        path: "/xcdetails",
        query: {
          shopId: item.id,
          latitude: item.latitude,
          longitude: item.longitude
        }
      });
    },
    $_toDistance(distance) {
      if (!distance) {
        return "一键导航";
      }
      if (distance > 1) {
        let num = distance / 1000;
        return num.toFixed(2) + "km";
      } else {
        let num = distance / 1000;
        return num + "m";
      }
    },
    async getUserInfo() {
      let res = await api.userinfo({ code: localStorage.getItem("code") });

      if (res.data.code == 0) {
        this.getLocationFn();
        this.userinfo = res.data;
        localStorage.setItem("oneToken", res.data.data.token);
        localStorage.setItem("userInfo", JSON.stringify(res.data.data));
        if (res.data.data.firstLogin) {
          this.popShow = true;
        } else {
          this.popShow = false;
        }
      }
    },
    getUrlCode() {
      // 截取url中的code方法
      var url = location.search;
      this.winUrl = url;
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
        }
      }
      return theRequest;
    },
    // 下拉筛选
    choosetype(e) {
      if (this.phoneShow == e.target.dataset.num) {
        this.phoneShow = 0;
      } else {
        this.phoneShow = e.target.dataset.num;
      }
    },

    // 打开搜索地址
    openmapShow() {
      this.mapShow = true;
    },

    // 关闭搜索地址
    closemapShow() {
      this.mapShow = false;
    },
    async getxclist() {
      let latlon = JSON.parse(localStorage.getItem("latlon"));
      // alert(11)
      let res = await api.storesList({
        action: "get_shoplist",
        cityName: "深圳市",
        latitude: latlon.latitude,
        longitude: latlon.longitude,
        orderBy: 1,
        page: 1,
        pagesize: 15
      });
      if (res.data.code == 200) {
        this.fadePop = false;
        this.xclist = res.data.result;
      } else if (res.data.code == 401) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
      } else {
        alert(res.data.msg);
      }
    },
    async getGaslist() {
      // alert(33)
      let latlon = JSON.parse(localStorage.getItem("latlon"));
      let res = await api.get_gaslist({
        action: "get_gaslist",
        latitude: latlon.latitude,
        longitude: latlon.longitude,
        oilName: "92#",
        page: 1,
        pagesize: 15
      });
      if (res.data.code == 200) {
        // alert(44)
        this.fadePop = false;
        this.jyzlist = res.data.result;
      } else if (res.data.code == 401) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
      } else {
        alert(res.data.msg);
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
    // 打开手机绑定
    openPhone() {
      this.popShow = true;
    },
    // 关闭手机绑定
    closePhone() {
      this.popShow = false;
    },
    toJylist() {
      this.$router.replace("/jylist");
    },
    toXclist() {
      this.$router.replace("/xclist");
    },
    getLocationFn() {
      getLocation().then(data => {
        if (data && data.errMsg == "getLocation:ok") {
          localStorage.setItem("latlon", JSON.stringify(data));
          this.getGaslist();
          this.getxclist();
        } else {
          this.getLocationFn();
        }
      });
    }
  },
  mounted() {
    this.getLocationFn();
  }
};
</script>
<style scoped>
.pro-box {
  padding: 0 15px;
  font-size: 13px;
  margin-bottom: 60px;
}

.add-i{
  width:16px;
  height:16px;
  position:absolute;
  bottom: 10px;
  right: 20px;
}

.l-add {
  color: #666;
  font-size: 11px;
  font-weight: bold;
  margin-top: 10px;
}

.l-distance {
  font-size: 11px;
  color: #333;
  font-weight: bold;
  margin-top: 8px;
}

.my-swipe {
  border-radius: 16px;
}

.my-swipe .van-swipe-item {
  height: 150px;
  text-align: center;
  border-radius: 16px;
}

.index-box {
  margin: 16px 0;
  justify-content: space-between;
}

.f-item {
  width: 165px;
  color: #666;
  height: 86px;
  border-radius: 10px;
  box-shadow: 0 1.5px 4.5px 0 rgba(107, 215, 241, 0.19);
  justify-content: center;
  align-items: center;
}

.f-bold {
  color: #333;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.fadePop {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.icon {
  height: 46px;
  width: 46px;
  margin-left: 20px;
}
.flexbox {
  display: flex;
  position: relative;
}

.sear_list {
  height: 10vw;
  border-bottom: 1px solid #ececec;
}
.sr_item {
  -webkit-flex: 1;
  flex: 1;
  text-align: center;
  font-size: 2vh;
  line-height: 10vw;
}
.sr_item img {
  height: 3vw;
  margin-left: 5px;
  transition: all 0.4s;
}
.sr_item.active img {
  transform: rotate(180deg);
}
.draw_item {
  position: absolute;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #ececec;
  top: 100%;
  left: 0;
  box-sizing: border-box;
  padding: 4%;
}
.dw_item {
  padding-left: 5%;
  font-size: 2vh;
  line-height: 10vw;
}
.dw_item.on {
  color: #ff8d0a;
}
.dw_titme {
  font-size: 2.2vh;
  color: #999;
  margin-bottom: 3vw;
}
.dw_box {
  overflow: hidden;
}
.dw_list {
  float: left;
  width: 48%;
  margin-right: 2%;
  margin-bottom: 3vw;
  height: 8vw;
  line-height: 8vw;
  border-radius: 3px;
  background: #f6f6f6;
  text-align: center;
}
.dw_list.on {
  background: #ff8d0a;
  color: #fff;
}

/* 产品列表 */
.list-box {
  margin-bottom: 10px;
}
.list-item {
  position: relative;
}

.add-y {
  width: 75px;
  height: 23px;
  border-radius: 24px;
  line-height: 23px;
  text-align: center;
  color: #fff;
  background: #46b2ff;
  position: absolute;
  right: 22px;
  top: 13px;
  color: #fff;
}

.buy-btn {
  width: 49px;
  height: 22.5px;
  background: #46b2ff;
  border-radius: 12px;
  line-height: 22.5px;
  text-align: center;
  font-size: 12px;
  color: #fff;
}

.listtitle {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.title {
  font-size: 15px;
  color: #333;
  font-weight: bold;
}

.fs-14 {
  font-size: 14px;
}

.more {
  font-size: 13px;

  color: #666;
}

.ls-top {
  border-radius: 10px;
  padding: 15px;
  position: relative;
  box-shadow: 0 1.5px 4.5px 0 rgba(107, 215, 241, 0.19);
}

.l-name {
  color: #333;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
}

.i-icon {
  width: 22px;
  height: 26px;
}

.l-price {
  align-items: center;
}
.o-price {
  color: #666;
  font-size: 11px;
  text-decoration: line-through;
}

.n-price {
  color: #fa4c42;
  font-size: 18px;
  margin-left: 6px;
}

.ls-img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.f_col {
  display: flex;
  flex-direction: column;
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
  margin-left: 10px;
  margin-right: 10px;
}
.price {
  padding-top: 10px;
  font-size: 12px;
}
.price .bold {
  font-weight: bold;
}
.price .oldprice {
  font-size: 12px;
  padding-left: 10px;
  text-decoration: line-through;
}
.p_name {
  font-size: 2.2vh;
  color: #000;
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
.dz {
  font-size: 12px;
  color: #aaa;
  padding: 3px 6px;
  border-radius: 3px;
  border: 1px solid #aaa;
}
.pay_num {
  font-size: 2vh;
  color: red;
  margin-top: 10px;
  text-align: right;
}
.ls_bot {
  margin-top: 10px;
  -webkit-align-items: center;
  align-items: center;
}
.d_img {
  height: 3.5vw;
}
.d_name {
  font-size: 12px;
  color: #747474;
  margin-left: 10px;
  margin-right: 20px;
}
.d_map {
  background-color: #ff8d0a;
  color: #fff;
  -webkit-align-items: center;
  align-items: center;
  border-radius: 3px;
  padding: 5px;
  position: relative;
  z-index: 3;
}
.map_img {
  height: 4.2vw;
}

.xc-item {
  height: 48px;
  background: #f1fcff;
  border-radius: 10px;
  display: flex;
  border-radius: 10px;
  align-items: center;
  padding: 0 10px;
  margin-top: 12px;
  justify-content: space-around;
}

.x-o {
  font-size: 13px;
  text-decoration: line-through;
}

.x-n {
  font-size: 18px;
  color: #fa4c42;
}
/* 产品列表 */
</style>
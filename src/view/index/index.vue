<template>
  <div class="pro-box">
    <div class="main">
      <!-- 轮播图 -->
      <van-swipe :autoplay="3000" class="my-swipe">
        <van-swipe-item v-for="(item, key) in bannerList" :key="key">
          <img v-lazy="item.url" class='swipe-img' />
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
            <jyModel :item="jyzlist[0]"></jyModel>
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
              <img src="@/assets/images/icon-add.png" class="add-i" />
            </div>
            <!-- <div class="xc-item">
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
            </div>-->
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
import Tab from "@/components/tabs";
import jyModel from "@/components/jyModel";
import { api } from "@/api/api";
import { getLocation } from "@/util/wxUtil";
import wxShare from "@/util/wxShare";
const qs = require("qs");
export default {
  components: {
    Bindphone,
    jyModel,
    Tab
  },
  data() {
    return {
      popShow: false,
      bannerList: [
        {
          url: require("@/assets/images/home_banner.png")
        }
      ],
      xclist: [],
      jyzlist: [],
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
    async getxclist() {
      let latlon = JSON.parse(localStorage.getItem("latlon"));
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
      this.$router.push("/jylist");
    },
    toXclist() {
      this.$router.push("/xclist");
    },
    getLocationFn() {
      getLocation().then(data => {
        if (data && data.errMsg == "getLocation:ok") {
          localStorage.setItem("latlon", JSON.stringify(data));
          this.getGaslist();
          this.getxclist();
        } else {
          // this.getLocationFn();
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

.swipe-img{
  max-width: 100%;
}

.add-i {
  width: 16px;
  height: 16px;
  position: absolute;
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
.icon {
  height: 46px;
  width: 46px;
  margin-left: 20px;
}
.flexbox {
  display: flex;
  position: relative;
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
.p_name {
  font-size: 2.2vh;
  color: #000;
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
<template>
  <div class="p-stations">
    <img class="bg-index" src="@/assets/images/jiayou.png" alt />
    <div class="b-search" v-if="(gasMode === 1 || gasMode === 2)">
      <button :class="['btn-item',showOilNumber && 'selected']" @click="doToggleOilNumber">
        <span class="mr_10">#{{ searchInfo.oil_numbers }}</span>
        <van-icon name="play" :class="['icon-arrow',showOilNumber && 'revert']" />
      </button>
      <button :class="['btn-item',showBrand && 'selected']" @click="doToggleBrand">
        <span class="mr_10">品牌</span>
       <van-icon name="play" :class="['icon-arrow',showBrand && 'revert']" />
      </button>
      <div class='pad-option' v-if="showOilNumber">
        <div class="section">
          <div class="tit">汽油</div>
          <div class="zone-options">
            <div
              v-for="(item, idx) in gasolineNumbers"
              :key="idx"
              @click="doSelectNumber(OilTypes.GASOLINE, item)"
              :class="['btn-option', searchInfo.oil_numbers === item && 'selected']"
            >{{ item }}#</div>
          </div>
        </div>
        <div class="section">
          <div class="tit">柴油</div>
          <div class="zone-options">
            <div
              v-for="(item, idx) in dieselNumbers"
              :key="idx"
              @click="doSelectNumber(OilTypes.DIESEL, item)"
              :class="['btn-option', searchInfo.oil_numbers === item && 'selected']"
            >{{ item }}#</div>
          </div>
        </div>
        <div class="section">
          <div class="tit">天然气</div>
          <div class="zone-options">
            <div
              v-for="(item, idx) in gasNumbers"
              :key="idx"
              @click="doSelectNumber(OilTypes.GAS, item)"
              :class="['btn-option', searchInfo.oil_numbers === item && 'selected']"
            >{{ item }}</div>
          </div>
        </div>
      </div>
      <div class='pad-option' v-if="showBrand">
        <div class="section">
          <div class="zone-options">
            <div
              v-for="(item, idx) in gasStationBrandArray"
              :key="idx"
              @click="doSelectBrand(item.value)"
              class="btn-option"
              :class="searchInfo.gasType==item.value?'selected':''"
            >{{ item.key }}</div>
          </div>
        </div>
        <div class="footer">
          <button class="btn-search" @click="doConfirmBrand">确定</button>
        </div>
      </div>
    </div>
    <div v-if="jyzlist.length>0" class="list-box">
      <div class="list_item" v-for="(item,key) in jyzlist" :key="key" @click="routerTo(item)">
        <router-link to="jylist" class="ls_go"></router-link>
        <jyModel :item="item"></jyModel>
      </div>
    </div>
    <div class="pad-list" v-else>附近暂无加油站</div>
  </div>
</template>
<script>
import { getLocation } from "@/util/wxUtil";
import {
  GasStationSource,
  OilTypes,
  gasNumbers,
  GhyyOrderStatuses,
  oilTypeArray,
  gasolineNumbers,
  dieselNumbers,
  gasStationBrandArray
} from "@/util/const";
import { api } from "@/api/api";
import jyModel from "@/components/jyModel";
export default {
  components: {
    jyModel: jyModel
  },
  data() {
    return {
      gasMode: 1, // 油站模式 1 支付立减  2 充值立减
      showOilNumber: false,
      showBrand: false,
      showAddressSelector: false,
      searchInfo: {
        lat: "",
        lng: "",
        oil_numbers: "92",
        oil_types: "1",
        types: [],
        per_page: 10,
        page: 1,
        address: "",
        gasType: ""
      },
      OilTypes,
      gasolineNumbers,
      dieselNumbers,
      gasNumbers,
      gasStationBrandArray,
      jyzlist: []
    };
  },
  methods: {
    routerTo(item) {
      this.$router.push({
        path: "/jydetail",
        query: {
          gasItem: JSON.stringify(item),
          gasId: item.gas_id,
          oil_number: this.searchInfo.oil_numbers + "#",
          platform_type: item.platform_type
        }
      });
    },
    doToggleOilNumber() {
      this.showOilNumber = !this.showOilNumber;
      if (this.showOilNumber) {
        this.showBrand = false;
      }
    },
    doToggleBrand() {
      this.showBrand = !this.showBrand;
      if (this.showBrand) {
        this.showOilNumber = false;
      }
    },
    doSelectNumber(oil_types, oil_numbers) {
      this.searchInfo.oil_types = oil_types;
      this.searchInfo.oil_numbers = oil_numbers;
      this.showOilNumber = false;
      this.getGaslist();
    },
    doSelectBrand(item) {
      this.searchInfo.gasType = item;
    },
    doConfirmBrand() {
      this.doToggleBrand();
      this.getGaslist();
    },
    async getGaslist() {
      let latlon = JSON.parse(localStorage.getItem("latlon"));
      let res = await api.get_gaslist({
        action: "get_gaslist",
        latitude: latlon.latitude,
        longitude: latlon.longitude,
        oilName: this.searchInfo.oil_numbers + "#",
        page: 1,
        pagesize: 100,
        gasType: this.searchInfo.gasType || ""
      });
      if (res.data.code == 200) {
        this.jyzlist = res.data.result;
      } else {
        this.getUserInfo();
      }
    },
    async getUserInfo() {
      let res = await api.userinfo({ code: localStorage.getItem("code") });
      if (res.data.code == 0) {
        this.getGaslist();
        this.getLocationFn();
        localStorage.setItem("oneToken", res.data.data.token);
        localStorage.setItem("userInfo", JSON.stringify(res.data.data));
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
    async getLocationFn() {
      let data = await getLocation();
      if (data) {
        localStorage.setItem("latlon", JSON.stringify(data));
      }
    }
  },
  mounted() {
    this.getGaslist();
  }
};
</script>
<style lang="less" scope>
.btn-item {
  position: relative;
  flex:1;
  height: 33px;
  margin-left: 15px;
  background: #FAFBFD;
  border-radius: 2.5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mr_10{
  margin-right: 10px;
}
.icon-arrow{
  transform: rotate(90deg);
}
.icon-arrow.revert{
  transform: rotate(-90deg);
}
.btn-item.selected{
  color:#fff;
  background: #46B2FF;
}
.btn-item:nth-child(2){
  margin-right: 15px;
}
.bg-index {
  height: 75px;
  width: 325px;
  margin: 0 auto 15px;
  display: block;
}
.b-search {
  height: 48px;
  display: flex;
  position: relative;
  color:#999;
  align-items: center;
  font-size:14px;
}
.pad-option {
  position: absolute;
  top:48px;
  width: 100%;
  padding:15px;
  box-sizing: border-box;
  background: #fff;
  z-index:10;
  transition: all 0.4s;
  font-size:14px;
}
.section{
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.zone-options{
  display: flex;
  flex-wrap: wrap;
}
.tit{
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
}
.btn-option {
  height:22.5px;
  margin: 0 15px 10px 0;
  border: 0.5px solid #aaaaaa;
  border-radius:2.5px;
  color:#666;
  line-height: 22.5px;
  font-size: 13px;
  padding: 0 15px;
}
.btn-option.selected {
  border-color:#46B2FF;
  color:#46B2FF
}
.footer {
  margin-top: 4vw;
  text-align: center;
}
.btn-search {
  height: 8vw;
  background-color: #46b2ff;
  color: white;
  padding: 0 7vw;
  border-radius: 1vw;
}
.pad-list {
  font-size: 24px;
  text-align: center;
  margin-top: 100px;
  color: #999;
}
/* 产品列表 */
.list-box {
  margin-bottom: 60px;
}
.list_item {
  border-radius: 10px;
  padding: 15px;
  position: relative;
  margin: 15px;
  box-shadow: 0 1.5px 4.5px 0 rgba(107, 215, 241, 0.19);
}

.ls_go {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
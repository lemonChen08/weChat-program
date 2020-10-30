<template>
    <div class="pad-gas-stations">
        <div class="pad-banner-gasoline options" style="padding: 0;">
            <button class="btn-switch" @click="gasMode = 1">
                <img class="icon" src="../assets/images/refuel_list_ic_preferential@2x.png" alt="">
                <span class="text-name">优惠加油</span>
                <span class="tag">9折加油</span>
                <div v-show="gasMode === 1" style="position:absolute; bottom:0">
                    <span class="triangle"></span>
                    <span class="triangle-white"></span>
                </div>
            </button>
            <button class="btn-switch" @click="gasMode = 2">
                <img class="icon" src="../assets/images//refuel_list_ic_oil@2x.png" alt="">
                <span class="text-name">中石油石化专区</span>
                <span class="tag">充值加油立返</span>
                <div v-show="gasMode === 2" style="position:absolute; bottom:0">
                    <span class="triangle"></span>
                    <span class="triangle-white"></span>
                </div>
            </button>
        </div>
        <div class="bar-search" v-if="(gasMode === 1 || gasMode === 2)">
            <button class="btn-item" @click="doToggleOilNumber">
                {{ btnOilNumber }}# <img :class="['icon', showOilNumber && 'revert']" src="../assets/images/icon-expand.png"/>
            </button>
            <button class="btn-item" @click="doToggleBrand">
                全部品牌
                <img :class="['icon', showBrand && 'revert']" src="../assets/images/icon-expand.png"/>
            </button>
            <!-- <button class="btn-search-location" 
                style="width: 40px;"
                @click="showAddressSelector = true">
                <img class="icon-search" src="../assets/images/icon-search.png"/>
            </button> -->
            <div :class="['pad-option', showOilNumber && 'show']"  style="padding-top: 3vw;">
                <div class="section">
                <header class="title">
                    汽油
                </header>
                <div class="zone-options">
                    <button v-for="(item, idx) in gasolineNumbers"
                    :key="idx"
                    @click="doSelectNumber(item)"
                    :class="['btn-option', oil_numbers === item && 'selected']">
                    {{ item }}#
                    </button>
                </div>
                </div>
                <div class="section">
                <header class="title">
                    柴油
                </header>
                <div class="zone-options">
                    <button v-for="(item, idx) in dieselNumbers"
                    :key="idx"
                    @click="doSelectNumber(item)"
                    :class="['btn-option', oil_numbers === item && 'selected']">
                    {{ item }}#
                    </button>
                </div>
                </div>
                <div class="section">
                <header class="title">
                    天然气
                </header>
                <div class="zone-options">
                    <button v-for="(item, idx) in gasNumbers"
                    :key="idx"
                    @click="doSelectNumber(item)"
                    :class="['btn-option', oil_numbers === item && 'selected']">
                    {{ item }}
                    </button>
                </div>
                </div>
            </div>
            <div :class="['pad-option', showBrand  && 'show']" >
                <div class="section">
                <div class="zone-options">
                    <button v-for="(item, idx) in gasStationBrandArray"
                    :key="idx"
                    @click="doSelectBrand(item.value)"
                    :class="['btn-option', searchInfo.types.includes(item.value) && 'selected']">
                    {{ item.key }}
                    </button>
                </div>
                </div>
                <div class="footer">
                <button class="btn-search" @click="doConfirmBrand">确定</button>
                </div>
            </div>
        </div>
        
      <div class="list_item" v-for="(item,key) in jyzlist" :key="key" @click="routerTo(item.id)">
        <!-- <router-link to="jylist" class="ls_go"></router-link> -->
        <div class="ls_top flexbox">
          <div class="ls_l">
            <img :src="item.logo_small" alt="" class="ls_img">
            <!-- 如果休息中显示 -->
            <div class="if_stop" style="display:none;">
              <span>休息中</span>
              <span>营业时间</span>
              <span>{{item.time}}</span>
            </div>
          </div>
          <div class="ls_m">
            <div class="p_name">{{item.name}}</div>
            <p class="price">VIP特权价 ￥<span class="bold" v-if="item">{{item.prices.priceYfq}}</span><a class="oldprice">国标价 ￥ {{item.prices.priceOfficial}}</a></p>
          </div>
          <div class="ls_r" style="display:none;">
            <div class="dz">{{item.dazhe}}</div>
            <div class="pay_num">￥{{item.pay}}</div>
          </div> 
        </div>
        <div>

        </div>
        <div class="ls_bot">
          <img src="../assets/images/icon-address.png" alt="" class="d_img">
          <div class="d_name">{{item.address}}</div>
          <button class="d_map">
            <img src="../assets/images/icon-nav-white.png" alt="" class="map_img">
            {{item.distance}}km
          </button>
        </div>
      </div>
        <div class="pad-list">
            <div class="hx-emptyset transparent">附近暂无加油站</div>
        </div>
    </div>
</template>
<script>
import {getLocation} from "@/util/wxUtil"
import { api } from "@/api/api"
export default {
  components: {
  },
  data() {
    return {
      gasMode: 1, // 油站模式 1 支付立减  2 充值立减
      showOilNumber: false,
      showBrand:false,
      showAddressSelector:false,
      oil_numbers:'',
      searchInfo: {
        lat: '',
        lng: '',
        oil_numbers: '',
        oil_types: '',
        types: [],
        per_page: 10,
        page: 1,
        address: ''
      },
      btnOilNumber:'92',
      gasolineNumbers:['90','92','95','98','101'],
      dieselNumbers:['-40','-35','-30','-20','-10','国四','0'],
      gasNumbers:['CNG','LNG'],
      gasStationBrandArray:[
        { value: 1, key: '中石油' },
        { value: 2, key: '中石化' },
        { value: 3, key: '壳牌' },
        { value: 4, key: '其他' }
      ],
      jyzlist:[]
    };
  },
  created() {
    this.getLocationFn()
  },
  computed: {
    
  },
  methods: {
    routerTo(id){
        this.$router.push({ name: 'jydetail', params: { gasId: id }});
    },  
    doToggleOilNumber () {
      this.showOilNumber = !this.showOilNumber
      if (this.showOilNumber) {
        this.showBrand = false
      }
    },
    doToggleBrand(){
      this.showBrand = !this.showBrand
      if (this.showBrand) {
        this.showOilNumber = false
      }  
    },
    doSelectNumber(item){
      this.btnOilNumber = item
      this.showOilNumber = false
      this.getGaslist()
    },
    doSelectBrand(item){
      for (let i = 0; i < this.searchInfo.types.length; i++) {
        if (this.searchInfo.types[i] === item) {
          this.searchInfo.types.splice(i, 1)
          return
        }
      }
      this.searchInfo.types.push(item)
    },
    doConfirmBrand(){
       this.doToggleBrand() 
       this.getGaslist()
    },
    async getGaslist(){
      let res = await api.get_gaslist({
        lat:'36.30556423523153',
        lng:'104.48060937499996',
        oil_numbers:this.btnOilNumber+'#',
        pageNum:1,
        pagesize:100
      })
      if(res.data.code==0){
        let data = JSON.parse(res.data.data)
        this.jyzlist = data.data.items
      }else{
        this.$layer.msg(res.data.msg)
      }
    },
    
    async getLocationFn(){
        let data=await getLocation()
        console.log(data) //获取地址信息
    }
  },
  mounted() {
    this.getGaslist()
  }
};
</script>
<style lang="less" scope>
.pad-gas-stations{
    height:100%;
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overflow-y: hidden;
}
.ghyyType {
  // 
  height: calc(100% - 11vw) !important;
}
.btn-item {
  position: relative;
  .hx-district-selector {
    position: absolute;
    opacity: .0;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 4;
    .hx-input {
      border: none;
      background-color: transparent;
      color: black;
    }
    .hx-input::placeholder {
      color: transparent;
    }
  }
}
.btn-search-location {
  width: 40px;
  background-color: white;
  padding: 2.2vw;
  padding: 0;
  margin: 0;
  background-color: white;
  .icon-search {
    height: 6.6vw;
    width: auto;
    margin: 0 auto;
    display: block;
  }
}
.card-station.station .pad-top-info .pad-station-info{
  height: auto;
}
/deep/.discount-modal>.content {
  background-color:transparent !important;
}
// /deep/.hx-modal>.content {
//   background-color:transparent !important;
// }

.triangle{
  display: block;
  border-left: 2vw solid transparent;
  border-right: 2vw solid transparent;
  border-bottom: 2vw solid #eee;
}
.triangle-white{
  display: block;
  border-left: 2vw solid transparent;
  border-right: 2vw solid transparent;
  border-bottom: 2vw solid #fff;
  position: absolute;
  bottom: -2px;
}
.pad-gas-stations .pad-banner-gasoline , .pad-stations .pad-banner-gasoline  {
    height: 36vw;
    display: block;
    position: relative;
    -webkit-transition: height .4s;
    transition: height .4s;
}
.pad-gas-stations .pad-banner-gasoline.options , .pad-stations .pad-banner-gasoline.options  {
      height: 28.125vw;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      background-color: white;
      border-bottom: 1px solid #eee;
      font-size: 0;
}
.pad-gas-stations .pad-banner-gasoline.options .btn-switch , .pad-stations .pad-banner-gasoline.options .btn-switch  {
        background-color: white;
        color: #747474;
        height: 100%;
        padding-bottom: 2vw;
        -webkit-box-flex: 1;
            -ms-flex: 1;
                flex: 1;
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
            -ms-flex-direction: column;
                flex-direction: column;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
}
.pad-gas-stations .pad-banner-gasoline.options .btn-switch.selected , .pad-stations .pad-banner-gasoline.options .btn-switch.selected  {
          background-color: white;
}
.pad-gas-stations .pad-banner-gasoline.options .btn-switch + .btn-switch ::before, .pad-stations .pad-banner-gasoline.options .btn-switch + .btn-switch ::before {
          content: '';
          height: 34%;
          width: 1px;
          background-color: #eee;
          position: absolute;
          left: 0;
          top: 33%;
}
.pad-gas-stations .pad-banner-gasoline.options .btn-switch .icon , .pad-stations .pad-banner-gasoline.options .btn-switch .icon  {
          height: 14vw;
          width: 14vw;
}
.pad-gas-stations .pad-banner-gasoline.options .btn-switch .text-name , .pad-stations .pad-banner-gasoline.options .btn-switch .text-name  {
          width: 100%;
          display: block;
          margin: 0 0 1vw 0;
          font-size: 3.2vw;
          font-weight: 500;
          color: #000;
}
.pad-gas-stations .pad-banner-gasoline.options .btn-switch .tag , .pad-stations .pad-banner-gasoline.options .btn-switch .tag  {
          display: block;
          width: auto;
          background-color: rgba(255, 90, 80, 0.1);
          color: rgba(255, 90, 80, 0.9);
          font-size: 2.5vw;
          padding: 0 3vw;
          border-radius: 3vw;
          height: 4vw;
          line-height: 4.5vw;
}
.pad-gas-stations .pad-banner-gasoline.options ~ .pad-list , .pad-stations .pad-banner-gasoline.options ~ .pad-list  {
        height: calc(100% - 30vw);
}
.pad-gas-stations .pad-banner-gasoline .img-banner , .pad-stations .pad-banner-gasoline .img-banner  {
      width: 100%;
      height: auto;
      position: absolute;
}
.pad-gas-stations .pad-banner-gasoline .list-guide , .pad-stations .pad-banner-gasoline .list-guide  {
      position: absolute;
      display: block;
      left: 3.5vw;
      bottom: 4vw;
      margin: 0;
      padding: 0;
}
.pad-gas-stations .pad-banner-gasoline .list-guide li , .pad-stations .pad-banner-gasoline .list-guide li  {
        color: white;
        display: inline-block;
        font-size: 3.5vw;
        padding-left: 2vw;
        margin-right: 2vw;
        position: relative;
        height: 7vw;
        line-height: 7vw;
}
.pad-gas-stations .pad-banner-gasoline .list-guide li ::before, .pad-stations .pad-banner-gasoline .list-guide li ::before {
          height: 1vw;
          width: 1vw;
          content: "";
          display: block;
          background-color: #FFBC00;
          border-radius: 1vw;
          top: 50%;
          position: absolute !important;
          transform: translateY(-50%);
          -webkit-transform: translateY(-50%);
          -moz-transform: translateY(-50%);
          -o-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
          left: 0;
}
.pad-gas-stations .pad-banner-gasoline .btn-to-mannual , .pad-stations .pad-banner-gasoline .btn-to-mannual  {
      position: absolute;
      bottom: 4vw;
      right: 3vw;
      background-color: #ff8d0a;
      color: white;
      padding: 1vw 3vw 0.66667vw;
      border-radius: 10vw;
}
.pad-gas-stations .bar-search , .pad-stations .bar-search  {
    height: 11vw;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    z-index: 100;
    overflow-y: visible;
    background-color: white;
    border-bottom: 1px solid #eee;
}
.pad-gas-stations .bar-search .btn-item , .pad-stations .bar-search .btn-item  {
      -webkit-box-flex: 1;
          -ms-flex: 1;
              flex: 1;
      background-color: white;
      color: black;
}
.pad-gas-stations .bar-search .btn-item .icon , .pad-stations .bar-search .btn-item .icon  {
        height: 3vw;
        width: auto;
        margin-left: 1vw;
}
.pad-gas-stations .bar-search .btn-item .icon.revert , .pad-stations .bar-search .btn-item .icon.revert  {
          -webkit-transform: rotate(180deg);
                  transform: rotate(180deg);
}
.pad-gas-stations .bar-search .btn-to-list , .pad-stations .bar-search .btn-to-list  {
      padding: 0 3vw;
      background-color: white;
      position: relative;
}
.pad-gas-stations .bar-search .btn-to-list ::before, .pad-stations .bar-search .btn-to-list ::before {
        height: 60%;
        width: 1px;
        background-color: #eee;
        display: block;
        content: "";
        position: absolute;
        left: 0;
        top: 20%;
}
.pad-gas-stations .bar-search .btn-to-list img , .pad-stations .bar-search .btn-to-list img  {
        height: 5vw;
        width: auto;
}
.pad-gas-stations .bar-search .pad-option , .pad-stations .bar-search .pad-option  {
      display: block;
      position: absolute;
      top: 100%;
      width: 100%;
      padding: 5vw 3vw;
      opacity: .0;
      visibility: hidden;
      -webkit-transition: all .4s;
      transition: all .4s;
      background-color: white;
      -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
              box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
      font-size: 3.8vw;
}
.pad-gas-stations .bar-search .pad-option .title , .pad-stations .bar-search .pad-option .title  {
        line-height: 3;
}
.pad-gas-stations .bar-search .pad-option.show , .pad-stations .bar-search .pad-option.show  {
        opacity: 1.0;
        visibility: visible;
}
.pad-gas-stations .bar-search .pad-option .btn-option , .pad-stations .bar-search .pad-option .btn-option  {
        height: 8vw;
        margin: 0 1.5vw 1vw 0;
        border-radius: 1vw;
        background-color: #f6f6f6;
        font-size:12px;
        padding:0 6px;
}
.pad-gas-stations .bar-search .pad-option .btn-option.selected , .pad-stations .bar-search .pad-option .btn-option.selected  {
          background-color: #FFBC00;
          color: white;
}
.pad-gas-stations .bar-search .pad-option .footer , .pad-stations .bar-search .pad-option .footer  {
        margin-top: 4vw;
        text-align: center;
}
.pad-gas-stations .bar-search .pad-option .footer .btn-search , .pad-stations .bar-search .pad-option .footer .btn-search  {
          height: 8vw;
          background-color: #52c93f;
          color: white;
          padding: 0 7vw;
          border-radius: 1vw;
}
.pad-gas-stations .pad-list , .pad-stations .pad-list  {
    height: calc(100% - 47vw);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    z-index: 1;
}
.pad-gas-stations .pad-list.no-banner , .pad-stations .pad-list.no-banner  {
      height: calc(100% - 11vw);
}
.pad-gas-stations .pad-list .pad-loading , .pad-stations .pad-list .pad-loading  {
      padding: 5vw 0;
      text-align: center;
}
.pad-gas-stations.map .pad-banner-gasoline , .pad-stations.map .pad-banner-gasoline  {
    height: 0;
}
.pad-gas-stations.map .bar-search , .pad-stations.map .bar-search  {
    position: absolute;
    top: 3vw;
    left: 3vw;
    width: calc(100% - 6vw);
    border-radius: 1vw;
}
.pad-gas-stations.map .pad-list , .pad-stations.map .pad-list  {
    height: 100%;
}
.pad-gas-stations.invisible , .pad-stations.invisible  {
    opacity: .0;
}
.pad-stations .btn-option  {
  margin-bottom: 2vw !important;
}
.pad-gas-stations .pad-banner-gasoline.options~.pad-list , .pad-stations .pad-banner-gasoline.options~.pad-list {
    height: calc(100% - 30vw);
}
.hx-emptyset{
    height: 100%;
    width: 100%;
    min-height: 150px;
    display: -ms-flexbox;
    display: flex;
    left: 0;
    top: 0;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
    position: relative;
    background-color: #f6f6f6;
    color: #aaa;
    font-size: 6.45vw;
    font-weight: 300;
}
.hx-emptyset.transparent{background-color: transparent;}
/* 产品列表 */
.list_box{
  margin-top: 3vw;
  background:#fff;
}
.list_item{
  padding: 3%;
  border-bottom:1px solid #ececec;
  position: relative;
}
.list_item .listtitle{
  overflow:hidden;
  line-height:24px;
  padding-bottom:10px;
}
.list_item .listtitle .title{float:left;font-weight: bold;}
.list_item .listtitle .more{float:right;}
.ls_go{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.ls_l{
 width: 22vw;
 height: 16vw;
 position: relative;
 border-radius: 5px;
 overflow: hidden;
}
.ls_img{
  display: block;
  width: 100%;
  height: 100%;
}
.if_stop{
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
.if_stop span{
  font-size: 12px;
}
.ls_m{
  flex: 1;
  margin-left: 10px;
  margin-right: 10px;
}
.price{padding-top:10px;font-size:12px;}
.price .bold{font-weight:bold;}
.price .oldprice{font-size:12px;padding-left:10px;text-decoration: line-through;}
.p_name{
  font-size: 2.2vh;
  color: #000;
}
.p_cord{
  margin-top: 10px;
  -webkit-align-items: center;
  align-items: center;
}
.rank{
  font-size: 12px;
  color: #fff;
  padding: 3px 6px;
  border-radius: 3px;
  background: #ffbc00;
}
.sale{
  font-size: 12px;
  color: #747474;
  margin-left: 5px;
}
.dz{
  font-size: 12px;
  color: #aaa;
  padding: 3px 6px;
  border-radius: 3px;
  border: 1px solid #aaa;
}
.pay_num{
  font-size: 2vh;
  color: red;
  margin-top: 10px;
  text-align: right;
}
.ls_bot{
    overflow:hidden;
  margin-top: 10px;
  -webkit-align-items: center;
  align-items: center;
}
.d_img{
    float:left;
  height: 3.5vw;
  margin-top:8px;
}
.d_name{
    float:left;
  font-size: 12px;
  color: #747474;
  margin-left: 10px;
  padding-top:8px;
  width:65%;
}
.d_map{
    float:right;
  background-color: #ff8d0a;
  color: #fff;
  -webkit-align-items: center;
  align-items: center;
  border-radius: 3px;
  padding: 5px;
  position: relative;
  z-index: 3;
}
.map_img{
  height: 4.2vw;
}
.flexbox{
  display: flex;
}
</style>
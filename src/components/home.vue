<template>
  <div class="pro_box">
    <div class="main">
    <el-carousel height="150px">
      <el-carousel-item v-for="(item,key) in bannerList" :key="key">
        <img :src="item.url" height="100%"  width="100%"/>
      </el-carousel-item>
    </el-carousel>
    <div class="pad-functions">
      <div class="item-normal" @click="toJylist">
        <div class="card-navigator">
          <img src="../assets/images/jiayou.png" class="icon"/>
          <span class="tag">8折</span>
          <div class="row-info">
            <span class="name">折扣加油</span>
          </div>
        </div>
      </div>
      <div class="item-normal" @click="toXclist">
        <div class="card-navigator">
          <img src="../assets/images/xiche.png" class="icon"/>
          <span class="tag">8折</span>
          <div class="row-info">
            <span class="name">洗车保养</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="list_box">
      <div class="list_item" v-if="jyzlist.length>0">
        <div class="listtitle">
          <h2 class="title">附近加油站</h2>
          <router-link to="jylist" class="more">更多></router-link>
        </div>
        <div class="ls_top flexbox" @click="routerTo(jyzlist[0])">
          <div class="ls_l">
            <img :src="jyzlist[0].gas_logo_big" alt="" class="ls_img">
            <!-- 如果休息中显示 -->
            <div class="if_stop" style="display:none;">
              <span>休息中</span>
              <span>营业时间</span>
              <span>{{jyzlist[0].time}}</span>
            </div>
          </div>
          <div class="ls_m">
            <div class="p_name">{{jyzlist[0].name}}</div>
            <p class="price">VIP特权价 ￥<span class="bold">{{jyzlist[0].discount_price || 0}}</span><a class="oldprice">国标价 ￥ {{jyzlist[0].official_price}}</a></p>
          </div>
          <div class="ls_r" style="display:none;">
            <div class="dz">{{jyzlist[0].dazhe}}</div>
            <div class="pay_num">￥{{jyzlist[0].pay}}</div>
          </div> 
        </div>
        <div class="ls_bot flexbox">
          <img src="../assets/images/icon-address.png" alt="" class="d_img">
          <div class="d_name">{{jyzlist[0].gas_address}}</div>
          <button class="d_map flexbox">
            <img src="../assets/images/icon-nav-white.png" alt="" class="map_img">
            {{jyzlist[0].juli/100}}
          </button>
        </div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="list_box">
      <div class="list_item"  v-if="xclist.length>0">
        <router-link :to="{path:'/xcdetails',query:{shopCode: xclist[0].shop_code,latitude:xclist[0].latitude,longitude:xclist[0].longitude}}" class="ls_go"></router-link>
        <div class="listtitle">
          <h2 class="title">附近洗车店</h2>
          <router-link to="xcdetails" class="more">更多></router-link>
        </div>
        <div class="ls_top flexbox">
          <div class="ls_l">
            <img :src="xclist[0].shop_img" alt="" class="ls_img">
            <!-- 如果休息中显示 -->
            <div class="if_stop" v-show="!xclist[0].is_open">
              <span>休息中</span>
              <span>营业时间</span>
              <span>{{xclist[0].start_opentime}}--{{xclist[0].end_opentime}}</span>
            </div>
          </div>
          <div class="ls_m">
            <div class="p_name">{{xclist[0].shop_name}}</div>
            <div class="p_cord flexbox">
              <div class="rank">{{xclist[0].score}}</div>
              <div class="sale">已售 {{xclist[0].total_num}}</div>
            </div>
          </div>
          <div class="ls_r" v-show="false">
            <div class="dz">{{xclist[0].Tdiscount}}</div>
            <div class="pay_num">￥{{xclist[0].Tprice}}</div>
          </div> 
        </div>
        <div class="ls_bot flexbox">
          <img src="../assets/images/icon-address.png" alt="" class="d_img">
          <div class="d_name">{{xclist[0].shop_address}}</div>
          <button class="d_map flexbox">
            <img src="../assets/images/icon-nav-white.png" alt="" class="map_img">
            {{$_toDistance(xclist[0].juli)}}
          </button>
        </div>
      </div>
    </div>
    <Bindphone @closepop='closePhone' v-show="popShow"></Bindphone>
    <!-- <div class="fadePop" v-show="fadePop">请求数据中</div>-->
    </div> 
    <Tabs></Tabs>
  </div>
</template>
<script>
import Tabs from './tabs'
import axios from 'axios'
import Bindphone from "./bindPhone"
import { api } from "@/api/api"
import {getLocation} from "@/util/wxUtil"
import wxShare from '../util/wxShare.js'
// import { loadBMap } from '../util/loadBMap'
import img1 from "@/assets/images/banner1.png"
import img2 from "@/assets/images/banner1.png"
const qs = require('qs')
export default {
  components: {
    Bindphone,
    Tabs
  },
  data() {
    return {
      fadePop:true,
      popShow:false,
      // 打开搜索下拉
      phoneShow:0,
      bannerList:[{
        url:require('../assets/images/banner1.png')
      },{
        url:require('../assets/images/banner2.png')
      }],
      // 打开搜索地址
      mapShow:false,
      xclist:[{}],
      jyzlist:[{price:{priceYfq:0}}],
      list:[
        {
          img:require('../assets/images/details_baner.jpg'),
          time:'8:00-12:00',
          name:'新业汽车美容有限公司',
          rank:'4.7分',
          sale:'2',
          dazhe:'7.6折',
          pay:'38',
          adress:'广东省深圳市龙岗区布沙路78号樟树布综合楼后侧',
          km:'0.23km'
        }
      ]
    };
  },
  created() {
    let userInfo = localStorage.getItem('userInfo')
    userInfo = JSON.parse(userInfo)
    if(userInfo.phone==''){
      this.popShow = true
    }
  },
  methods: {
    routerTo(item){
        this.$router.push({ path: '/jydetail', query: { gasItem:JSON.stringify(item),gasId:item.id,oil_number:'92'}});
    },  
    $_toDistance (distance) {
      if (!distance) {
        return '一键导航'
      }
      if (distance > 1) {
        let num = distance / 1000
        return (num.toFixed(2) + 'km')
      } else {
        let num = distance / 1000
        return (num + 'm')
      }
    },
    async getUserInfo(){
        let res = await api.userinfo({code:localStorage.getItem('code')})
        
        if(res.data.code==0){
          this.getLocationFn()
          this.userinfo = res.data
          localStorage.setItem('oneToken',res.data.data.token)
          localStorage.setItem('userInfo',JSON.stringify(res.data.data))
          if(res.data.data.firstLogin){
            this.popShow = true
          }else{
            this.popShow = false
          }
        }
    },
    getUrlCode() { // 截取url中的code方法
      var url = location.search
      this.winUrl = url
      var theRequest = new Object()
      if (url.indexOf("?") != -1) {
          var str = url.substr(1)
          var strs = str.split("&")
          for(var i = 0; i < strs.length; i ++) {
              theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1])
          }
      }
      return theRequest
    },
    // 下拉筛选
    choosetype(e){
      if(this.phoneShow == e.target.dataset.num){
        this.phoneShow = 0
      }else{
        this.phoneShow = e.target.dataset.num
      }
    },

    // 打开搜索地址
    openmapShow(){
      this.mapShow = true
    },

    // 关闭搜索地址
    closemapShow(){
      this.mapShow = false
    },
    async getxclist(){
      let latlon = JSON.parse(localStorage.getItem('latlon'))
      // alert(11)
      let res = await api.storesList({
        action:'get_shoplist',
        cityName:'深圳市',
        // lat:latlon.latitude,
        // lng:latlon.longitude,
        latitude:latlon.latitude,
        longitude:latlon.longitude,
        orderBy:1,
        page:1,
        pagesize:15
      })
      if(res.data.code==200){
        this.fadePop = false
        this.xclist = res.data.result
      }else if(res.data.code==401){
        localStorage.clear()
        sessionStorage.clear()
        window.location.reload()
      }else{
        alert(res.data.msg)
      }
    },
    async getGaslist(){
      // alert(33)
      let latlon = JSON.parse(localStorage.getItem('latlon'))
      let res = await api.get_gaslist({
        action:'get_gaslist',
        latitude:latlon.latitude,
        longitude:latlon.longitude,
        oilName:'92#',
        page:1,
        pagesize:15
      })
      if(res.data.code==200){
        // alert(44)
        this.fadePop = false
        this.jyzlist = res.data.result
        // this.jyzlist = data.data.items
        // data.data.items = data.map(v => {
        //   v.price = this.getPriceByOilNumber(v, 92)
        //   v.price = v.discount_price
        //   return v 
        // })
      }else if(res.data.code==401){
        localStorage.clear()
        sessionStorage.clear()
        window.location.reload()
      }else{
        alert(res.data.msg)
      }
    },
    // 根据传入的油号获取检测站的价格信息
   getPriceByOilNumber (v, oil_numbers) {
      if (!v.prices || (v.prices && !v.prices.length)) {
        return null
      }
      if (!oil_numbers) {
        return v.prices[0]
      }
      for (let i = 0; i < v.prices.length; i++) {
        // eslint-disable-next-line
        if (parseInt(oil_numbers) == v.prices[i].oilNo) {
          return v.prices[i]
        }
      }
      return {}
    },
    // 打开手机绑定
    openPhone(){
      this.popShow = true
    },

    // 关闭手机绑定
    closePhone(){
      this.popShow = false
    },
    toJylist(){
      this.$router.replace('/jylist')
    },
    toXclist(){
      this.$router.replace('/xclist')
    },
    getLocationFn(){
        getLocation().then(data=>{
          if(data && data.errMsg=='getLocation:ok'){
            localStorage.setItem('latlon',JSON.stringify(data))
            this.getGaslist()
            this.getxclist()
          }else{
            this.getLocationFn()
          }
        })
    }
  },
  mounted() {
    this.getLocationFn()
    // this.getGaslist()
    // this.getxclist()
    // wxShare().then(() => {
    //     // let token = localStorage.getItem('oneToken')
    //     // if(token){
    //       console.log(222)
    //       this.getxclist()
    //     this.getGaslist()
    //     // }
        
    //   })
    
    // let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    // const url = window.location.href;
    // const parseUrl = qs.parse(url.split('?')[1])
    // if(!userInfo){
    //   if(!parseUrl.code){
    //     this.getUserInfo()
    //     this.getLocationFn()
    //   }
    // }else{
    //   this.popShow = userInfo.firstLogin
    //   this.getLocationFn()
    // }
    // loadBMap()
    
    /////
    // let myGeo = new BMap.Geocoder()
    // myGeo.getLocation(new BMap.Point(), function(result) {
    //   if (result) {
    //     alert(result.point.lng,result.point.lat)
    //     alert('拿到了纬度'+result.point.lng)
    //     let latlon = {
    //       latitude:result.point.lat,
    //       longitude:result.point.lng
    //     }
    //     localStorage.setItem('latlon',JSON.stringify(latlon))
    //   }else{
    //     alert('出粗了')
    //   }
    // })
  }
};
</script>
<style scoped>
.fadePop{
  position:absolute;
  top:0;
  left:0;
  bottom:0;
  right:0;
  color:#fff;
  background:rgba(0,0,0,0.5);
  z-index:999;
}
.pad-functions{padding:3vw 0;background:#fff;}
.item-normal{
  flex: 1;
    display: inline-block;
    position: relative;
    width: 25%;
}
.card-navigator{
  padding: 3vw;
}
.card-navigator .icon{
  height: 10vw;
    width: 10vw;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    position: relative;
    display: block;
}
.card-navigator .tag{
  font-size: 2.6vw;
    position: absolute;
    top: 1vw;
    right: 3vw;
    background-color: #ff5a50;
    padding: .2vw 1vw;
    display: block;
    color:#fff;
    border-radius:5vw;
    border-bottom-left-radius:0;
}
.card-navigator .row-info{text-align:center;margin-top:1vw;}
.card-navigator .row-info .name{font-size: 3.8vw;
    color: #2a2a2a;
    display: block;
    width: 100%;
    text-align: center;}
.flexbox{
  display: flex;
}
.pro_box{background:#f6f6f6;    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;}
.sear_list{
  height: 10vw;
  border-bottom: 1px solid #ececec;
}
.sr_item{
  -webkit-flex: 1;
  flex: 1;
  text-align: center;
  font-size: 2vh;
  line-height: 10vw;
}
.sr_item img{
  height: 3vw;
  margin-left: 5px;
  transition: all .4s;
}
.sr_item.active img{
  transform: rotate(180deg);;
}
.draw_item{
  position:absolute;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #ececec;
  top: 100%;
  left: 0;
  box-sizing: border-box;
  padding: 4%;
}
.dw_item{
  padding-left: 5%;
  font-size: 2vh;
  line-height: 10vw;

}
.dw_item.on{
  color:#ff8d0a
}
.dw_titme{
  font-size: 2.2vh;
  color: #999;
  margin-bottom: 3vw;
}
.dw_box{
  overflow: hidden;
}
.dw_list{
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
.dw_list.on{
  background: #ff8d0a;
  color: #fff;
}


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
.list_item .listtitle .title{float:left;font-weight: 500;font-size:16px;}
.list_item .listtitle .more{float:right;font-size:14px;}
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
  margin-top: 10px;
  -webkit-align-items: center;
  align-items: center;
}
.d_img{
  height: 3.5vw;
}
.d_name{
  font-size: 12px;
  color: #747474;
  margin-left: 10px;
  margin-right: 20px;
}
.d_map{
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
/* 产品列表 */
</style>

<style lang="less">

</style>
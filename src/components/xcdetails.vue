<template>
    <div class="details_box">
      <img :src="images[0].shopImgUrl" alt="" style="width:100%;">
      <div class="dt_top"  v-if="!parseInt(xcDetail.isOpen) && parseInt(xcDetail.isStatus) === 4">
        <div class="dt_time">营业时间 {{ xcDetail.openTimeStart }}-{{ xcDetail.openTimeEnd }}</div>
        <div class="dt_name">{{xcDetail.shopName}}</div>
        <div class="dt_adress flexbox">
          <img src="../assets/images/icon-address.png" alt="" class="dt_img">
          <div class="dt_text">{{xcDetail.address}}</div>
          <button class="dt_btn flexbox" v-show="false">
            <img src="../assets/images/icon-nav-white.png" alt="">
            一键导航
          </button>
        </div>
      </div>
      <div class="dt_mid">
        <div class="dt_title">门店服务 <span>共{{ services.length }}项</span></div>
        <div class="dt_item flexbox" v-for="(item,key) in services" @click="checkFuntion(item,key)">
          <div class="dt_check">
            <div class="no_chek"></div>
            <img src="../assets/images/check.png" alt="" v-if="key==n">
          </div>
          <div class="dt_cont">
            <div class="dm_name">{{item.serviceName}}</div>
            <div class="dm_text">有效期 30 天</div>
          </div>
          <div class="dt_pay">
            <div class="f_price">￥{{item.finalPrice}}</div>
            <del class="t_price">门店价￥{{item.price}}</del>
          </div>
        </div>
      </div>
      <div class="dt_bot flexbox">
        <div class="bot_left">
          <div class="bot_t flexbox">
            <div class="b_price">￥{{current.finalPrice}}</div>
            <del class="t_price">￥{{current.price}}</del>
          </div>
          <div class="bot_f">{{current.serviceName}}</div>
        </div>
        <div class="bot_right flexbox">
          <!-- <a href="javascript:;" class="flexbox">
            <img src="../assets/images/zx.png" alt="">
            <small>咨询/预约</small>
          </a> -->
          <button class="btn-main" 
            @click="doCreateOrder" 
            :disabled="isProcessing" 
            v-text="isProcessing ? '结算中' : '去结算'">
          </button>
        </div>
      </div>
      <Bindphone @closepop='closePhone' v-show="showBindPhone"></Bindphone>
    </div>
</template>
<script>
import { api } from "@/api/api"
import Bindphone from "./bindPhone"
import {xcWXinvoke} from "@/util/wxUtil"
export default {
  components: {
    Bindphone
  },
  data() {
    return {
      showBindPhone:false,
      isProcessing:false,
      xcDetail:{},
      images:[],
      services:[],
      current: {},
      n:null,
      phone:null
    };
  },
  created() {
    this.getXcDetail()
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.phone = userInfo.phone
    
  },
  methods: {
    // 关闭手机绑定
    closePhone(){
      this.showBindPhone = false
    },
    checkFuntion(item,key){
      this.price = item.finalPrice
      this.current = item
      this.n = key
    },
    async getXcDetail(){
      let res = await api.storesDetail({
        lat:this.$route.query.latitude,
        lng:this.$route.query.longitude,
        shopCode:this.$route.query.shopCode
      })
      if(res.data.code==0){
        let data = JSON.parse(res.data.data)
        this.xcDetail = data.data
        this.images = data.data.imgList
        this.services = data.data.serviceList
        this.checkFuntion(this.services[0],0)
      }else{
        this.$layer.msg(res.data.message)
      }
    },
    async doCreateOrder () {
      if (!this.phone) {
        this.showBindPhone = true
        return
      }
      // const channel_id = session.get(session.KEY_CURRENT_CHANNEL_ID) || 0
      // const info = JSON.stringify(Object.assign({}, this.detail, this.current))
      // console.log('data::::::', this.myChannel)
      const bundle = {
        // channel_id: parseInt(channel_id),
        shopCode: this.xcDetail.shopCode, // 商店编号 
        serviceCode: this.current.serviceCode, // 服务编号
        price: this.current.finalPrice * 100, // 优惠价（元转分）
        originPrice: this.current.price * 100, // 门店价（原价）（元转分）
        status:this.xcDetail.isStatus
      }
      this.isProcessing = true
      xcWXinvoke(bundle,res=>{
        if (res.code !== 200) {
          this.isProcessing = false
          // report('加油支付', '回调', '创建加油订单失败')
          if (res.message === '油站返回错误![平台余额不足]') {
            this.isProcessing = false
            this.$layer.msg('暂不支持该油站')
          } else {
            this.isProcessing = false
            this.$layer.msg(res.message)
          }
          return
        }
        let timeout = window.setTimeout(() => {
          this.isProcessing = false
          window.clearTimeout(timeout)
        }, 2500)
      }) 
      this.isProcessing = false
      // this.toPay(res.data.id)
    }
  },
  mounted() {
    
  }
};
</script>
<style scoped>
.flexbox{
  display: flex;
}
.dt_top{
 background: #fff;
 position: relative;
 z-index: 5;
 border-radius: 8px;
 box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
 margin: -5vh 4% 0;
 padding: 3% 4%;
}
.dt_time{
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  height: 4vh;
  line-height: 4vh;
  border-radius: 5px;
  top: -4vh;
  left: 0;
  font-size: 12px;
  color:#fff;
  padding: 0 15px;
}
.dt_name{
  font-size: 2.2vh;
  color: #000;
}
.dt_adress{
  margin-top: 10px;
  -webkit-align-items: center;
  align-items: center;
}
.dt_img{
  height: 3.5vw;
}
.dt_text{
  margin-left: 1vw;
  margin-right: 3vw;
  -webkit-flex: 1;
  flex: 1;
  font-size: 12px;
  color: #aaa;
}
.dt_btn{
  -webkit-align-items: center;
  align-items: center;
  font-size: 12px;
  color: #fff;
  border-radius: 5px;
  padding: 5px;
  background-color: #ff8d0a;
}
.dt_btn img{
  height: 4vw;
  margin-right: 5px;
}
.dt_mid{
  padding: 0 3%;
  margin-top: 15px;
}
.dt_title{
  font-size: 2.5vh;
  line-height: 6vh;
  border-bottom: 1px solid #ececec;
}
.dt_title span{
  font-size: 2vh;
  color: #aaa;
  margin-right: 10px;
}
.dt_item{
  padding: 3vw 0;
  border-bottom: 1px solid #ececec;
  -webkit-align-items: center;
  align-items: center;
}
.dt_check{
  position: relative;
}
.dt_item img{
  width: 5.5vw;
  height: 5.5vw;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius: 50%;
}
.no_chek{
  width: 5vw;
  height: 5vw;
  border:1px solid #f0c13d;
  border-radius: 50%;
}
.dt_cont{
  margin-left: 3vw;
  margin-right: 3vw;
  -webkit-flex: 1;
  flex: 1;
}
.dm_name{
  font-size: 2.2vh;
}
.dm_text{
  font-size: 1.8vh;
  color: #aaa;
  margin-top: 2vw;
}
.f_price{
  font-size: 2.2vh;
  color: #ff8d0a;
  margin-bottom: 2vw;
}
.t_price{
  color: #aaa;
}
.dt_bot{
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
.b_price{
  font-size: 2.2vh;
  color: #ff8d0a;
}
.t_price{
  font-size: 1.8vh;
  color: #aaa;
}
.bot_f{
  font-size: 1.8vh;
  color: #aaa;
  margin-top: 2vw;
}
.bot_right{
  -webkit-align-items: center;
  align-items: center;
}
.bot_right a{
  margin-right: 1vw;
  -webkit-align-items: center;
  align-items: center;
  -webkit-flex-direction: column;
  flex-direction: column;
}
.bot_right a img{
  width: 6vw;
  height: 6vw;
}
.bot_right a small{
  font-size: 1.8vw;
}
.bot_right button{
  height: 10vw;
  padding: 0 5vw;
  font-size:2.5vh;
  color: #fff;
  background-color: #ff8d0a;
  border-radius: 8px;
}
</style>
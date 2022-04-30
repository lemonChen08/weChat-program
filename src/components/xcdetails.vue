<template>
    <div class="details_box">
      <img :src="xcDetail.shop_img" alt="" style="width:100%;">
      <div class="dt_top"  v-if="!parseInt(xcDetail.isOpen) && parseInt(xcDetail.isStatus) === 4">
        <div class="dt_time">营业时间 {{ xcDetail.openTimeStart }}-{{ xcDetail.openTimeEnd }}</div>
        <div class="dt_name">{{xcDetail.shop_name}}</div>
        <div class="dt_adress flexbox">
          <img src="../assets/images/icon-address.png" alt="" class="dt_img">
          <div class="dt_text">{{xcDetail.shop_address}}</div>
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
            <div class="dm_name">{{item.service_name}}</div>
            <div class="dm_text" v-show="false">有效期 30 天</div>
          </div>
          <div class="dt_pay">
            <div class="f_price">￥{{item.final_price}}</div>
            <del class="t_price">门店价￥{{item.price}}</del>
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
import { xcpayorders,getxcPayConfig} from '@/api/wx';
import { api } from "@/api/api"
import Bindphone from "@/components/bindPhone"
import {WXinvoke} from "@/util/wxUtil"
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
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.myInfo = userInfo
    this.getXcDetail()
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
        action:'get_shopinfo',
        phone:this.myInfo.phone,
        shopId:this.$route.query.shopId
      })
      if(res.data.code==200){
        this.xcDetail = res.data.result
        this.services = res.data.result.service_list
        this.checkFuntion(this.services[0],0)
      }else if(res.data.code==100){
        localStorage.clear()
        window.location.reload()
      }else{
        this.$message.warning(res.data.message)
      }
    },
    doCreateOrder () {
      let that = this
      const bundle = {
        action:'order_save',
        phone:this.myInfo.phone,
        shop_name:this.xcDetail.shop_name,
        shopId: this.xcDetail.id,
        price: this.current.price,
        final_price: this.current.final_price,
        serviceId:this.current.id
      }
      this.isProcessing = true
      xcpayorders(bundle).then(res => {
        if(res.data.code==200){
          let configdata = {
            order_id:res.data.result.order_id,
            user_id:this.myInfo.user_id
          }
          getxcPayConfig(configdata).then((result)=>{
            WXinvoke(result,response=>{
                if (response.err_msg == "get_brand_wcpay_request:ok") {
                  this.isProcessing = false
                  this.$message.warning('支付成功')    
                  this.isPay = true
                  this.$router.push({ path: '/xcorder1', query: {}});
                }else{
                  this.$router.push({ path: '/xcorder', query: {payData:JSON.stringify(bundle)}});
                }
            })
          })
        }else{
          that.$message.warning('下单失败')
        }
      })  
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
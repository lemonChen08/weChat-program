<template>
    <div class="pad-gas-station">
      <div class="banner-station" v-if="!isLoading">
        <div class="pad-bg">
          <div class="image hx-image centerVertical block">
            <img class="image" :src="item.logo_big || item.logo_small"/>
          </div>
        </div>
        <div class="card-station shadow" v-if="item.name">
          <div class="mask"></div>
          <span class="text-name">
            <strong v-text="item.name"></strong>
            <span v-if="stationPrice" class="tag">
              {{ (stationPrice.priceSX * 10 / stationPrice.priceOfficial).toFixed(1) }} 折
            </span>
          </span>
          <span class="row-price" v-if="stationPrice && oilNumber">
            <span class="price">
              VIP特权价 <strong>￥{{ oilNumber.priceYfq }}</strong>
            </span>
            <span class="officialPrice" >
              国标价 ￥ {{ stationPrice.priceOfficial }}
            </span>
          </span>
          <div class="row-cutLine"></div>
          <span class="row-location">
            <span class="text-location">
              <img class="icon" :src="`${oss}icon-address.png`" alt="">
              <span class="text word-break">{{item.address}}</span>
            </span>
            <button class="btn-distance toLocation" v-if="isBrowser() || isWxReady" @click="toLocation(item)">
              <img class="icon" src="../assets/images/icon-nav-white.png" alt="">
              <span>{{ item.distance ? `${item.distance}km` : '导航' }}</span>
            </button>
          </span>
        </div>
      </div>
    <div class="pad-select-zone" v-if="!isLoading">  
      <div class="item-select" v-if="oilTypes.length">
        <div class="discount" @click="getDiscount" style="height:10vw" v-if="list.length > 0">
          <div  v-for="(item, index) in list" v-if="index < 2"  :key="index" class="tag">满{{ item.threshold + '-' + item.money }} </div>
          <button size="sm" type="main"  >领券</button>
        </div>
        <header class="title">
          选择商品
        </header>
        <div class="pad-options">
          <button :class="['btn-option', oilType === type.value && 'selected']" 
            :key="idx" 
            v-for="(type, idx) in oilTypes"
            @click="doSelectOilType(type.value)">
            {{ type.key | oilType }}
          </button>
        </div>
      </div>
      <div class="item-select" v-if="oilTypes.length">
        <header class="title">
          选择油号
        </header>
        <div class="pad-options">
          <button :class="['btn-option', oilNumber && oilNumber.oilNo === oilNo.oilNo && 'selected']" 
            :key="idx" 
            v-for="(oilNo, idx) in oilNumbers"
            @click="doSelectOilNumber(oilNo)"
            v-text="oilNo.oilName">
          </button>
        </div>
      </div>
      <div class="item-select" v-if="gunNumbers.length">
        <header class="title">
          选择枪号
        </header>
        <div class="pad-options" v-if="gunNumbers.length">
          <button :class="['btn-option', gunNumber === gunNo.gunNo && 'selected']" 
            :key="idx" 
            v-for="(gunNo, idx) in gunNumbers"
            @click="doSelectGunNumber(gunNo.gunNo)">
            {{ gunNo.gunNo }}号
          </button>
        </div>
      </div>
      <div class="item-select" style="margin-top: 2vw;" v-if="!oilTypes.length">
        <div class="hx-emptyset transparent sm"
          style="min-height: 20vw; display: flex;">
          暂无油号信息
        </div>
      </div>
      <div class="item-select" style="margin-top: 2vw;" v-if="oilTypes.length && !gunNumbers.length">
        <div class="hx-emptyset transparent sm"
          style="min-height: 20vw; display: flex;">
          该油号暂无油枪
        </div>
      </div> 
      <div class="item-select special" v-if="gunNumbers.length && gunNumber">
        <header class="title">
          <strong>油价</strong>
          <span class="right color-gray" v-if="!unitPrice">
            正在获取实时价格
          </span>
          <span class="right" v-if="unitPrice">
          <span class="line-through">油站价 {{ oilNumber.priceGun }}元/升</span>
          <span class="priceYfq">{{ oilNumber.priceYfq }}元/升</span>
           
          </span>
        </header>
        <header class="title" @click="selectDiscount" v-if="list.length !== 0">
          <strong>使用优惠券</strong>
          <span class="right" >
            {{ discountBundle.name ? discountBundle.name : '选择优惠券>'}}
            <!-- <span class="line-through">油站价 {{ oilNumber.priceGun }}元/升</span> -->
          </span>
        </header>
        <div class="pad-options" style="padding: 0;">
          <div class="options-label hx-row md">
            <label class="label" style="font-weight: bold; font-size: 4.18vw;"><span>输入价格</span></label>
            <div class="content">
              <input type="number"
                v-model="price" 
                @focus="doScrollBottom"
                @input="onInput" placeholder="请输入金额" style="margin-right: 3vw;"  />
              <span class="unit">元</span>
            </div>
          </div>
          <div class="pad-default-options">
            <div class="pad-default-option" v-for="(opt, idx) in options" :key="idx">
              <button :class="['btn', (price === opt && 'selected')]" @click="doInput(opt)">
                <small>￥</small>{{ opt }}
              </button>
            </div>
          </div>
          <div class="pad-benefit" v-if="benefit">
            约{{amount}}L，加油直降<strong class="color-red" style="font-size: 4.5vw; margin: 0.5vw;">{{ benefit }}</strong>元
          </div>
        </div>  
      </div>  
    </div>  
          <!--  个人积分抵扣金额组件  -->
          <!-- <point-editor
            :price="truePrice"
            switchName="point_enable_czb"
            @change="handleChange"
          />
          <equity-editor
            ref="equity-editor"
            v-if="truePrice && channelInfo.channel_config && channelInfo.channel_config.equity_points_switch"
            :equityTopPrice="benefit"
            :recharge="toRecharge"
            @change="equityChange"
          />
          <div v-if="showAuth" style="margin-bottom:4.5vw;">
            <span class="text-to-vip fee ghyy-bank-tip">
              <div class='_availableAmount' v-if="remain.availableAmount == 0 && ghyyRechargeSwitch == 1">
                  <span>充值上海银行卡最高赠送3.5%，
                  <br/>充{{ rechargePrice }}最高赠送{{ (price * 0.035).toFixed(2) }}元</span>  
                  <span class="color-main" @click="toRoute('/gasolineRecharge')">去充值＞</span> 
              </div>
              <div class='_availableAmount' v-if="remain.availableAmount != 0">
                <span v-if="!myInfo.ghyy_bank_card">您的上海银行卡剩余<strong>{{remain.availableAmount}}</strong>元，<br/>实名后才能使用</span> 
                <span v-if="!myInfo.ghyy_bank_card" class="color-main" @click="toRoute('/creatCard')">去实名＞</span> 
                <span v-if="myInfo.ghyy_bank_card">您的上海银行卡剩余<strong>{{remain.availableAmount}}</strong>元，<br/>充{{rechargePrice}}赠送{{rechargeSend}}元</span> 
                <span v-if="myInfo.ghyy_bank_card && ghyyRechargeSwitch == 1" class="color-main" @click="toRoute('/gasolineRecharge')">去充值＞</span> 
              </div>
            </span>
            <div v-if="myInfo.ghyy_bank_card" style="font-size:4vw;margin-top:3vw;"  @click="toRoute('/bindCardCourse')">如何绑卡？</div>
          </div>
          <button class="g-button black" :disabled="!price || isProcessing || !myInfo.isVip" @click="checkPhone">
            <div v-if="!isProcessing && price && myInfo.phone">
              确认支付 <span style="font-size: 5vw;">{{ finalPayPrice }}</span> 元
            </div>
            <div v-if="!isProcessing && price && !myInfo.phone">
              授权手机号并支付 <span style="font-size: 5vw;">{{ finalPayPrice }}</span> 元
            </div>
            <span v-if="!price">请先输入加油金额</span>
            <span v-if="isProcessing">正在支付中</span>
          </button>
          <span v-if="fee && isRealPriceChannel" class="text-to-vip fee">
            加油通道服务费为 {{ fee }} 元
          </span>
          <span v-if="!myInfo.isVip" class="text-to-vip" @click="toVipLink">
            点此办理会员享受优惠
          </span>
        </div>
      </div>
      <span :class="['color-red text-tips', this.gunNumber ? '' : 'bottom']" v-if="$route.query && $route.query.channel_id == 1793">
        重要提示：请务必先到加油站，与工作人员确认后再付款，切勿先买单后前往加油站，避免异常订单产生。
优惠价格实时更新具体价格以支付时显示为准。
      </span> -->
    </div>
  </div>
</template>
<script>
import { api } from "@/api/api"
export default {
  components: {
  },
  data() {
    return {
      showAuth: false,
      equityBind: false,
      equity_points: 0,
      searchInfo: {},
      isSelect: false,
      discountId: '',
      discountTitle: '选择优惠券 ▶',
      CouponDetail: {
        channel: {
          name: ''
        }
      },
      isBag: true,
      isUse: false,
      showBanner: false,
      showDiscount: false,
      list: [],
      ghyyRechargeSwitch: 0,
      scrollElement: '.pad-gas-station',
      showBindPhone: false,
      id: '',
      currentChannelId: parseInt(this.$route.query.channel_id),
      isWxReady: false,
      isProcessing: false,
      item: {},
      prices: {},
      oilTypes: [],
      remain: {},
      service_fee_rate: '',
      options: [100, 200, 300, 500], // 默认金额选项
      oilType: 1, // 选中的油型
      price: null, // 准备支付的价格
      oilNumber: null, // 选中的油号
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
      isBindCard:  false,
      isPay: true,
      Clipboard,
      authentication: false,
      alertObject: {},
      gunNumbers:''
    };
  },
  created() {
    
  },
  methods: {
    getDiscount () {
      this.showDiscount = true
      this.isUse = false
      // this.requestTicket()
    },
    toLocation (item) {
      try {
        const { lat_gcj02, lng_gcj02, name, address } = item
        // 如果是车主邦的位置使用非百度坐标系
        wechat.openLocation({ 
          lng: lng_gcj02, 
          lat: lat_gcj02, 
          name, 
          address 
        })
        report('加油详情', '点击', '打开导航成功')
      } catch (err) {
        console.log(err)
        report('加油详情', '点击', '打开导航失败')
      }
    },
    doSelectOilType (item) {
      this.oilType = item
      const oilNumbers = this.item.prices.filter(v => v.oilType === this.oilType)
      if (oilNumbers.length >= 1) {
        this.doSelectOilNumber(oilNumbers[0])
      }
    },
    doSelectOilNumber (item) {
      this.oilType = item.oilType
      this.oilNumber = Object.assign({}, item)
      !this.tempInfo && (this.gunNumber = '') // 当没有已选的缓存信息时才置空
    },
    doSelectGunNumber (gunNo) {
      this.gunNumber = gunNo
      scrollTo('.pad-gas-station')
    },
    doInput (value) {
      this.price = value
      scrollTo('.pad-gas-station')
      if (value <= this.discountBundle.threshold) {
        this.discountBundle = {}
      }
    },
    doScrollBottom () {
      let timer = window.setTimeout(() => {
        document.body.scrollTop = document.body.scrollHeight
        window.clearTimeout(timer)
      }, 300)
      scrollToBottom('.pad-gas-station')
    },
    onInput () {
      if (this.price && isNaN(this.price)) {
        this.$hxui.toast.warn('请输入数字')
        this.price = ''
        return
      }
      if (this.price && !isNaN(this.price) && (this.price > 1800 || this.price <= 0)) {
        this.$hxui.toast.warn('单次充值金额在1800元内')
        this.price = this.price <= 0 ? '' : 1800
      }
      const { channel_config } = this.channelInfo
      if (channel_config && channel_config.equity_points_switch && channel_config.equity_points_model === 2) {
        this.showAuth = false
      } else {
        this.showAuth = true
      }
    },
    async getGasDetail(){
      let res = await api.get_station({
        action:'get_station',
        phone:'13631620136',
        gasId:this.$route.params.gasId
      })
      if(res.data.code==200){
        this.item = res.data.result
      }else{
        this.$layer.msg(res.data.message)
      }
    },
  },
  mounted() {
    this.getGasDetail()
  }
};
</script>
<style lang="less" scoped>

.hx-modal>.content {
  background-color:transparent !important;
}

.pad-gas-station {
  padding: 0;
  overflow-y: auto;
  background-color: white;
  position: relative;
  height: 100%;
  .banner-station {
    padding: 0;
    width: 100%;
    display: block;
    height: auto;
    border-bottom: 1px solid  #f6f6f6;
    .pad-bg {
      width: 100%;
      height: 100%;
      display: block;
      position: relative;
      overflow: hidden;
      background-color:  #f6f6f6;
      .image{
         height: 35vw
      }
      .bg-gas-station {
        width: 100%;
        height: auto;
        position: absolute;
        vertical-align: middle;
      }
    }
    .card-station {
      width: calc(100% - 6vw);
      border-radius: 3vw;
      box-shadow: 1px 5px 20px 0px rgba(19, 18, 18, 0.1);
      margin: -10vw 0 0 3vw;
      padding: 3vw 3vw 2vw 3vw;
      .text-name{
        justify-content: end;
        .tag{
          border: none;
          background: rgba(88, 166, 255, .1); 
          color: rgba(88, 166, 255, 1);
          margin-left: 2vw;
          padding: 0 2vw;
        }
      }
      .price{     
        strong{
          font-weight: 500;
          color: #000;
        }
      }
      .toLocation{
        padding: 1vw 2vw;
        right: 1vw;
        display: flex;
      }
      .row-cutLine{
        height: 1px;
        background:  #f6f6f6;
        margin: 3vw 0 2vw 0;
      }
      .toLocation,
      .tag{
        border-radius: 3vw;
      }
     
    }
  }
  .pad-loading-zone {
    display: block;   
    height: 80%; 
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .pad-select-zone {
    padding: 3vw 3vw 12vw 3vw;
    .item-select {
      font-size: 3.8vw;
      display: block;
      .title {
        display: block;
        line-height: 2.4;
        font-size: 3.8vw * 1.1;
      }
      .pad-options {
        padding: 0 0 3vw;
        .btn-option {
          width: 23%;
          height: 8vw;
          border-radius: 1vw;
          border: 1px solid #ECECEC;
          background-color: hsla(0,0%,100%,.93);
          margin:0 2.5vw 1.5vw 0;
          &.selected {
            background-color: rgba(255,188,0,.1);
            color: #000;
            border: 1px solid #000;
          }
          &:nth-child(4n){
           margin-right: 0;
          }
        }
        .unit{
          line-height: 3vw;
        }
        .options-label{
          margin: 1vw 0; 
          padding: 2vw 0 0 0;
          border:none;
          border-top:1px solid #f6f6f6;
        }
        
      }
      &.special {
        padding: 1vw*2 3vw 3vw;
        box-shadow: 0 9px 20px -6px rgba(0,0,0,.1);
        border: 1px solid  #f6f6f6;
        border-radius: 1vw;
        margin-top: 1vw;
        .title {
          padding: 1vw 0 0;
          margin-bottom: 0;
          color: #000;
          .line-through {
            color: #aaa;
            text-decoration: line-through;
            margin-left: 3vw;
          }
          .priceYfq{
            color: #000;
            font-weight: bold;
          }
        }
        .pad-default-options {
          display: flex;
          margin-bottom: 3vw;
          .pad-default-option {
            flex: 1;
            padding: 1vw;
            .btn {
              width: 100%;
              color: #747474;
              padding: 1vw*1.5 0;
              border: 1px solid #ECECEC;
              background-color: hsla(0,0%,100%,.93);
            }
            .btn.selected {
              background-color: rgba(255,188,0,.1);
              color: #000;
              border: 1px solid #000;
            }
          }
        }
        .pad-benefit {
          padding: 0 1vw 1vw;
          background-color: transparent;
          color: #aaa;
          font-size: 3.8vw;
          margin-bottom: 3vw;
          display: block;
        }
      }
    }
  }
}
.text-to-vip {
  line-height: 1.5;
  text-align: center;
  width: 100%;
  display: block;
  font-size: 3.4vw;
  margin-top: 3vw;
  color: red;
  cursor: default;
  text-decoration: underline;
  &.fee {
    color: #aaa;
    text-decoration: none;
    &.ghyy-bank-tip{
      color: #141518;
      text-align: left;
      display: flex;
      justify-content: space-between;
      .orange{
        color: #000;
        margin: 0 1vw;
      }
      ._availableAmount{
        position: relative;
        width: 100%;
        .color-main{
          position: absolute;
          right: 0;
          top: 3vw;
        }
      }
    }
  }
}
.text-tips {
  padding: 0 3vw;
  line-height: 1.6;
  display: block;
  text-align: justify;
  font-size: 12px;
  position: relative;
  margin-top: 3vw;
  &.bottom {
    padding: 0;
    // margin-top: $pm-lg;
  }
}
.openingCard{
  // margin-top: $pm-bg;
  .openingCard-action{
    font-weight: bold;
  }
  .openingCard-text{
    font-size: 3.5vw;
    color:  #f6f6f6;
  }
}
/deep/.discount-modal>.content {
  background-color:transparent !important;
}
.bindCard-course{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(19, 18, 18, 0.6);
  color: hsla(0,0%,100%,.93);
  .bindCard{
    width: 100%;
    position: absolute;
    bottom: 10vw * 1.5;
    left: 0;
    padding: 4vw;
    strong{
      font-size: 4.5vw;
    }
    .tip{
      width: 82%;
      font-size: 3.4vw;
      padding-top: 2vw;
    }
    .how-bindCard{
        display: flex;
        justify-content: start;
        align-items :center;
        margin-top: 10vw;
      .course{
        border: 1px dashed hsla(0,0%,100%,.93);
        width: 35vw;
        border-radius: 1px;
        padding: 2vw;
        text-align: center;
        font-size: 4vw;
        color: #000;
        font-weight: bold;
        
      }
      img{
        width: 10vw;
        height: 10vw;
        margin-left: 3vw;
        // animation: bindCardTip 1.5s infinite;
      }
    }
    .cobyOrderSn{
      width: 10vw * 5;
      height: 10vw;
      // color: $color-dark;
      background: hsla(0,0%,100%,.93);
      // border-radius: $radius-lg;
      display: block;
      margin: 10vw auto 0 auto;
    }
      
  }
  
}
.word-break{
  word-break: break-all;
}
@keyframes bindCardTip
{
    0%  {transform: translateX(0)}
    50% {transform: translateX(-3vw)}
   
}
</style>

<template>
    <div class="pad-gas-station">
      <div class="banner-station" v-if="!isLoading">
        <div class="pad-bg">
          <div class="image hx-image centerVertical block">
            <img class="img" :src="item.gas_logo_big || item.gas_logo_small"/>
          </div>
        </div>
        <div class="card-station shadow" v-if="item.gas_name">
          <div class="mask"></div>
          <span class="text-name">
            <strong v-text="item.gas_name"></strong>
            <!-- <span class="tag">
              {{  }} 折
            </span> -->
          </span>
          <span class="row-price">
            <span class="price">
              VIP特权价 <strong>￥{{ selectInfo.discount_price }}</strong>
            </span>
            <span class="officialPrice" >
              国标价 ￥ {{ selectInfo.official_price }}
            </span>
          </span>
          <div class="row-cutLine"></div>
          <span class="row-location">
            <span class="text-location">
              <img class="icon" src="../assets/images/icon-address.png" alt="">
              <span class="text word-break">{{item.gas_address}}</span>
            </span>
            <!-- <button class="btn-distance toLocation" v-if="isWxReady" @click="toLocation(item)">
              <img class="icon" src="../assets/images/icon-nav-white.png" alt="">
              <span>{{ item.distance ? `${item.distance}km` : '导航' }}</span>
            </button> -->
          </span>
        </div>
      </div>
    <div class="pad-select-zone">  
      <div class="item-select">
        <!-- <div class="discount" @click="getDiscount" style="height:10vw" v-if="list.length > 0">
          <div  v-for="(item, index) in list" v-if="index < 2"  :key="index" class="tag">满{{ item.threshold + '-' + item.money }} </div>
          <button size="sm" type="main"  >领券</button>
        </div> -->
        <header class="title">
          选择商品
        </header>
        <div class="pad-options">
          <button class="btn-option" :class="type.value==selectInfo.oilType?'selected':''" 
            :key="idx" 
            v-for="(type, idx) in oilTypes"
            @click="doSelectOilType(type.value)">
            {{ type.key }}
          </button>
        </div>
      </div>
      <div class="item-select" v-if="item.oilList.length">
        <header class="title">
          选择油号
        </header>
        <div class="pad-options">
          {{oilTypes.value}}{{selectInfo.oil_no}}
          <button class="btn-option" :class="oilTypes.value==selectInfo.oil_no?'selected':''" 
            :key="idx" 
            v-show="oilNo.oil_type==selectInfo.oilType"
            v-for="(oilNo, idx) in item.oilList"
            @click="doSelectOilNumber(oilNo)"
            v-text="oilNo.oil_name">
          </button>
        </div>
      </div>
      <div class="item-select" v-if="item.oilList.length>0">
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
      <div class="item-select" style="margin-top: 2vw;" v-if="!item.oilList.length">
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
          <!-- <span class="right color-gray" v-if="!unitPrice">
            正在获取实时价格
          </span> -->
          <span class="right">
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
          <button class="g-button black" :disabled="!price || isProcessing">
            <div v-if="!isProcessing && price && myInfo.phone && !isPay"  @click="checkPhone">
              确认支付 <span style="font-size: 5vw;">{{ finalPayPrice }}</span> 元
            </div>
            <!-- <div v-if="!isProcessing && price && !myInfo.phone">
              授权手机号并支付 <span style="font-size: 5vw;">{{ finalPayPrice }}</span> 元
            </div> -->
            <span v-if="!price">请先输入加油金额</span>
            <span v-if="isProcessing">正在支付中</span>
            <span v-if="isPay"><router-link to="home">返回首页</router-link></span>
          </button>
        </div>  
      </div>  
    </div>  
          <!--  个人积分抵扣金额组件  -->
          <!-- <point-editor
            :price="truePrice"
            switchName="point_enable_czb"
            @change="handleChange"
          /> -->
          <!-- <equity-editor
            ref="equity-editor"
            v-if="truePrice && channelInfo.channel_config && channelInfo.channel_config.equity_points_switch"
            :equityTopPrice="benefit"
            :recharge="toRecharge"
            @change="equityChange"
          /> -->
          <!-- <div v-if="showAuth" style="margin-bottom:4.5vw;">
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
          </div> -->
          
          <!-- <span v-if="!myInfo.isVip" class="text-to-vip" @click="toVipLink">
            点此办理会员享受优惠
          </span> -->
      <!-- <span :class="['color-red text-tips', this.gunNumber ? '' : 'bottom']" v-if="$route.query && $route.query.channel_id == 1793">
        重要提示：请务必先到加油站，与工作人员确认后再付款，切勿先买单后前往加油站，避免异常订单产生。
优惠价格实时更新具体价格以支付时显示为准。
      </span> -->
  </div>
</template>
<script>
import { api } from "@/api/api"
import { 
  GasStationSource,
  // OilTypes,
  GhyyOrderStatuses,
  oilTypeArray
} from '../util/const'
import {WXinvoke} from "@/util/wxUtil"
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
      oilTypes: [
        { value:1, key: '汽油' },
        { value:2, key: '柴油' },
        { value:3, key: '天然气'}
      ],
      remain: {},
      service_fee_rate: '',
      options: [100, 200, 300, 500], // 默认金额选项
      // oilType: OilTypes.GASOLINE, // 选中的油型
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
      isPay: false,
      authentication: false,
      alertObject: {},
      myInfo:{
        phone:''
      },
      selectInfo:{
        oilType:1
      }
    };
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.myInfo.phone = userInfo.phone
    this.getGasDetail()
  },
  computed:{
    unitPrice () {
      const item = this.oilNumber
      if (!item) {
        return
      }
      const priceGun = parseFloat(item.priceGun)
      const priceYfq = parseFloat(item.priceYfq)
      if (this.service_fee_rate === '') {
        return null
      }
      const result = priceYfq + parseFloat(priceGun - priceYfq) * this.service_fee_rate
      return `${result.toFixed(2)}`
    },
    stationPrice () { // 油站对应油号的国标价
      return this.getPriceByOilNumber(this.item, this.oilNumber && this.oilNumber.oilNo)
    },
    oilNumbers () {
      if (!this.item.prices) {
        return []
      }
      const oilNumbers = this.item.prices.filter(v => v.oilType === this.oilType)
      if (oilNumbers.length >= 1 && !this.$route.query.oil_number) {
        this.doSelectOilNumber(oilNumbers[0])
      }
      return oilNumbers
    },
    gunNumbers () {
      if (!this.oilNumber) {
        return []
      }
      return this.oilNumber.gunNos || []
    },
    amount () { // 加油升数
      if (isNaN(this.price)) {
        return 0
      }
      let data = 0
      if (!this.oilNumber) {
        return
      }
      if (parseInt(this.oilNumber.from) === GasStationSource.CZB) {
        data = this.price / this.oilNumber.priceGun
        return data.toFixed(2)
      } else {
        data = Math.round(this.price / this.oilNumber.priceGun * 100)
        return data / 100
      }
    },
    truePrice () { // 计算后的总价 = 四舍五入到2位小数(输入金额 * 优惠价 / 枪价)
      let truePrice = 0
      if (!this.oilNumber) {
        return 0
      }
      // 当用户选择的油号的优惠价等于枪价时，最终支付的订单价格即用户输入的金额数
      console.log('DATA: ', Math.round(this.price * this.oilNumber.priceYfq / this.oilNumber.priceGun * 100))
      truePrice = Math.round(this.price * this.oilNumber.priceYfq / this.oilNumber.priceGun * 100)
      return truePrice / 100
    },
    servicePrice () { // 加上平台服务费的金额数，因为目前平台服务费为0%，所以等于this.truePrice
      const result = parseFloat(this.truePrice) + (this.item.czb_id ? parseFloat((this.price - this.truePrice) * this.service_fee_rate) : 0)
      return isNaN(result) ? 0 : (Math.floor(result * 100) / 100)
    },
    finalPrice () { // 获取最终展示价格(包括抵扣掉积分)
      console.log('TINGDOU,', this.usePoint)
      const pointPrice = this.usePoint * this.channelInfo.point_integer_ratio / this.channelInfo.point_exchange_ratio || 0
      let result = 0
      if (!this.oilNumber) {
        return '-'
      }
      // 当属于易加油油站的
      if (this.oilNumber.from === GasStationSource.YJY && this.item.fee_rules && this.item.fee_rules.length) {
        result = this.$_yjyCalculate()
      } else {
        result = this.servicePrice - pointPrice
      }
      console.log('FinalPrice', result.toFixed(2))
      return result.toFixed(2)
    },
    finalPayPrice () { // 最终展示在按钮上的金额
      // const pointPrice = this.usePoint * this.channelInfo.point_integer_ratio / this.channelInfo.point_exchange_ratio || 0
      const pointPrice = 0
      let result = this.truePrice - pointPrice
      // if (this.channelInfo.channel_config && this.channelInfo.channel_config.equity_points_switch) {
      //   return (this.price - this.equity_points).toFixed(2)
      // }
      if (this.discountBundle && (this.discountBundle.threshold <= this.price)) {
        result = result - this.discountBundle.money
        console.warn('有优惠券')
        console.log(result, '计算之后')
      }
      console.log('FinalPayPrice', result.toFixed(2))
      return result.toFixed(2)
    },
    fee () {
      if (parseInt(this.oilNumber.from) === GasStationSource.YJY) {
        return Math.round((this.finalPrice - this.finalPayPrice - this.usePoint) * 100) / 100
      } else {
        return 0
      }
    },
    maxConsumePoint () {
      const maxPrice = (this.channelInfo.point_max_apply_ratio / 100) * this.servicePrice
      const maxPoint = Math.floor(maxPrice * (this.channelInfo.point_integer_ratio / this.channelInfo.point_exchange_ratio))
      return maxPoint > this.myPoint ? this.myPoint : maxPoint
    },
    benefit () { // 优惠金额
      // const pointPrice = this.usePoint * this.channelInfo.point_integer_ratio / this.channelInfo.point_exchange_ratio || 0
      const pointPrice = 0
      let result = this.truePrice - pointPrice
      return (Math.round((this.price - parseFloat(result)) * 100) / 100)
    },
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
      // scrollTo('.pad-gas-station')
    },
    doInput (value) {
      this.price = value
      // scrollTo('.pad-gas-station')
      if (value <= this.discountBundle.threshold) {
        this.discountBundle = {}
      }
    },
    doScrollBottom () {
      let timer = window.setTimeout(() => {
        document.body.scrollTop = document.body.scrollHeight
        window.clearTimeout(timer)
      }, 300)
      // scrollToBottom('.pad-gas-station')
    },
    onInput () {
      if (this.price && isNaN(this.price)) {
        this.$layer.msg('请输入数字')
        this.price = ''
        return
      }
      if (this.price && !isNaN(this.price) && (this.price > 1800 || this.price <= 0)) {
        this.$layer.msg('单次充值金额在1800元内')
        this.price = this.price <= 0 ? '' : 1800
      }
      // const { channel_config } = this.channelInfo
      // if (channel_config && channel_config.equity_points_switch && channel_config.equity_points_model === 2) {
      //   this.showAuth = false
      // } else {
      //   this.showAuth = true
      // }
    },
    async getGasDetail(){
      let res = await api.get_station({
        action:'get_station',
        phone:this.myInfo.phone,
        gasId:this.$route.query.gasId
      })
      if(res.data.code==200){
        let data = res.data.result
        this.item = data
        this.$_analyseOptions()
      }else{
        this.$layer.msg(res.data.message)
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
    $_analyseOptions () {
      let oilTypes = []
      const oil_number = this.$route.query.oil_number
      if (!Array.isArray(this.item.oilList)) {
        return
      }
      for (let oliItem of this.item.oilList) {
        console.log(oilTypes)
        console.log(oliItem)
        if (!this.oilTypes.filter(v => v.value === oliItem.oil_type).length && oilTypes.filter(v => v.value == oliItem.oil_type).length==0) {
          let val = this.oilTypes.filter((item)=>{return item.value==oliItem.oil_type})
          oilTypes.push({ 
            key: val[0].key  , 
            value: val[0].value
          })
        }
        // if (oil_number) {
        //   const oilNo = isNaN(oil_number) ? oil_number : parseInt(oil_number)
        //   if (oilNo === price.oilNo) {
        //     this.doSelectOilNumber(price)
        //   }
        // }
      }
      this.oilTypes = oilTypes // 初始化该加油站可以选的商品类型（柴油、汽油或者天然气）
      if (!oil_number && this.oilTypes && this.oilTypes.length === 1) {
        this.selectInfo.oilType = this.oilTypes[0].value
      }
    },
    checkPhone () {
      if (this.myInfo.phone) {
        this.toPay()
      } else {
        this.showBindPhone = true
      }
    },
    toPay () {
      this.isProcessing = true
      // const channel_id = session.get(session.KEY_CURRENT_CHANNEL_ID) || 0
      // let price
      // const { channel_config } = this.channelInfo
      // if (channel_config && channel_config.equity_points_switch) {
      //   if (this.equity_points) {
      //     price = this.price - this.equity_points
      //   } else {
      //     price = this.price
      //   }
      // } else {
      //   price = this.truePrice
      // }
      // let bundle = {
      //   channel_id: parseInt(channel_id),
      //   gas_id: this.id,
      //   gun_id: this.gunNumber,
      //   price: parseFloat(price) * 100,
      //   unit_price: Math.round(parseFloat(this.oilNumber.priceYfq) * 100),
      //   origin_price: Math.round(this.price * 100),
      //   origin_unit_price: Math.round(this.oilNumber.priceGun * 100),
      //   oil_name: this.oilNumber.oilName,
      //   oil_type: this.oilNumber.oilType,
      //   units: parseFloat(this.amount),
      //   gas_from: this.oilNumber.from
      // } 
      // if (this.$route.query.extra) { // 第三方附加参数【省心×方诺科技】
      //   bundle.extra = this.$route.query.extra
      // }
      // if (this.usePoint) { // 第三方积分必须为整数【省心×一点停】
      //   bundle.point = Math.floor(this.usePoint) * this.channelInfo.point_integer_ratio
      // }
      // if (this.discountBundle.id) { // 使用线上加油优惠券【省心×银商加油站】
      //   bundle.coupon_id = this.discountBundle.id
      // }
      // if (channel_config && channel_config.equity_points_switch) {
      //   bundle.equity_points = this.equity_points * 100
      // }
      // let res = await czbOrderApis.create(bundle)
      // report('加油支付', '点击', '创建加油订单')
      let price = this.truePrice
      let gasItem = JSON.parse(this.$route.query.gasItem)
      let data = {
        "gasFrom": gasItem.price.from,
        "gasId": this.$route.query.gasId,
        "gunId": this.gunNumber,
        "oilName": this.oilNumber.oilName,
        "oilType": this.oilNumber.oilType,
        "originPrice": Math.round(this.price * 100),
        "originUnitPrice": Math.round(this.oilNumber.priceGun * 100),
        "price": parseFloat(price) * 100,
        "unitPrice": Math.round(parseFloat(this.oilNumber.priceYfq) * 100),
        "units": parseFloat(this.amount),
        'jydname':this.item.name
      }
      WXinvoke(data,res=>{
        // alert('支付回调'+JSON.stringify(res))
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          this.isProcessing = false
          this.$layer.msg('支付成功')    
          this.isPay = true
        }else{
          this.$router.push({ path: '/jyorder', query: {payData:JSON.stringify(data)}});
        }
      })
        // if (res.code !== 200) {
          
        //   if (res.message === '油站返回错误![平台余额不足]') {
        //     this.isProcessing = false
        //     this.$layer.msg('暂不支持该油站')
        //   } else {
        //     this.isProcessing = false
        //     this.$layer.msg(res.message)
        //   }
        //   return
        // }
        
      // const { id } = res.data
      // toUnitePay(id, `/czbOrder/${id}?success=1`, { isYsPay: this.oilNumber.from === GasStationSource.SHENGXIN })
      // session.save('myBankInfo', {rebate: this.bank.rebate, availableAmount: this.remain.availableAmount, isPay: this.isPay})
      // 
      // report('加油支付', '回调', '创建加油订单成功')
      // if (this.CouponDetail.is_receive !== 0) {
      //   toUnitePay(id, `/czbOrder/${id}?success=1`, { isYsPay: this.oilNumber.from === GasStationSource.SHENGXIN })
      // } else {
      //   this.showBanner = true
      //   setTimeout(() => {
      //     toUnitePay(id, `/czbOrder/${id}?success=1`, { isYsPay: this.oilNumber.from === GasStationSource.SHENGXIN })
      //   }, 3000)
      // }
    },
  },
  mounted() {
    
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
         height: 35vw;
         width:100%;
      }
      .bg-gas-station {
        width: 100%;
        height: auto;
        position: absolute;
        vertical-align: middle;
      }
    }
    .card-station {
      // width: calc(100% - 6vw);
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
        text-align:left;
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
          overflow:hidden;
          strong{float:left;}
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
.hx-image {
  position: relative;
  background-color: transparent;
}
.hx-image.block {
    height: 100%;
    width: 100%;
    display: block;
}
.hx-image .img {
    display: block;
}
.hx-image.centerVertical .img {
    width: 100%;
    height: auto;
    top: 50%;
    position: absolute !important;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
}
.hx-image.centerHorizontal .img {
    height: 100%;
    width: auto;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
}
.card-station {
  padding: 3vw 0;
  position: relative;
  border-bottom: 1px solid #eee;
  background-color: white;
  box-sizing: border-box;
}
.card-station.shadow {
    -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}
.card-station .mask {
    height: 100%;
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}
.card-station .pad-gasoline-detail {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    height: 20vw;
    margin-bottom: 0;
}
.card-station .pad-gasoline-detail .pad-img-cover {
      width: 20vw;
      min-width: 20vw;
      height: 20vw;
      display: inline-block;
      overflow: hidden;
      position: relative;
      background-color: #f6f6f6;
      border-radius: 1vw;
}
.card-station .pad-gasoline-detail .pad-img-cover .img-cover {
        height: 100%;
        border-radius: 1vw;
        left: 50%;
        position: absolute;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -o-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
}
.card-station .pad-gasoline-detail .pad-station-detail {
      -webkit-box-flex: 1;
          -ms-flex: 1;
              flex: 1;
      min-width: 16.8vw;
      vertical-align: top;
      float: right;
      margin-left: 3vw;
}
.card-station .pad-gasoline-detail .pad-guide {
      height: 100%;
      min-width: 14vw;
      width: 14vw;
      margin-left: 2vw;
      display: -webkit-inline-box;
      display: -ms-inline-flexbox;
      display: inline-flex;
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
.card-station .pad-gasoline-detail .pad-guide .icon-guide {
        height: 7vw;
        width: 7vw;
        margin-bottom: 2vw;
}
.card-station .pad-gasoline-detail .pad-guide .text-distance {
        font-size: 3.5vw;
}
.card-station .text-name {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 1.5;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    overflow: auto;
    color: black;
    font-size: 4vw;
    font-weight: 500;
}
.card-station .text-name .name {
      width: calc(100% - 14vw);
      display: inline-block;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
}
.card-station .text-name .tag {
      background-color: white;
      color: #aaa;
      font-size: 3.5vw;
      padding: 0 1vw;
      right: 0;
      height: 6vw;
      line-height: 6.5vw;
      display: block;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      border: 1px solid #aaa;
      border-radius: 1vw;
}
.card-station .row-gasoline-price {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    margin: 4vw 0 0;
}
.card-station .row-gasoline-price .price, .card-station .row-gasoline-price .officialPrice {
      display: -webkit-inline-box;
      display: -ms-inline-flexbox;
      display: inline-flex;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      font-size: 3vw;
}
.card-station .row-gasoline-price .price strong, .card-station .row-gasoline-price .officialPrice strong {
        font-size: 4vw;
        font-size: 4.3vw;
}
.card-station .row-gasoline-price .price {
      color: #ff5a50;
}
.card-station .row-gasoline-price .officialPrice {
      color: #c1c1c1;
      margin-left: 3vw;
      color: #caa47c;
      background-color: #fcf3ec;
      padding: 0 1vw;
}
.card-station .row-location {
    font-size: 3.2vw;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
}
.card-station .row-location .text-location {
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      width: 100%;
      display: block;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
}
.card-station .row-location .text-location .icon {
        height: 3.5vw;
        width: auto;
        margin-right: 1vw;
}
.card-station .row-location .btn-distance {
      background-color: #FFBC00;
      color: white;
      font-size: 3.5vw;
      border-radius: 1vw;
      display: -webkit-inline-box;
      display: -ms-inline-flexbox;
      display: inline-flex;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      padding: 1vw;
      position: relative;
      width: 23.1vw;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
}
.card-station .row-location .btn-distance .icon {
        height: 4.2vw;
        width: auto;
}
.right{float:right;}
.hx-row {
  width: 100%;
  padding: 1vw 0;
  color: #474747;
  background-color: white;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-bottom: 1px solid #f6f6f6;
}
.hx-row.sm .label {
    padding: 0;
}
.hx-row.null {
    padding: 0 !important;
}
.hx-row.center {
    text-align: center;
}
.hx-row.left div.content input, .hx-row.left div.content textarea {
    text-align: left;
}
.hx-row label, .hx-row .content {
    display: inline-block;
    font-size: 3.8vw;
    vertical-align: top;
}
.hx-row.oneline {
    display: block;
    padding: 0;
}
.hx-row.oneline label {
      display: block;
      width: 100%;
}
.hx-row.oneline .content {
      width: 100%;
}
.hx-row.oneline .content .input, .hx-row.oneline .content textarea, .hx-row.oneline .content input {
        text-align: left;
}
.hx-row label {
    min-width: 20vw;
    margin-right: 1vw;
    padding: 2vw 0;
    color: black;
    font-weight: 500;
    font-size: 3.8vw;
    line-height: 1.6;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
}
.hx-row label .sub-label {
      font-size: 3.5vw;
      color: #aaa;
      font-weight: 400;
}
.hx-row label.multiLine {
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
              flex-direction: column;
}
.hx-row label.title {
      font-size: 3.8vw;
      font-weight: 800;
}
.hx-row label .tip {
      color: #FFBC00;
      font-size: 3.5vw;
}
.hx-row div.content {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    position: relative;
    padding: 0;
    vertical-align: top;
    text-align: right;
    -webkit-box-flex: 1;
        -ms-flex: 1;
            flex: 1;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: end;
        -ms-flex-pack: end;
            justify-content: flex-end;
}
.hx-row div.content:hover .btn-clear {
      display: -webkit-inline-box;
      display: -ms-inline-flexbox;
      display: inline-flex;
}
.hx-row div.content .hx-switch {
      top: 50%;
      position: absolute !important;
      transform: translateY(-50%);
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
}
.hx-row div.content .text {
      padding: 2vw 0 2vw 2vw;
      width: 100%;
      display: block;
      border-radius: 2vw;
      line-height: 1.6;
      word-break: break-all;
}
.hx-row div.content .text.left {
        text-align: left;
}
.hx-row div.content .text.border {
        border: 1px solid #c1c1c1;
}
.hx-row div.content .text.disabled {
        border: 1px solid #f6f6f6;
        background-color: #f6f6f6;
}
.hx-row div.content .text.tip {
        font-size: 3.5vw;
        font-weight: 300;
        color: #aaa;
        line-height: 3.5vw;
        height: 3.5vw;
        margin-top: 1vw;
}
.hx-row div.content .divider {
      display: inline-block;
      margin: 0 3vw 0;
      width: 1px;
      height: 40%;
      background-color: #f6f6f6;
}
.hx-row div.content button.btn-text {
      background-color: transparent;
      border: none;
      color: #FFBC00;
      padding: 0;
      min-width: 20vw;
      cursor: default;
}
.hx-row div.content input [type='file'] {
      position: absolute;
      visibility: hidden;
}
.hx-row div.content input, .hx-row div.content select {
      border: none;
      text-align: right;
      -webkit-box-flex: 1;
          -ms-flex: 1;
              flex: 1;
      font-size: 3.8vw;
      padding-right: 0;
}
.hx-row div.content textarea {
      -webkit-box-flex: 1;
          -ms-flex: 1;
              flex: 1;
      display: block;
      font-size: 3.8vw;
      line-height: 1.6;
      padding: 2vw 0;
      height: auto;
      border: none;
      text-align: right;
}
.hx-row div.content textarea + .degree {
      top: auto;
      bottom: 0;
      height: 10vw;
      line-height: 10vw;
}
.hx-row div.content textarea ~ .btn-clear {
      top: auto;
      bottom: 0;
}
.hx-row div.content .pad-dropdown {
      position: absolute;
      top: 11vw;
      left: 0;
      width: 100%;
      padding: 3vw;
      z-index: 123;
      display: inline-block;
      background-color: white;
      opacity: .0;
      visibility: hidden;
      -webkit-box-shadow: 0 5px 20px -6px rgba(0, 0, 0, 0.3);
      box-shadow: 0 5px 20px -6px rgba(0, 0, 0, 0.3);
      transition: all 0.4s;
      -webkit-transition: all 0.4s;
      -moz-transition: all 0.4s;
      -o-transition: all 0.4s;
      -ms-transition: all 0.4s;
}
.hx-row div.content .pad-dropdown.show {
        visibility: visible;
        opacity: 1.0;
}
.hx-row div.content .pad-tags {
      width: 100%;
      padding: 0;
      display: block;
      min-height: 7vw;
}
.hx-row div.content .pad-tags .tag {
        padding: 0 0 0 3vw;
        height: 7vw;
        line-height: 7vw;
        background-color: #FFBC00;
        display: inline-block;
        font-size: 3.5vw;
        font-weight: 300;
        color: white;
        margin: 0 0.5vw 1vw 0;
        border-radius: 7vw 7vw;
        -webkit-border-radius: 7vw 7vw;
        -moz-border-radius: 7vw 7vw;
        -o-border-radius: 7vw 7vw;
        -ms-border-radius: 7vw 7vw;
}
.hx-row div.content .pad-tags .tag span {
          width: auto;
          display: inline-block;
          height: 7vw;
          line-height: 7vw;
          margin-right: 1vw;
          font-size: 3.5vw;
}
.hx-row div.content .pad-tags .tag .btn-remove {
          color: rgba(255, 255, 255, 0.93);
          width: 7vw;
          height: 7vw;
          display: inline-block;
          font-size: 4.3vw;
          font-weight: 100;
          float: right;
          background-color: transparent;
}
.hx-row div.content .pad-tags .tag .btn-remove:hover {
            color: #ff5a50;
}
.hx-row div.content .for-image {
      height: 120px;
      display: inline-block;
      overflow: hidden;
      position: relative;
}
.hx-row div.content .for-image img {
        margin-right: 0;
}
.hx-row div.content .for-image .dot {
        position: absolute;
        right: 8px;
        top: 4px;
        cursor: default;
        display: block;
        height: 5vw;
        line-height: 5vw;
        padding: 0 0.5vw;
        font-size: 10px;
        border-radius: 2vw;
        -webkit-border-radius: 2vw;
        -moz-border-radius: 2vw;
        -o-border-radius: 2vw;
        -ms-border-radius: 2vw;
        background-color: #aaa;
        color: rgba(255, 255, 255, 0.93);
}
.hx-row div.content .for-image .dot:hover {
          background-color: #a5a5a5;
}
.hx-row div.content .for-image .dot.clear {
          background-color: #FFBC00;
          color: white;
}
.hx-row div.content .for-image .dot.clear:hover {
            background-color: #f5b400;
}
.hx-row div.content .for-image .empty-image {
        height: 120px;
        width: 160px;
        line-height: 120px;
        text-align: center;
        background-color: #f6f6f6;
        color: #aaa;
        border-radius: 2vw;
        -webkit-border-radius: 2vw;
        -moz-border-radius: 2vw;
        -o-border-radius: 2vw;
        -ms-border-radius: 2vw;
        font-size: 4.3vw;
        padding: 0;
}
.hx-row div.content .for-image.preview:after {
        content: '\67E5\770B\5927\56FE';
        color: white;
        background-color: rgba(0, 0, 0, 0.6);
        visibility: hidden;
        opacity: .0;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        font-weight: 200;
        line-height: 120px;
        text-align: center;
        border-radius: 2vw;
        -webkit-border-radius: 2vw;
        -moz-border-radius: 2vw;
        -o-border-radius: 2vw;
        -ms-border-radius: 2vw;
        transition: all 0.4s;
        -webkit-transition: all 0.4s;
        -moz-transition: all 0.4s;
        -o-transition: all 0.4s;
        -ms-transition: all 0.4s;
}
.hx-row div.content .for-image.preview:hover:after {
        opacity: 1.0;
        visibility: visible;
}
.hx-row div.content .icon {
      height: 4.56vw;
      width: auto;
      margin-left: 1vw;
}
.hx-row div.content .btn-clear {
      top: 50%;
      position: absolute !important;
      transform: translateY(-50%);
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      right: 3vw;
      height: 18px;
      width: 18px;
      border-radius: 30px;
      padding: 0;
      display: none;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
      background-color: #c1c1c1;
}
.hx-row div.content .btn-clear img.icon {
        width: 60%;
        height: 60%;
        border: none;
        margin: 0;
}
.hx-row div.content .btn-clear:hover {
        background-color: #FFBC00;
}
.hx-row div.content select {
      -webkit-appearance: none;
      -moz-appearance: none;
           appearance: none;
      border: none;
      text-align: right;
}
.card-station .row-price {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
}
.card-station .row-price + .row-price {
      margin-top: 0.6vw;
}
.card-station .row-price .price, .card-station .row-price .officialPrice, .card-station .row-price .tag {
      display: -webkit-inline-box;
      display: -ms-inline-flexbox;
      display: inline-flex;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      font-size: 3vw;
}
.card-station .row-price .price strong, .card-station .row-price .officialPrice strong, .card-station .row-price .tag strong {
        font-size: 4vw;
}
.card-station .row-price .tag {
      color: #ff8d0a;
      padding: 0 1vw;
      border-radius: 4vw;
      border: 1px solid #ff8d0a;
}
.card-station .row-price .officialPrice {
      color: #c1c1c1;
      margin-left: 3vw;
      text-decoration: line-through;
}
.g-button {
  width: 100%;
  display: block;
  font-size: 4.3vw;
  height: 12vw;
  border-radius: 2vw;
  background-color: #FFBC00;
  color: white;
  -webkit-box-shadow: 0 1vw 3vw rgba(255, 188, 0, 0.2);
          box-shadow: 0 1vw 3vw rgba(255, 188, 0, 0.2);
  font-weight: 400;
}
.g-button.text {
    background-color: transparent;
    color: #747474;
    -webkit-box-shadow: none;
            box-shadow: none;
    text-decoration: underline;
    line-height: 1.5;
}
.g-button.black {
    background-color: black;
    color: white;
    -webkit-box-shadow: 0 1vw 3vw rgba(0, 0, 0, 0.2);
            box-shadow: 0 1vw 3vw rgba(0, 0, 0, 0.2);
}
.g-button.red {
    background-color: #ff5a50;
    color: white;
    -webkit-box-shadow: 0 1vw 3vw rgba(255, 90, 80, 0.2);
            box-shadow: 0 1vw 3vw rgba(255, 90, 80, 0.2);
}
.g-button.green {
    background-color: #52c93f;
    color: white;
    -webkit-box-shadow: 0 1vw 3vw rgba(82, 201, 63, 0.2);
            box-shadow: 0 1vw 3vw rgba(82, 201, 63, 0.2);
}
.g-button.default {
    background-color: #f6f6f6;
    color: white;
    -webkit-box-shadow: 0 1vw 3vw rgba(246, 246, 246, 0.2);
            box-shadow: 0 1vw 3vw rgba(246, 246, 246, 0.2);
    color: #747474;
}
.g-button:disabled {
    background-color: #aaa;
    color: white;
    -webkit-box-shadow: 0 1vw 3vw rgba(170, 170, 170, 0.2);
            box-shadow: 0 1vw 3vw rgba(170, 170, 170, 0.2);
}
</style>

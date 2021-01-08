<template>
  <div>
    <div class="main-box">
      <div class="m-box">
        <div class="bg"></div>
        <div class="m-top f_row">
          <img :src="userData.headimgurl" class="h-img" v-if="userData.headimgurl" />
          <img src="@/assets/images/headImg.jpg" class="h-img" v-else />
          <div class="m-info f_col">
            <div class="mb-7 m-t">
              <span class="c-black">{{userData.nickname}}</span>
              <img :src='"@/assets/images/V" + userData.user_level + "-s.png"' class="m-img" />
              <span class="c-normal">
                <span v-if="userData.user_level == 1">普通会员</span>
                <span v-else-if="userData.user_level == 2">VIP会员</span>
                <span v-else-if="userData.user_level == 3">服务商</span>
                <span v-else-if="userData.user_level == 4">金牌服务商</span>
                <span v-else-if="userData.user_level == 5">分公司服务商</span>
                </span>
            </div>
            <div>
              会员总时长：
              <span class="c-blue">{{userData.member_time}}</span>到期
            </div>
          </div>
        </div>
        <div class="info-box">
          <div class="lever-info">
            <img src="@/assets/images/V4-s.png" class="l-img" />
            <div class="level-r">
              <div>还差1027点经验升级为VIP5</div>
              <div class="l-per">
                <div class="w-per"></div>
              </div>
              <div class="c-t">18973/20000</div>
            </div>
          </div>
          <p class="i-txt">会员升级后可获得如下奖励</p>
          <div class="item-box">
            <div class="i-item">
              <img src="@/assets/images/icon_bf.png" class="i-img" />
              <span>生日特权</span>
            </div>
            <div class="i-item">
              <img src="@/assets/images/icon_bf.png" class="i-img" />
              <span>生日特权</span>
            </div>
            <div class="i-item">
              <img src="@/assets/images/icon_bf.png" class="i-img" />
              <span>生日特权</span>
            </div>
            <div class="i-item">
              <img src="@/assets/images/icon_bf.png" class="i-img" />
              <span>生日特权</span>
            </div>
          </div>
        </div>
        <div class="sel-type">
          <div class="tit">选择类型</div>
          <div class="sel-box">
            <div class="sel-item" :class="{active : currentItem.id === item.id}" v-for="item in priceList" :key="item.id" @click="sectectItem(item)">
              <div>{{item.name}}</div>
              <div class="n-p">
                <span>￥</span>
                <span class="n-price">{{item.price}}</span>
              </div>
              <div class="o-p">
                原价
                <span class="o-price">￥{{item.origin_price || 0}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="mem-box">
          <div class="tit">会员权益详情</div>
          <div class="con">
            生日当天,可以领取专属礼物一份价值66.66元,生日当天,
            可以领取专属礼物一份价值66.66元
          </div>
        </div>
      </div>
      <div class="fix-box">
        <div class="sure-box">
          <div class="l-b">
            <span class="n-p">
              ￥
              <span class="f-bold">{{currentItem.price}}</span>
            </span>
            <span>
              原价
              <span class="line-th">￥{{currentItem.origin_price}}</span>
            </span>
          </div>
          <div class="r-b" @click="joinMember">立即开通</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserInfo,memberPay} from "@/api/mine";
export default {
  data() {
    return {
      userData:{},
      priceList:[],
      currentItem:{},
      isJoin:false
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.getUserInfo()
    this.getMemberPrice()
  },
  methods: {
     //获取用户基本信息
    async getUserInfo(){
      let res = await getUserInfo({action:'get_userinfo',user_id:this.userInfo.user_id})
      let data = res.data.data
      this.userData = data
    },
    // 获取用户价格
    async getMemberPrice(){
      let res = await getUserInfo({action:'get_price'})
      this.priceList = res.data.result
      this.currentItem = this.priceList[0]
    },
    // 选择类型
    sectectItem(item){
      this.currentItem = item
    },
    //开通
    async joinMember(){
      if(this.isJoin) return
      this.isJoin = true
      let res = await memberPay({user_id:this.userInfo.user_id,type:this.currentItem.type,price:this.currentItem.price})
      this.isJoin = false
      if (res.data.code === 200) {
         this.$toast.success('开通成功');
         setTimeout(()=>{
           this.$router.replace({
             path:'/mine'
           })
         },2000)
      }else{
         this.$toast.fail(res.data.message);
      }
    }

  }
};
</script>
<style scoped lang='less'>
.f_row {
  display: flex;
}
.m-box {
  position: relative;
}
.bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 250px;
  background: #f1fcff;
}
.m-top {
  padding: 15px;
  position: relative;
  .m-t {
    display: flex;
    align-items: center;
    margin-bottom: 7px;
  }
  .m-info {
    color: #333;
    font-size: 14px;
  }
  .c-black {
    color: #333;
    font-size: 19px;
    font-weight: 500;
  }
  .c-blue {
    color: #6aabfd;
  }
  .c-normal {
    color: #666;
  }
  .m-img {
    width: 18px;
    height: 18px;
    margin: 0 6px;
  }
  .h-img {
    width: 43px;
    height: 43px;
    border-radius: 50%;
    margin-right: 10px;
  }
}

.info-box {
  position: relative;
  width: 345px;
  height: 200px;
  background: #737c91;
  border-radius: 10px;
  margin: 12.5px 15px;
  .lever-info {
    display: flex;
    padding: 15px;
    color: #333;
    align-items: center;
    font-size: 14px;
    .l-img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
    .l-per {
      width: 264px;
      height: 3px;
      background: #ffffff;
      opacity: 0.3;
      border-radius: 1.5px;
      margin: 8px 0;
      .w-per {
        width: 60%;
        height: 100%;
        background: #3c404b;
      }
    }
    .c-t {
      color: #fff;
      font-size: 12px;
    }
  }
  .i-txt {
    color: #333;
    margin: 15px;
    font-size: 13px;
  }
}
.item-box {
  display: flex;
  color: #fff;
  font-size: 13px;
  .i-item {
    width: 25%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    .i-img {
      width: 43px;
      height: 43px;
      margin-bottom: 11px;
    }
  }
}
.tit {
  height: 48px;
  line-height: 48px;
  font-weight: bold;
  font-size: 15px;
  color: #333;
}
.sel-type {
  padding: 0 15px;
  .sel-box {
    display: flex;
    justify-content: space-around;
    .sel-item {
      width: 105px;
      height: 80px;
      box-shadow: 0 1.5px 4.5px 0 rgba(107, 215, 241, 0.19);
      border-radius: 5px;
      display: flex;
      color: #333;
      font-size: 11px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .o-p {
        color: #999;
        margin-top: 5px;
        font-size: 12px;
        .o-price {
          text-decoration: line-through;
        }
      }
      .n-p {
        color: #fa4c42;
        margin-top: 5px;
        font-size: 13px;
        font-weight: bold;
        .n-price {
          font-size: 30px;
        }
      }
    }
    .active{
      background: #F1FCFF;
    }
  }
}
.mem-box {
  margin: 23px 0 80px;
  padding: 0 15px;
  .con {
    color: #666;
    font-size: 14px;
    line-height: 25px;
  }
}
.fix-box {
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1fcff;
  border: 1px solid #cacacb;
  .sure-box {
    width: 326px;
    height: 46px;
    border-radius: 40px;
    background: #fff;
    display: flex;
    div {
      width: 50%;
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
    }
    .r-b {
      background: #6aabfd;
      color: #fff;
      justify-content: center;
      align-items: center;
      border-radius: 0 40px 40px 0;
    }
    .l-b {
      color: #999;
      font-size: 12px;
      .n-p {
        color: #ff4444;
        font-size: 16px;
      }
      .f-bold {
        font-weight: bold;
        font-size: 28px;
        margin-right: 10px;
      }
      .line-th {
        text-decoration: line-through;
      }
    }
  }
}
</style>
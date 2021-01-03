<template>
  <div class="container">
    <div class="t-box">
      <img src="@/assets/images/v0.png" class="v-img" />
      <img src="@/assets/images/v1.png" class="v-img" />
      <img src="@/assets/images/v2.png" class="v-img" />
      <img src="@/assets/images/v3.png" class="v-img" />
      <img src="@/assets/images/v4.png" class="v-img" />
    </div>
    <div class="b-box">
      <p class="b-tit">我的福利信息</p>
      <div class="s-box">
        <div class="s-item">
          <div class="l-b">
            <img src="@/assets/images/icon_bf.png" class="s-img" />
            <div class="f_col">
              <div class="c-name">生日福利</div>
              <div class="c-txt">加油折上折，充值最高赠送3.5%</div>
            </div>
          </div>
          <div class="r-btn">领取</div>
        </div>
        <div class="s-item">
          <div class="l-b">
            <img src="@/assets/images/icon_gift.png" class="s-img" />
            <div class="f_col">
              <div class="c-name">升级礼包</div>
              <div class="c-txt">加油折上折，充值最高赠送3.5%</div>
            </div>
          </div>
          <div class="r-btn">领取</div>
        </div>
        <div class="s-item">
          <div class="l-b">
            <img src="@/assets/images/icon_welfare.png" class="s-img" />
            <div class="f_col">
              <div class="c-name">福利中心</div>
              <div class="c-txt">加油折上折，充值最高赠送3.5%</div>
            </div>
          </div>
          <div class="r-btn">领取</div>
        </div>
        <div class="s-item">
          <div class="l-b">
            <img src="@/assets/images/icon_privilege.png" class="s-img" />
            <div class="f_col">
              <div class="c-name">账户特权</div>
              <div class="c-txt">加油折上折，充值最高赠送3.5%</div>
            </div>
          </div>
          <div class="r-btn">领取</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.container {
  padding: 12px 15px;
}
.t-box {
  display: flex;
  .v-img {
    margin-right: 11px;
    width: 55px;
    height: 80px;
  }
}
.b-box {
  margin-top: 30px;
  .b-tit {
    height: 48px;
    line-height: 48px;
    color: #333;
    font-size: 15px;
    font-weight: 500;
  }
  .s-item {
    margin-top: 17px;
    font-size: 14px;
    color: #333;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 1.5px 4.5px 0 rgba(107, 215, 241, 0.19);
    border-radius: 10px;
    align-items: center;
    padding-right: 20px;
    .l-b {
      display: flex;
    }
    .c-txt {
      color: #666;
      font-size: 11px;
      margin-top: 6px;
    }
    .s-img {
      width: 43px;
      height: 43px;
      margin-right: 10px;
      margin: 15px 10px 15px 8px;
    }
    .r-btn {
      color: #fff;
      font-size: 12px;
      width: 49px;
      height: 22.5px;
      text-align: center;
      line-height: 22.5px;
      border-radius: 12px;
      background: #46b2ff;
    }
  }
}
.f_col {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
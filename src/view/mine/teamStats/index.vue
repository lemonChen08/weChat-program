<template>
  <div>
    <div class="stats-box">
      <div class="s-item">
        <div class="c-num c-red">89</div>
        <div>用户总数</div>
      </div>
      <div class="s-item">
        <div class="c-num c-green">89</div>
        <div>昨日新增用户</div>
      </div>
      <div class="s-item">
        <div class="c-num c-yellow">89</div>
        <div>直接用户</div>
      </div>
      <div class="s-item">
        <div class="c-num c-blue">89</div>
        <div>间接用户</div>
      </div>
    </div>
    <div class="c-box">
      <p class="tit">选择类型</p>
      <div class="c-item">
        <span>总交易量(元)：</span>
        <span class="c-money">1954369.23</span>
      </div>
      <div class="c-item">
        <span>昨天交易(元)：</span>
        <span class="c-money">189.23</span>
      </div>
    </div>
    <div class="s-btn">查看下级会员</div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.stats-box {
  display: flex;
  flex-wrap: wrap;
  padding: 13px 15px 5px;
  justify-content: space-between;
  .s-item {
    height: 72px;
    width: 165px;
    box-shadow: 0 1.5px 4.5px 0 rgba(107, 215, 241, 0.19);
    border-radius: 5px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 15px;
    color: #333;
    font-size: 14px;
    .c-num {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .c-red {
      color: #fa4c42;
    }
    .c-green {
      color: #37d6b6;
    }
    .c-yellow {
      color: #ffbd3e;
    }
    .c-blue {
      color: #46b2ff;
    }
  }
}
.tit {
  height: 48px;
  color: #333;
  font-size: 15px;
  font-weight: 500;
  padding-left: 15px;
  line-height: 48px;
}
.c-item {
  color: #333;
  font-size: 14px;
  height: 48px;
  display: flex;
  align-items: center;
  margin: 0 15px;
  padding: 0 15px;
  border-bottom: 1px solid #fafafa;
  justify-content: space-between;
  .c-money {
    font-size: 16px;
    font-weight: bold;
  }
}
.s-btn{
    color:#fff;
    font-size: 14px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    width: 320px;
    background: #ffbd3e;
    border-radius: 28px;
    margin: 100px auto 0;
}
</style>
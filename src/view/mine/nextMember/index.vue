<template>
  <div>
    <div class="c-search">
      <div class="sea-input sel-i">
        <van-icon name="search" />
        <input placeholder="请输入手机号" />
      </div>
      <div class="sel-i w-80">
        <span class="mr-8">车型</span>
        <van-icon name="play" />
      </div>
      <div class="sel-i w-80">
        <span class="mr-8">升序</span>
        <van-icon name="play" />
      </div>
    </div>
    <div class="t-num">总人数：89</div>
    <div class="t-list">
      <div class="t-item">
        <div class="t-i">

        </div>
        <div class="m-i"></div>
        <div class="t-i"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scope>
.c-search {
  height: 48px;
  display: flex;
  padding: 0 15px;
  align-items: center;
  .sea-input {
    width: 154px;
    .van-icon-search {
      font-size: 20px;
      margin: 0 5px 0 10px;
    }
  }
  .w-80 {
    width: 80px;
    justify-content: center;
    margin-left: 15px;
  }
  .sel-i {
    height: 33px;
    background: #fafbfd;
    border-radius: 2.5px;
    display: flex;
    align-items: center;
    color: #999;
    font-size: 14px;
    .van-icon-play {
      transform: rotate(90deg);
    }
    .mr-8 {
      margin-right: 8px;
    }
  }
}
.t-num{
    width: 318px;
    height: 52.5px;
    color: #fff;
    font-size: 16px;
    text-align: center;
    line-height: 52.5px;
    margin: 13.5px auto 10px;
    border-radius:5px;
    font-weight: bold;
    background: #ffbd3e;
}
.t-item{
    
}
</style>
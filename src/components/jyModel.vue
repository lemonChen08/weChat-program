<template>
  <div class="width_100 flex">
    <img :src="item.gas_logo_big" alt class="ls-img" />
    <div class="ls-r">
      <div class="l-name">{{item.gas_name}}</div>
      <div class="l-price f_row">
        <span class="o-price">￥{{item.official_price}}</span>
        <span class="n-price">￥{{item.discount_price || 0}}/L</span>
      </div>
      <div class="l-add">
        <van-icon name="location-o" />
        <span>{{item.gas_address}}</span>
      </div>
      <div class="l-distance">驾车全程约{{item.juli/100}}公里</div>
    </div>
    <div class="add-y">立即加油</div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      value: ""
    }
  },
  data(){
      return {

      }
  }
};
</script>
<style scoped>
.ls-top {
  border-radius: 10px;
  padding: 15px;
  position: relative;
  box-shadow: 0 1.5px 4.5px 0 rgba(107, 215, 241, 0.19);
}
.ls-img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.l-name {
  color: #333;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
}

.l-price {
  align-items: center;
}
.o-price {
  color: #666;
  font-size: 11px;
  text-decoration: line-through;
}

.n-price {
  color: #fa4c42;
  font-size: 18px;
  margin-left: 6px;
}
.l-add {
  color: #666;
  font-size: 11px;
  font-weight: bold;
  margin-top: 10px;
  white-space: nowrap; 
  max-width: 270px;
  text-overflow: ellipsis;
  overflow: hidden;
}
.l-distance {
  font-size: 11px;
  color: #333;
  font-weight: bold;
  margin-top: 8px;
}
.add-y {
  width: 75px;
  height: 23px;
  border-radius: 24px;
  line-height: 23px;
  text-align: center;
  color: #fff;
  background: #46b2ff;
  position: absolute;
  right: 22px;
  top: 13px;
  font-size: 12px;
  color: #fff;
}
.width_100{
    width:100%;
}
.flex{
    display: flex;
}
</style>
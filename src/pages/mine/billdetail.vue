<template>
  <div class="billdetail">
    <div class="price">
      <p>+1.00</p>
      <p>交易成功</p>
    </div>
    <div class="info-item">
      <p>商品说明</p>
      <p>优惠券推荐奖励</p>
    </div>
    <div class="info-item">
      <p>创建时间</p>
      <p>2018-08-01 18:39</p>
    </div>
    <div class="info-item">
      <p>订单号</p>
      <p>201808011839111111276543567</p>
    </div>
  </div>
</template>
<script>
import { loginMixin } from "@/mixins";
export default {
  mixins: [loginMixin],
  data: () => ({}),
  methods: {}
};
</script>
<style lang="less" scoped>
.billdetail {
  padding-top: 80rpx;
  .price {
    text-align: center;
    p:first-child {
      font-size: 70rpx;
      font-weight: 700;
    }
    p:last-child {
      font-size: 36rpx;
      color: #999;
    }
  }
  .info-item {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    padding: 20rpx;
    font-size: 28rpx;
  }
}
</style>



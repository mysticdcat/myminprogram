<template>
  <div class="bill">
    <div
      class="bill-item"
      @click="goTobilldetail"
    >
      <div class="item-left">
        <div>赏</div>
        <div>
          <p>推荐奖励</p>
          <p>2018-10-28</p>
        </div>
      </div>
      <div class="item-right">+8.88元</div>
    </div>
    <div
      class="bill-item"
      @click="goTobilldetail"
    >
      <div class="item-left">
        <div>赏</div>
        <div>
          <p>推荐奖励</p>
          <p>2018-10-28</p>
        </div>
      </div>
      <div class="item-right">+8.88元</div>
    </div>
    <div
      class="bill-item"
      @click="goTobilldetail"
    >
      <div class="item-left">
        <div>赏</div>
        <div>
          <p>推荐奖励</p>
          <p>2018-10-28</p>
        </div>
      </div>
      <div class="item-right">+8.88元</div>
    </div>
    <div
      class="bill-item"
      @click="goTobilldetail"
    >
      <div class="item-left">
        <div>赏</div>
        <div>
          <p>推荐奖励</p>
          <p>2018-10-28</p>
        </div>
      </div>
      <div class="item-right">+8.88元</div>
    </div>
  </div>
</template>
<script>
import { loginMixin } from "@/mixins";

export default {
  mixins: [loginMixin],
  data: () => ({}),
  methods: {

    goToBill() {
      wx.navigateTo({
        url: `/pages/mine/bill`
      });
    },

    goTobilldetail() {
        console.log(132)
      wx.navigateTo({
        url: `/pages/mine/billdetail`
      });
    },
  },


};
</script>
<style lang="less" scoped>
.bill {
  .bill-item {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    padding: 20rpx;
    align-items: center;
    border-bottom: 1px solid #ddd;
    .item-left {
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      div:first-child {
        width: 1.2rem;
        height: 1.2rem;
        background-color: #e7561f;
        border-radius: 50%;
        font-size: 60rpx;
        text-align: center;
        line-height: 1.2rem;
        color: #fff;
      }
      div:last-child {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        flex-direction: column;
        padding: 20rpx;
        font-size: 30rpx;
        p:last-child {
          color: #999;
        }
      }
    }
    .item-right {
      color: #e7561f;
      font-size: 46rpx;
    }
  }
}
</style>



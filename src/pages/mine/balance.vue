<template>
  <div class="balance">
    <div class="deposit">
      <div>
        <p>账户余额(元)</p>
        <p>{{balance.balance}}</p>
      </div>
      <div><button>立即提现</button></div>
    </div>
    <div class="info">
      <div>
        <p>提现中（元）</p>
        <p>{{balance.withdraw_now}}</p>
      </div>
      <div>
        <p>可提现（元）</p>
        <p>{{balance.balance}}</p>
      </div>
      <div>
        <p>累计提现</p>
        <p>{{balance.withdraw_aleady}}</p>
      </div>
    </div>
    <div
      class="record"
      @click="goToBill"
    >
      查看账单明细
    </div>
  </div>
</template>
<script>
import { loginMixin } from "@/mixins";
import { mapState } from 'vuex';

export default {
  mixins: [loginMixin],
  data: () => ({
  }),
    computed: {
        ...mapState('user', ['balance']),
    },
  methods: {
    goToBill() {
      wx.navigateTo({
        url: `/pages/mine/bill`
      });
    },
      getBalance(){
          this.$store.dispatch('user/getBalanceMore', {});
      },

  },

    onReady() {
        this.getBalance();
    }
};
</script>
<style lang="less" scoped>
.balance {
  font-size: 30rpx;

  .deposit {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    button {
      color: #fff;
      background: #999;
      width: 190rpx;
      font-size: 30rpx;
      height: 60rpx;
      line-height: 60rpx;
      background-color: #ff4433;
    }
    div {
      p:first-child {
        font-size: 30rpx;
        color: #999;
      }
      p:last-child {
        font-size: 46rpx;
        color: #ff4433;
      }
    }
  }
  .info {
    padding: 20rpx 0;
    background-color: #f5f5f5;
    width: 100%;
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    div {
      p:first-child {
        color: #999;
      }
      p:last-child {
        padding-top: 20rpx;
        text-align: center;
        font-size: 46rpx;
        color: #ff4433;
      }
    }
  }
  .record {
    text-align: right;
    padding: 20rpx;
    color: #999;
  }
}
</style>



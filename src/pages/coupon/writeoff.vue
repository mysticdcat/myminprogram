<template>
  <div id="intro">
        <div class="coupon-card">
            <div style="padding: 20rpx;">
                <coupon
                    height="270rpx"
                    width="99%"
                    :value="detail.value"
                    :offset="detail.offset"
                    :type="detail.promotion_type"
                    :bgColor="couponBgColor"
                    :expired="{days: 0, start_at: detail.start_at, end_at: detail.end_at}"
                />
            </div>
        </div>

        <div style="margin-top: 50rpx; color: #777;">
            <div style="text-align:center; font-size: 26rpx;">
                <div>
                    <p style="margin: 20rpx auto; font-size: 35rpx;">{{detail.promotion && detail.promotion.title}}</p>
                    <p>今日已核销：<span style="color: #f43;">{{detail && detail.today_used}}</span></p>
                </div>
            </div>
        </div>
        <zan-panel title="核销须知">
            <div class="coupon-intro">
                <text>{{ intro }}\n 劵有效期：{{detail.start_at}} ~ {{detail.end_at}}</text>
            </div>
        </zan-panel>

        <zan-panel title="备注说明">
            <div class="coupon-intro">
                <text>{{detail.promotion && detail.promotion.content}}</text>
            </div>
        </zan-panel>

        <div style="height: 100rpx;"></div>
        <div class="coupon-form-section">
            <section>
                <button v-if="detail.id > 0" class="coupon-form-submit" @click="doSubmit">确认核销</button>
                <button v-else class="coupon-form-submit coupon-form-disabled">确认核销</button>
            </section>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { formatPromotionIntro } from "@/utils";
import wxapi from "@/utils/wxapi";
import coupon from "@/components/coupon";
import { sleep } from '@/utils';

export default {
    components: {
        coupon,
    },

    computed: {
        ...mapState("coupon", ["detail"]),

        valueTxt() {
            return this.detail.promotion_type === 1 ? this.detail.value : this.detail.value * 100;
        },

        intro() {
            return this.detail.promotion ? formatPromotionIntro(this.detail.promotion, false) : '';
        },

        couponBgColor() {
            return
                this.detail.promotion.type === 1
                ? "#D2415F"
                : "#f43"
        }
    },

    methods: {
        async doSubmit() {
            // if (!this.detail || !this.detail.id) {
                wx.showToast({
                    icon: 'none',
                    title: '无效的优惠劵信息',
                })
                await sleep(2000);
                wx.switchTab({
                    url: '/pages/index/main',
                })
                return false;
            // }
        },
    }
};
</script>

<style lang="less" scoped>
.coupon-intro {
  line-height: 45rpx;
  padding: 30rpx 40rpx;
  font-size: 26rpx;
  color: #666;
}
.coupon-card {
  position: relative;
  top: 30rpx;
  margin: 0 auto;
  width: 90%;
  border-radius: 10rpx;
  box-shadow: 0 5px 10px rgba(29, 49, 85, 0.28);
  background: #fff;
}

.coupon-form-submit {
    background: #f43;
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
    color: #fff;
    font-size: 30rpx;
    font-weight: 200;
    padding: 0;
    border-radius: 0;
}

.coupon-form-disabled {
    background:  rgba(150, 150, 150, .7);
}

.coupon-form-section {
    border-top: 1rpx solid #eee;
    border-bottom: 1rpx solid #eee;
    padding-left: 10rpx;
    background: #f7f7f7;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    height: 90rpx;
    width: 100%;
    padding: 0;
    border: none;
    box-shadow:0px -4px 15px rgba(100, 100, 100, .3);

    section {
        padding: 0;
    }
}
</style>

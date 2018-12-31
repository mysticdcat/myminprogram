<template>
    <div class="coupon-wrap" :style="{height: height, width: width}">
        <div class="coupon-left" :style="{background: 'radial-gradient(transparent 0, transparent 10rpx, ' + bgColor + ' 10rpx)', backgroundSize: '30rpx 30rpx', backgroundPosition: '16rpx 6rpx'}"></div>

        <div class="coupon-content" :style="{background: bgColor}">

            <div class="coupon-main">
                <p class="coupon-main-title">{{title}}</p>
                <p class="coupon-main-content" v-if="type === 1">￥<span>{{valueTxt}}</span></p>
                <p class="coupon-main-content" style="font-size: 30rpx;" v-else><span>{{valueTxt}}</span>折</p>
                <p class="coupon-main-footer">{{offsetTxt}}</p>
            </div>

            <div class="coupon-copy" v-if="expired.days > 0">
                <p class="coupon-copy-title">有效期限</p>
                <p class="coupon-copy-content">自领取之日起 {{expired.days}} 天内有效</p>
            </div>

            <div class="coupon-copy" v-else>
                <p class="coupon-copy-title">有效期限</p>
                <p class="coupon-copy-content">{{expired.start_at}}</p>
                <p class="coupon-copy-content">{{expired.end_at}}</p>
            </div>
        </div>

        <div class="coupon-right" :style="{background: 'radial-gradient(transparent 0, transparent 10rpx, ' + bgColor + ' 10rpx)', backgroundSize: '30rpx 30rpx', backgroundPosition: '16rpx 6rpx'}"></div>

        <i class="coupon-mask"></i>
    </div>
</template>

<style lang="less">
.coupon {
    &-wrap {
        width: 95%;
        margin: 0 auto;
        display: flex;
        box-sizing: border-box;
        height: 300rpx;
        position: relative;
        overflow: hidden;

        i.coupon-mask {
            position: absolute;
            left: 15%;
            top: 15%;
            width: 150%;
            height: 400rpx;
            background: rgba(255, 255, 255, .15);
            transform: rotate(-30deg);
        }
    }

    &-wrap &-content {
        flex: 1;
        display: flex;
        font-size: 24rpx;
        font-weight: 300;
        color: #fff;
    }

    &-main, &-copy {
        padding: 20rpx;
    }

    &-main {
        flex: 6;
        border-right: 4rpx dashed rgba(255, 255, 255, .3);

        &-title {
            font-size: 40rpx;
        }

        &-content {
            height: 130rpx;
            line-height: 130rpx;
            color: rgba(255, 255, 255, .5);
            font-size: 40rpx;
            font-weight: 600;

            span {
                color: rgba(255, 255, 255, .95);;
                font-size: 68rpx;
                display: inline-block;
                padding:0 10rpx;
            }
        }

        &-footer {
            font-size: 22rpx;
            color: rgba(255, 255, 255, .7);
        }
    }
    &-copy {
        flex: 3;

        &-title {
            font-size: 25rpx;
            line-height: 80rpx;
            text-align: center;
        }

        &-content {
            font-size: 28rpx;
            text-align: center;
            height: 70rpx;
            line-height: 70rpx;
        }
    }

    &-left, &-right {
        width: 15rpx;
    }
    &-right {
        transform: scale(-1,1);
    }
}
</style>

<script>
export default {
    props: {
        width: {
            type: String,
            default: '90%',
        },
        height: {
            type: String,
            default: '300rpx',
        },
        bgColor: {
            type: String,
            default: '#D2415F',
        },
        type: {
            type: Number,
            default: 1,
        },
        value: {
            type: Number,
            default: 1,
        },
        offset: {
            type: Number,
            default: 0,
        },
        expired: {
            type: Object,
            default: {
                start_at: '0000-00-00',
                end_at: '0000-00-00',
                days: 1
            },
        },
    },

    computed: {
        title() {
            return this.type === 1 ? '抵扣劵' : '折扣劵';
        },
        valueTxt() {
            return this.type === 1 ? this.value.toFixed(2) : this.value * 100;
        },
        offsetTxt() {
            return this.offset > 0 ? `单笔订单满 ￥${this.offset.toFixed(2)} 可用` : `本劵为无门槛${this.title}`;
        },
    }
}
</script>

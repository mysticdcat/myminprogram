<template>
    <div>

        <div class="store-grid">
            <div class="store-row">
                <div class="store-row-item">
                    <p class="title">核销</p>
                </div>
                <div class="store-row-item">
                    <span>5</span>
                    <p>今日核销</p>
                </div>
                <div class="store-row-item">
                    <span>5</span>
                    <p>总核销</p>
                </div>
            </div>

            <div class="store-row">
                <div class="store-row-item">
                    <p class="title">领取</p>
                </div>
                <div class="store-row-item">
                    <span>5</span>
                    <p>今日领取</p>
                </div>
                <div class="store-row-item">
                    <span>5</span>
                    <p>总领取</p>
                </div>
            </div>

            <div class="store-row">
                <div class="store-row-item" @click="toPage('/pages/promotion/list')">
                    <span>0</span>
                    <p>活动管理</p>
                </div>
                <div class="store-row-item">
                    <span>7</span>
                    <p>评价</p>
                </div>

                <div class="store-row-item">
                    <span>1</span>
                    <p>店员</p>
                </div>
            </div>
        </div>

        <div class="store-btn" @click="toPage('/pages/promotion/create?id=0')">
            <span></span>
            <i-icon type="add" size="40" color="#999" />
            发布新活动
        </div>

    </div>
</template>

<style lang="less">
.store {
    &-header-btn {
        display: flex;
        padding-top: 10rpx;

        span {
            flex: 1;
            text-align: center;
            height: 30rpx;
            line-height: 30rpx;
            background: #ff4433;
            color: #dababa;
            font-size: 30rpx;

            i {
                display: inline;
                vertical-align: middle;
                font-size: 80rpx;
            }

            &.actived {
                color: #fff;
            }
        }
    }

    &-btn {
        margin: 10rpx;
        margin: 30rpx 15rpx;
        border-radius: 20rpx;
        box-shadow: 0 1px 20px rgba(29, 49, 85, 0.103);
        height: 100rpx;
        line-height: 100rpx;
        text-align: center;
        font-size: 35rpx;
        color: #777;
        overflow: hidden;
        position: relative;
        span {
            display: inline-block;
            background: #f43;
            width:10rpx;
            height: 100rpx;
            position: absolute;
            left: 0;
            top: 0;
        }
    }

    &-grid {
        margin: 10rpx;
        margin: 30rpx 15rpx;
        border-radius: 20rpx;
        box-shadow: 0 1px 20px rgba(29, 49, 85, 0.103);
    }

    &-row {
        display: flex;
        border-bottom: 1px solid #f5f5f5;

        &:last-child {
            border: none;
        }

        &-item {
            flex: 1;
            text-align: center;
            margin: 30rpx 0;
            padding: 15rpx 0;

            span {
                color: #666;
                font-size: 40rpx;
                line-height: 60rpx;
            }

            p {
                color: #999;
                font-size: 28rpx;
            }

            &:nth-child(2) {
                border-right: 1px solid #f7f7f7;
                border-left: 1px solid #f7f7f7;
            }
        }


    }
}
    .store-row-item p.title {font-size: 48rpx; line-height: 100rpx;}
</style>


<script>
import F2 from '../../../static/libs/f2';
import { loginMixin } from '@/mixins';
import { sleep } from '@/utils/';
import { mapState } from 'vuex';

const data =[
[
    { "value": 1070, "month": '1月' },
    { "value": 600, "month": '2月' },
    { "value": 11, "month": '3月' },
    { "value": 32, "month": '4月' },
    { "value": 110, "month": '5月' },
    { "value": 235, "month": '6月' },
    { "value": 369, "month": '7月' },
    { "value": 640, "month": '8月' },
    { "value": 1005, "month": '9月' },
    { "value": 1436, "month": '10月' },
    { "value": 2063, "month": '11月' },
    { "value": 3057, "month": '12月' },
], [
    { "value": 3500, "month": '1月' },
    { "value": 1500, "month": '2月'  },
    { "value": 110, "month": '3月' },
    { "value": 632, "month": '4月' },
    { "value": 1010, "month": '5月' },
    { "value": 25, "month": '6月' },
    { "value": 3069, "month": '7月' },
    { "value": 640, "month": '8月' },
    { "value": 105, "month": '9月' },
    { "value": 136, "month": '10月' },
    { "value": 263, "month": '11月' },
    { "value": 357, "month": '12月' },
]];

export default {
    mixins: [
        loginMixin,
    ],

    data: () => ({
        show: true,
        opts: {
                lazyLoad: true,
                // onInit: initChart,
        },
        showData: [],
        activeBtn: 'selled',
    }),

    computed: {
        ...mapState('user', [
            'user',
        ]),
        ...mapState('store', [
            'store',
        ]),
    },

    methods: {
        initChart(canvas, width, height) {
            const chart = new F2.Chart({
                el: canvas,
                width,
                height,
                padding: [10, 'auto', 'auto', 'auto']
            });
            chart.source(this.showData);
            chart.scale('month', {
                tickCount: 6
            });
            chart.axis('month', {
                label(text, index, total) {
                    const textCfg = {};
                    // if (index === 0) {
                    //     textCfg.textAlign = 'left';
                    // }
                    // if (index === total - 1) {
                    //     textCfg.textAlign = 'right';
                    // }
                    textCfg.fill = "#fff";
                    return textCfg;
                }
            });
            chart.axis('value', {
                label(text) {
                    return {
                        fill: '#ffffff',
                        text: text / 1000 + 'k'
                    };
                },
                grid: {
                    lineDash: null,
                    stroke: 'rgba(255, 255, 255, .2)',
                },
            });

            chart.interval().position('month*value').color('#F7F7F7').style({
                radius: 3,
            });
            chart.render();
            return chart;
        },

        async setData(e, type) {
            this.showData = [];
            wx.showLoading({
                mask: true,
            });
            await sleep(1);
            if (e) {
                this.activeBtn = e.mp.target.id;
            }
            this.showData = data[type];
            wx.hideLoading();
            this.$mp.page.selectComponent('#area').init(this.initChart)
        },

        toPage(url) {
            wx.navigateTo({
                url,
            });
        }
    },

    onShow() {
        this.checkStore();
        // if ( this.store && this.store.status === 1) {
        //     this.setData(null, 0);
        // }
    },

    mounted() {
        if ( this.store && this.store.status === 1) {
            this.setData(null, 0);
        }
    }
}
</script>


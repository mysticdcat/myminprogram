<template>
    <div>
        <div class="shop-item">
            <div class="shop-card-wrap" @click="showActions">
                <div class="shop-card-image">
                    <image :src="cover" mode="aspectFill" style="width: 150rpx; height: 150rpx;" />
                </div>
                <div class="shop-card-desc">
                    <p class="shop-card-name ellipsis">{{title}}</p>
                    <p class="shop-card-expired">{{ expired }}</p>
                    <div class="shop-info">
                        <div>

                            <div class="shop-price" v-if="type === 1" >
                                {{ value }}
                                <span style="font-size: 25rpx;">元</span>
                            </div>

                            <div class="shop-price" v-if="type === 2" >
                                {{ value * 100 }}
                                <span style="font-size: 25rpx;">折</span>
                            </div>

                            <div class="shop-tag">
                                <coupon-tag v-if="type === 1" />
                                <coupon-tag v-if="type === 2"  text="折扣劵" background-color="#FDFFE8" border-color="#FFF175" font-color="#FF9D14" />
                            </div>

                        </div>
                        <div>
                            <p style="width: 180rpx; float: right;">
                                {{ least }}
                                <progress-bar
                                    active
                                    :percent="percent"
                                    :width="180"
                                    :text="text"
                                />
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <p v-if="showMask" class="shop-title" @click="hideActions">
                <span style="border-color: #777;"><i-icon type="close" size="35" color="#f43" /></span>
                <i :style="{color: statusObj.color}">·</i>{{ statusObj.text }}
            </p>

            <p v-else class="shop-title" @click="showActions">
                <span><i-icon type="switch" size="35" /></span>
                <i :style="{color: statusObj.color}">·</i>{{ statusObj.text }}
            </p>

            <div class="promotion-item-mask" :animation="maskAnimation">

                <span v-for="(t, k) in actions" :key="k" :data-index="k" :animation="btnsAnimation" @click="btnClick"><i-icon :type="t" size="50" /></span>

            </div>

            <div class="promotion-item-buttons" v-if="showMask">

            </div>
        </div>

        <p style="border-bottom: 20rpx solid #f7f7f7;"></p>
    </div>

</template>

<style lang="less" scoped>
.promotion-item {
    &-mask {
        position: absolute;
        top: -200px;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        z-index: 2;
        display: flex;
        justify-content:center;
        align-items:center;

        span {
            z-index: 3;
            display: block;
            opacity: 1;
            transform: scale(0.3);
            background: #fff;
            width: 80rpx;
            height: 80rpx;
            line-height: 95rpx;
            border-radius: 40rpx;
            text-align: center;
            color: #777;
            font-size: 28rpx;
            margin: 0 20rpx;
        }
    }

}
.shop {
    // &-bg-normal {
    //     &:after {
    //         content: '';
    //         display: block;
    //         width: 100%;
    //         height: 20rpx;
    //         background: #f7f7f7;
    //     }
    // }

    &-item {
        position: relative;
        overflow: hidden;
        &-hover {
            opacity: .7;
        }
    }

    &-card {

        &-wrap {
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
        }

        &-image {
            flex: .9;
            align-items: center;
            padding: 20rpx;

            image {
                width: 100%;
                border-radius: 5rpx;
            }
        }

        &-desc {
            flex: 3.3;
            padding: 15rpx 20rpx 20rpx 0;
            overflow: hidden;
        }
        &-name {
            font-size: 30rpx;
            line-height: 40rpx;
            color: #777;
            font-weight: 500;
        }
        &-expired {
            font-size: 24rpx;
            color: #777;
            height: 60rpx;
            line-height: 60rpx;
        }
    }

    &-info {
        display: flex;
        margin-top: 10rpx;
        flex-direction: row;
        // align-items: baseline;

        & > div:nth-child(1) {
            flex: 1;
            display: flex;
        }

        & > div:nth-child(2) {
            flex: 1;
            font-size: 20rpx;
            color: #777;
            text-align: right;
        }
    }

    &-price {
        font-size: 40rpx;
        font-weight: 500;
        color: #f43;
    }

    &-tag {
        margin-top: 5rpx;
        padding-left: 20rpx;
    }

    &-title {
        margin: 0 20rpx;
        height: 70rpx;
        line-height: 70rpx;
        color: #777;
        border-top: 1px dashed #eee;
        overflow: hidden;
        font-size: 30rpx;

        i {
            font-size: 80rpx;
            display: inline-block;
            vertical-align: middle;
        }

        span {
            position: absolute;
            z-index: 4;
            right: 20rpx;
            bottom: 8rpx;
            border: 1rpx solid #777;
            border-radius: 50%;
            width: 33rpx;
            height: 33rpx;
            line-height: 33rpx;
            padding: 8rpx;
            text-align: center;
            float: right;
            font-size: 24rpx;
            background: #fff;
        }
    }
}
</style>

<script>
import couponTag from './couponTag';
import { imgHost, promotionStatus } from '@/config';
import progressBar from './progressBar';
import dayjs from 'dayjs';

export default {
    components: {
        couponTag,
        progressBar,
    },

    props: {
        id: {
            type: Number,
        },
        image: {
            type: String,
        },
        title: {
            type: String,
        },
        type: {
            type: Number,
            default: 1,
        },
        value: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            default: 0.00,
        },
        received: {
            type: Number,
            default: 0,
        },
        quantity: {
            type: Number,
            default: 0,
        },
        status: {
            type: Number,
            default: 0,
        },
        created: {
            type: String,
        },
        audited: {
            type: String,
        },
        overed: {
            type: String,
        },
    },

    data: () => ({
        showMask: false,
        maskAnimation: {},
        btnsAnimation: {},

        actions: [
            'browse',
            'brush',
            'dynamic',
            'trash',
        ],
    }),

    computed: {
        cover() {
            return this.image ? `${imgHost}fit/200/${this.image}` : `${imgHost}/fit/200/store~banner~null.png`;
        },

        expired() {
            if ( this.status == 0 || this.status == -1 ) {
                // let created = dayjs(this.created).format('YYYY-MM-DD');
                return `发布时间：${this.created}`;
            }

            let audited = dayjs(this.audited).format('YYYY-MM-DD');
            if (this.overed) {
                let overed = dayjs(this.overed).format('YYYY-MM-DD');
                return `活动期限：${audited} ~ ${overed}`;
            } else {
                return `活动期限：${audited} ~ 长期`;
            }
        },

        least() {
            return this.quantity ? `剩 ${this.quantity - this.received} 份` : '不限量';
        },

        percent: function () {
            return this.quantity ? Math.ceil(this.received / this.quantity * 100) : 100;
        },

        text: function () {
            return `已抢 ${this.received} 份`;
        },

        statusObj() {
            let ret = { color: 'gray', text: '未知' };
            let s = promotionStatus.find(i => i.status === this.status)
            if (s) {
                ret = {...ret, ...s}
            }

            return ret;
        },
    },

    methods: {
        handleClick() {
            wx.navigateTo({ url: this.url });
        },

        showActions() {
            this.showMask = true;

            let animation = wx.createAnimation({
                duration: 300,
                timingFunction: 'ease-in-out',
            });

            animation.top(0).step();
            this.maskAnimation = animation.export();

            animation.scale(1.2).step({
                duration: 300,
                delay: 300,
            });
            animation.scale(1).step({
                duration: 300,
                timingFunction: 'ease-in',
            });
            this.btnsAnimation = animation.export();
        },

        hideActions() {
            this.showMask = false;
            let animation = wx.createAnimation({
                duration: 200,
            });

            animation.scale(.3).step();
            this.btnsAnimation = animation.export();

            let mani = wx.createAnimation({
                duration: 300,
                delay: 200,
            })
            mani.top(-200).step();
            this.maskAnimation = mani.export();
        },

        btnClick({currentTarget = {}}) {
            const dataset = currentTarget.dataset || {};
            const { index } = dataset;

            this.hideActions();

            switch(index) {
                case 0:
                    wx.navigateTo({
                        url: `/pages/coupon/index?id=${this.id}`,
                    });
                    break;

                case 1:
                    //TODO
                    break;

                case 2:
                    //TODO
                    break;

                case 3:
                    //TODO
                    break;
            }
        }
    },
}
</script>

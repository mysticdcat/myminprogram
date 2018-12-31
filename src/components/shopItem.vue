<template>
    <div class="shop-item"
        :class="{'shop-item-hover': isTouched}"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
        @click="handleClick"
    >
        <div class="shop-card-wrap">
            <div class="shop-card-image">
                <image :src="imgUri" mode="aspectFill" style="width: 150rpx; height: 150rpx;" />
            </div>
            <div class="shop-card-desc">
                <p class="shop-card-name ellipsis">{{title}}</p>

                <div class="shop-info">
                    <div>
                        <div class="shop-info-capsule">
                            <zan-capsule v-if="type === 1" color="#ff4343" :leftText="deduction + '元'" rightText="代金劵" />
                            <zan-capsule v-if="type === 2" color="#FD9D31" :leftText="deduction * 100 + '折'" rightText="折扣劵" />
                        </div>

                        <div class="shop-price">
                            {{ price }}
                            <span style="font-size: 25rpx;">元</span>
                        </div>

                    </div>
                    <div>
                        <div class="shop-other">
                            <p style="width: 180rpx; float: right; margin-top: 50rpx;">
                                剩余 {{ least }} 份
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
        </div>

        <p class="shop-title">
            <span><i-icon type="coordinates" size="30" />{{ distance }}</span>
            <i-icon type="shop_fill" size="32" />{{name}}
        </p>
    </div>

</template>

<style lang="less" scoped>
.shop {
    &-item {
        background: #fff;
        height: 280rpx;
        overflow: hidden;

        &-hover {
            opacity: .7;
        }

        &:after {
            content: '';
            display: block;
            width: 100%;
            height: 10rpx;
            background: #f7f7f7;
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
            color: #555;
            font-weight: 500;
        }
    }

    &-info {
        display: flex;
        // align-items: baseline;

        & > div:nth-child(1) {
            flex: 1;
        }

        & > div:nth-child(2) {
            flex: 1;
            font-size: 22rpx;
            color: #777;
            text-align: right;
        }

        &-capsule {
            margin: 15rpx 0;
        }
    }

    &-price {
        color: #f44;
        font-size: 40rpx;
        font-weight: 500;
    }

    &-other {
        font-size: 20rpx;
        text-align: right;
        color: #777;
    }

    &-title {
        margin: 0 20rpx;
        height: 70rpx;
        line-height: 70rpx;
        color: #777;
        border-top: 1px dashed #eee;
        overflow: hidden;
        font-size: 30rpx;

        span {
            float: right;
            font-size: 24rpx;
        }
    }
}
</style>

<script>
import progressBar from './progressBar';
import { imgHost } from '@/config';

export default {
    data: () => ({
        isTouched: false,
    }),

    components: {
        progressBar,
    },

    props: {
        image: {
            type: String,
        },
        title: {
            type: String,
        },
        name: {
            type: String,
        },
        url: {
            type: String,
        },
        distance: {
            type: String,
            default: '',
        },
        type: {
            type: Number,
            default: 1,
        },
        deduction: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            default: 0.00,
        },
        selled: {
            type: Number,
            default: 0,
        },
        quantity: {
            type: Number,
            default: 0,
        },
        longitude: {
            type: Number,
        },
        latitude: {
            type: Number,
        }
    },

    computed: {
        percent: function () {
            return Math.ceil(this.selled / (this.quantity) * 100);
        },
        text: function () {
            return `已抢 ${this.selled} 份`;
        },
        least: function () {
            return this.quantity - this.selled;
        },
        imgUri() {
            return `${imgHost}fit/150/${this.image}`;
        },
    },

    methods: {
        handleClick() {
            wx.navigateTo({ url: this.url });
        },
        handleTouchStart(e) {
            this.isTouched = true;
        },
        handleTouchEnd() {
            this.isTouched = false;
        },
        showMap() {
            wx.openLocation({
                latitude: this.latitude,
                longitude: this.longitude,
                scale: 17,
                name: this.name,
            });
        },
    }
}
</script>


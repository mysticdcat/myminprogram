<template>
    <div class="coupon-order">
        <section class="coupon-order-header">
            <div>
                <h3>待支付</h3>
                <p>订单将在 15 分钟后关闭，请尽快付款哦~</p>
            </div>
            <div>
                <i-icon type="transaction_fill" size="150" />
            </div>
        </section>

        <section class="coupon-order-content">
            <ul>
                <li><i-icon type="shop_fill" size="35" /> {{order.store.data.name}}</li>
            </ul>

            <div class="coupon-order-content-goods">
                <image :src="cover" mode="aspectFill" style="width: 130rpx; height: 130rpx;" />
                <div>
                    <div>
                        <p>{{order.promotion.data.title}}</p>
                    </div>
                    <p>￥ {{orderMoney}}</p>
                </div>
            </div>

            <dl>
                <dt>优惠类型</dt><dd>{{ couponType }}</dd>
            </dl>
            <dl>
                <dt>劵面价值</dt><dd>{{ value }}</dd>
            </dl>
            <dl>
                <dt>使用门槛</dt><dd>{{ offsetTxt }}</dd>
            </dl>
            <dl>
                <dt>有效期限</dt><dd>{{ order.start_at }} ~ {{ order.end_at }}</dd>
            </dl>
        </section>

        <section class="coupon-order-content coupon-order-payment">
            <ul>
                <li><i-icon type="transaction_fill" size="40" /> 支付方式</li>
            </ul>

            <radio-group @change="onPaymentChange">
                <label>
                    <dl>
                        <dt><ali-icon type="weixin2" size="38" va="-3" color="RGBA(0, 178, 106, 1.00)" /> 微信支付</dt>
                        <dd><radio color="RGBA(0, 178, 106, 1.00)" value="1" :checked="payment === 1"/></dd>
                    </dl>
                </label>
                <label>
                    <dl>
                        <dt><ali-icon type="yuezhifu4" size="38" va="-3" color="#f43" /> 余额支付 (可用：￥{{balance}})</dt>
                        <dd><radio color="RGBA(0, 178, 106, 1.00)" value="2" :checked="payment === 2" /></dd>
                    </dl>
                </label>
            </radio-group>
        </section>

        <section class="coupon-order-content">
            <ul>
                <li><i-icon type="document_fill" size="35" /> 交易信息</li>
            </ul>
            <dl>
                <dt>订单编号</dt><dd>{{ order.sn }}</dd>
            </dl>
            <dl>
                <dt>抢购数量</dt><dd>  x 1</dd>
            </dl>
            <dl>
                <dt>下单时间</dt><dd>{{ order.created_at }}</dd>
            </dl>
        </section>

        <div style="height: 100rpx;">
            <i-modal title="提示" :visible="buyModal.show" :actions="buyModal.actions" @iclick="onBuyModalClick">
                <div class="modal-content">
                    {{buyModal.message}}
                </div>
            </i-modal>
        </div>

        <section class="coupon-order-footer">
            <div>
                <span>￥</span> {{orderMoney}}
            </div>
            <div>
                <button class="coupon-order-cancel" @click="cancelOrder">
                    取消订单
                </button>
                <button class="coupon-order-pay" @click="payOrder">
                    立即支付
                </button>
            </div>
        </section>

        
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { imgHost } from '@/config';

export default {
    data: () => ({
        payment: 1,
    }),

    computed: {
        ...mapState('order', ['order','buyModal']),
        ...mapState('user', ['user']),

        couponType() {
            return this.order.promotion_type === 1 ? '抵扣劵' : '折扣劵';
        },

        value() {
            return this.order.promotion_type === 1 ? `￥${this.order.value.toFixed(2)}` : `${this.order.value * 100} 折`;
        },

        offsetTxt() {
            return this.order.offset > 0 ? `单笔订单满 ￥${this.order.offset.toFixed(2)} 可用` : `本劵为无门槛 ${this.couponType}`;
        },

        price() {
            return this.order.promotion.data.price.toFixed(2);
        },

        orderMoney() {
            return this.order.price.toFixed(2);
        },

        cover() {
            return this.order.store.data.banner ? `${imgHost}fit/150/${this.order.store.data.banner}` : null;
        },

        balance() {
            return parseFloat(this.user.balance).toFixed(2);
        }
    },

    methods: {
        onPaymentChange(e) {
            const { value } = e.mp.detail;
            this.payment = parseInt(value);
        },

        async payOrder() {
            this.buyModal.show = true
            this.buyModal.message="确认支付吗？"    
        },

        async onBuyModalClick(e) {
            this.buyModal.show = false;
            var index = e.mp.detail.index;
            if(index == 1){
                    if (this.payment === 2) {
                        if (parseFloat(this.user.balance) < this.order.price) {
                            wx.showToast({
                                icon: 'none',
                                title: '您的可用余额不足，请更换其他支付方式',
                            })

                            return false;
                        }

                        await this.$store.dispatch('order/pay', {
                            id: this.order.id,
                        });
                    } else {
                        await this.$store.dispatch('order/wxpay', {
                            id: this.order.id,
                            openid: this.user.open_id,
                        })
                    }
            }
        },

        async cancelOrder() {
            await this.$store.dispatch('order/cancel', {
                id: this.order.id,
            });
        }
    },

    async onLoad(options) {
        let { id } = options;
        id = parseInt(id);

        await this.$store.dispatch('order/info', {id, params: {include: 'promotion,store'}});

        this.payment = this.order.payment;
    }
}
</script>

<style lang="less" scoped>
.coupon-order {
    &-header {
        height: 160rpx;
        background: #f43;
        display: flex;

        div:first-child {
            flex: 3;
            color: #fff;
            padding: 20rpx 0 0 30rpx;
            font-size: 24rpx;

            h3 {
                font-size: 35rpx;
                line-height: 70rpx;
            }
        }

        div:last-child {
            flex: 1.2;
            color: rgba(255, 255, 255, .7);
        }
    }

    &-content {
        border-bottom: 20rpx solid #f7f7f7;

        &-goods {
            padding: 10rpx 40rpx;
            display: flex;
            border-bottom: 1rpx solid #f7f7f7;

            image {
                border-radius: 3px;
                width: 130rpx;
                margin: 0 20rpx;
            }

            div {
                flex: 3;
                font-size: 30rpx;

                div {
                    height: 100rpx;
                    p {
                        text-align: left;
                        color: #777;
                        line-height: 45rpx;
                    }
                }

                p {
                    text-align: right;
                }
            }
        }

        h3 {
            background: #fefefe;
            font-size: 32rpx;
            line-height: 70rpx;
            padding: 5rpx 20rpx;
        }

        ul, dl {
            list-style: none;

        }
        ul {
            background: #fbfbfb;
            border-bottom: 1rpx dashed #f3f3f3;
        }
        dl {
            display: flex;
            padding: 0rpx 40rpx;
            border-bottom: 1rpx solid #f7f7f7;
        }

        dt, dd, li {
            color: #777;
            font-size: 32rpx;
            padding: 5rpx 0 5rpx 20rpx;
            line-height: 70rpx;
        }

        dt {
            flex: 1;
            &::after {
                content: '：';
            }
        }
        dd {
            flex: 3;
            padding-left: 0;
            text-align: right;
        }


        dt, dd {
            font-size: 28rpx;
        }
    }

    &-payment {
        dt {
            flex: 3;
            font-size: 32rpx;

            &::after {
                content: '';
            }
        }
        dd {
            flex: 1;
            text-align: right;
        }
    }

    &-footer {
        background: #f7f7f7;
        position: fixed;
        display: flex;
        bottom: 0;
        left: 0;
        z-index: 1;
        height: 100rpx;
        padding: 0 20rpx;
        width: 100%;
        box-shadow:0px 0px 10px rgba(100, 100, 100, .3);
        border: none;

        div:first-child {
            flex: 1.3;
            line-height: 100rpx;
            font-size: 50rpx;
            font-weight: 300;
            color: #ff4343;

            span {
                font-size: 30rpx;
            }
        }

        div:last-child {
            flex: 3.2;
            display: flex;
            text-align: right;

            button {
                color: #fff;
                box-shadow:0px 0px 10px rgba(100, 100, 100, .3);
                font-size: 30rpx;
                font-weight: 200;
                width: 250rpx;
                height: 72rpx;
                line-height: 72rpx;
                margin: 14rpx 0;
                border-radius: 0;

                &:first-child {
                    background: #FF8755;
                    border-top-left-radius: 40rpx;
                    border-bottom-left-radius: 40rpx;
                }

                &:last-child {
                    background: #ff4343;
                    border-top-right-radius: 40rpx;
                    border-bottom-right-radius: 40rpx;
                }
            }
        }
    }
}
</style>

<template>
    <div class="promotion-form">
        <h3>活动信息</h3>
        <div class="promotion-form-base promotion-form-section">
            <section>
                <label>{{attributes.title.name}}</label>
                <div>
                    <input v-model.lazy="promotion.title" ref="title" :placeholder="attributes.title.tips" />
                </div>
            </section>

            <section v-if="! isLong">
                <label>{{attributes.overed_at.name}}</label>
                <div>
                    <picker mode="date" :value="promotion.overed_at" @change="onPickerChange">
                        <view v-if="promotion.overed_at === null" style="color: #999;">
                            请选择截止日期，到期活动自动下架
                        </view>
                        <view v-else>{{promotion.overed_at}}</view>
                    </picker>
                </div>
            </section>
        </div>
        <h3>优惠劵信息</h3>
        <div class="promotion-form-base promotion-form-section">
            <section>
                <label>{{attributes.value.name}}</label>
                <div>
                    <input v-model="promotion.value" type="digit" ref="value" :placeholder="attributes.value.tips" />
                    <span @click="showTips($event, 'value')">
                        {{ couponTypes[promotion.type].unit }} <i-icon type="feedback" size="35" />
                    </span>
                </div>
            </section>

            <section>
                <label>{{attributes.offset.name}}</label>
                <div>
                    <input v-model="promotion.offset" type="digit" ref="offset" :placeholder="attributes.offset.tips" />
                    <span @click="showTips($event, 'offset')">
                        元 <i-icon type="feedback" size="35" />
                    </span>
                </div>
            </section>

            <section>
                <label>{{attributes.quantity.name}}</label>
                <div>
                    <input v-model="promotion.quantity" type="number" ref="quantity" :placeholder="attributes.quantity.tips" />
                    <span @click="showTips($event, 'quantity')">
                        份 <i-icon type="feedback" size="35" />
                    </span>
                </div>
            </section>

            <section>
                <label>{{attributes.price.name}}</label>
                <div>
                    <input v-model="promotion.price" type="digit" data-id="test" ref="price" :placeholder="attributes.price.tips" />
                     <span @click="showTips($event, 'price')">
                        元 <i-icon type="feedback" size="35" />
                    </span>
                </div>
            </section>

            <section>
                <label>{{attributes.receive_commission.name}}</label>
                <div>
                    <input v-model="promotion.receive_commission" type="digit" ref="receive_commission" :placeholder="attributes.receive_commission.tips" />
                    <span @click="showTips($event, 'receive_commission')">
                        元 <i-icon type="feedback" size="35" />
                    </span>
                </div>
            </section>

            <section>
                <label>{{attributes.day_limit.name}}</label>
                <div>
                    <input v-model="promotion.day_limit" type="number" ref="day_limit" :placeholder="attributes.day_limit.tips" />
                    <span @click="showTips($event, 'day_limit')">
                        份 <i-icon type="feedback" size="35" />
                    </span>
                </div>
            </section>

            <section v-if="expireTypes[1].checked">
                <label>{{attributes.start_at.name}}</label>
                <div>
                    <picker mode="date" :value="promotion.start_at" @change="onPickerChange($event, 'start_at')">
                        <view v-if="promotion.start_at === null" style="color: #999;">
                            {{attributes.start_at.tips}}
                        </view>
                        <view v-else>{{promotion.start_at}}</view>
                    </picker>
                </div>
            </section>

            <section v-if="expireTypes[1].checked">
                <label>{{attributes.end_at.name}}</label>
                <div>
                    <picker mode="date" :value="promotion.end_at" @change="onPickerChange($event, 'end_at')">
                        <view v-if="promotion.end_at === null" style="color: #999;">
                            {{attributes.end_at.tips}}
                        </view>
                        <view v-else>{{promotion.end_at}}</view>
                    </picker>
                </div>
            </section>
        </div>

        <div style="height: 100rpx;"></div>
        <div class="promotion-form-section promotion-form-btn">
            <section style="border: none;">
                <button class="promotion-form-submit" @click="toNext">
                    下一步<i-icon type="enter" size="40" />
                </button>
            </section>
        </div>

        <i-message id="message" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { $Message } from '@/ui/iview/base/index';
import { promotionMaxQuantity, promotionMinRevMission } from '@/config';

const attributes = {
    title: { name: '活动标题', tips: '请输入活动标题' },
    price: { name: '领劵价格', tips: '用户购劵时需要支付的费用' },
    offset: { name: '使用门槛', tips: '单笔消费满多少可用，0 表示无门槛' },
    value: { name: '劵值面额', tips: '优惠劵能抵扣的金额' },
    // quantity: { name: '总发劵量', tips: '优惠劵的总发行量，0 表示不限量' },
    quantity: { name: '总发劵量', tips: '优惠劵的总发行量' },
    content: { name: '用劵须知', tips: '请输入优惠劵使用规则及相关说明' },
    overed_at: { name: '活动截止', tips: '' },
    day_limit: { name: '每日限用', tips: '每天前多少名可用，0 表示不限制' },
    receive_commission: { name: '分享返利', tips: '用户分享被领取后获得的佣金，不得高于领劵价' },
    days: { name: '有效天数', tips: '自领取之日起，多少天内有效' },
    start_at: { name: '生效日期', tips: '请选择优惠劵的生效日期，自该日起可用' },
    end_at: { name: '失效日期', tips: '请选择优惠劵的失效日期，自该日起失效' },
};

export default {
    data: () => ({
        couponTypes: [{}, { name: '抵扣劵', unit: '元' }, { name: '折扣劵', unit: '%' }],
        attributes,
        isLong: false,

        expireTypes: [
            { name: '按天数', checked: false },
            { name: '指定日期范围', checked: true },
        ],
    }),

    computed: {
        ...mapState('promotion', [
            'promotion',
        ]),
        ...mapState('store', [
            'store',
        ]),
    },

    methods: {
        showTips (e, type) {
            wx.showToast({
                icon: 'none',
                title: this.attributes[type].tips,
                mask: true,
            });
        },

        onSwitch(e) {
            const { value } = e.mp.detail;
            if (value) {
                this.promotion.overed_at = null;
            }

            this.isLong = value;
        },

        onPickerChange(e, type = 'overed_at') {
            this.promotion[type] = e.mp.detail.value;
        },

        onRadioChange (e) {
            const { value } = e.mp.detail;
            if (value == 0) {
                this.promotion.start_at = null;
                this.promotion.end_at = null;
            } else {
                this.promotion.days = 0;
            }
            this.expireTypes.map(item => {
                item.checked = false;
            });
            this.expireTypes[value].checked = true;
        },

        toNext() {
            let k = Object.keys(this.$refs);

            let err = k.find(item => String(this.promotion[item]).trim() === '');
            if (err) {
                $Message({
                    content: `${this.attributes[err].name}必须填写`,
                    type: 'error',
                });
                return false;
            }

            if (! this.isLong && ! this.promotion.overed_at) {
                $Message({
                    content: '活动截止日期必须填写',
                    type: 'error',
                });
                return false;
            }

            if (parseFloat(this.promotion.value) < 1) {
                $Message({
                    content: '请填写正确的劵值面额',
                    type: 'error',
                });
                return false;
            }

            if (parseInt(this.promotion.quantity) < 1) {
                $Message({
                    content: '请填写正确的发劵数量',
                    type: 'error',
                });
                return false;
            }

            if (parseInt(this.promotion.quantity) > promotionMaxQuantity) {
                $Message({
                    content: `总发劵量不能超出上限：${promotionMaxQuantity}份`,
                    type: 'error',
                });
                return false;
            }

            if (parseFloat(this.promotion.price) > parseFloat(this.promotion.value)) {
                $Message({
                    content: '领劵价格不能高于劵值面额',
                    type: 'error',
                });
                return false;
            }

            if (parseFloat(this.promotion.receive_commission) < promotionMinRevMission) {
                $Message({
                    content: `分享返利不得低于${promotionMinRevMission}元`,
                    type: 'error',
                });
                return false;
            }

            if (parseFloat(this.promotion.receive_commission) > parseFloat(this.promotion.price)) {
                $Message({
                    content: '分享返利不能高于领取价格',
                    type: 'error',
                });
                return false;
            }

            if (this.expireTypes[0].checked && ! this.promotion.days) { //按天数
                $Message({
                    content: '请填写正确的有效天数',
                    type: 'error',
                });
                return false;
            }

            if (this.expireTypes[1].checked) {
                if (! this.promotion.start_at) {
                    $Message({
                        content: '请选择优惠劵生效日期',
                        type: 'error',
                    });
                    return false;
                }

                if (! this.promotion.end_at) {
                    $Message({
                        content: '请选择优惠劵失效日期',
                        type: 'error',
                    });
                    return false;
                }

                if (this.promotion.start_at > this.promotion.end_at) {
                    $Message({
                        content: '请选择正确的失效日期',
                        type: 'error',
                    });
                    return false;
                }
            }

            wx.navigateTo({
                url: '/pages/promotion/create-step',
            })
        }
    },

    async mounted() {
        let id = parseInt(this.$mp.page.options.id);
        let params = {};
        if (id) {
            params = Object.assign(params, {id});
        }

        await this.$store.dispatch('promotion/getPromotion', params);

        if (this.promotion.id) {
            this.isLong = this.promotion.overed_at === null;

            let expireType = this.promotion.days > 0 ? 0 : 1;
            this.expireTypes[expireType].checked = true;
        }

    },

    // watch: {
    //     isLong() {
    //         this.showOveredAt = !this.isLong;
    //     }
    // },
}
</script>

<style lang="less" scoped>
.promotion-form {
    background: #f7f7f7;

    h3 {
        line-height: 90rpx;
        font-size: 32rpx;
        font-weight: 400;
        text-indent: 20rpx;
    }

    &-section {
        background: #fff;
        border-top: 1rpx solid #eee;
        border-bottom: 1rpx solid #eee;
        padding-left: 10rpx;
    }

    &-submit {
        background: #f3f3f3;
        width: 100%;
        height: 90rpx;
        line-height: 90rpx;
        color: #555;
        font-size: 30rpx;
        font-weight: 300;
        padding: 0;
        border-radius: 0;
    }

    &-base, &-btn {
        section {
            display: flex;
            border-bottom: 1rpx solid #f1f1f1;
            height: 70rpx;
            padding: 10rpx 15rpx;

            label {
                flex: 1.2;
                font-size: 29rpx;
                height: 70rpx;
                line-height: 70rpx;
                text-align: right;
                color: #777;
                &::after {
                    content: "：";
                }
            }

            div {
                flex: 4;
                font-size: 28rpx;
                height: 70rpx;
                line-height: 70rpx;
                display: flex;

                input, picker, p{
                    flex: 1;
                    font-size: 28rpx;
                    height: 70rpx;
                    line-height: 70rpx;
                }
                textarea {
                    flex: 1;
                    font-size: 28rpx;
                    line-height: 40rpx;
                    height: 200rpx;
                }

                span {
                    padding-left: 10rpx;
                    flex: .2;
                    color: #999;
                }

                radio-group {
                    flex: 4.2;
                    label {
                        &:last-child {
                            margin-left: 40rpx;
                        }
                        &::after {
                            content: none;
                        }
                    }
                }
            }
        }
        section:last-child {
            border: none;
        }
    }

    &-btn {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 1;
        height: 90rpx;
        padding: 0;
        width: 100%;
        box-shadow:0px -4px 15px rgba(100, 100, 100, .3);
        border: none;

        section {
            padding: 0;
        }
    }

}
</style>

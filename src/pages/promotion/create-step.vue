<template>
    <div class="promotion-form">
        <h3>用劵须知</h3>
        <div class="promotion-form-base promotion-form-section">
            <section>
                <div>
                    <text>{{intro}}</text>
                </div>
            </section>
        </div>

        <h3>{{attributes.content.name}}</h3>
        <div class="promotion-form-base promotion-form-section">
            <section style="height: 200rpx;">
                <div>
                    <textarea v-model="promotion.content" ref="content" :placeholder="attributes.content.tips" />
                </div>
            </section>
        </div>

        <h3>活动图片</h3>
        <div>
            <swiper :indicator-dots="true"
                :autoplay="true" circular :interval="5000" :duration="300" style="height: 350rpx;">
                <block v-for="(item, index) in promotion.images" :key="index">
                    <swiper-item>
                        <image class="slide-image" :src="imgHost + 'fill/900/' + item" mode="aspectFill" />
                    </swiper-item>
                </block>
            </swiper>
            <div style="padding-top: 10rpx; display: flex; background: #fff;">
                <span class="promotion-form-uploader" v-for="(item, k) in promotion.images" :key="k" @click="onImageClick($event, k)">
                    <image :src="imgHost + 'fill/200/' + item" mode="aspectFill" />
                </span>

                <span v-if="promotion.images.length < 5" class="promotion-form-uploader" @click="onImageClick($event, promotion.images.length)">
                    <i-icon type="add" size="80" color="#ccc" />
                </span>


            </div>
        </div>
        
        <div style="height: 200rpx; background: #fff"></div>
        <div class="promotion-form-section promotion-form-btn">
            <section style="border: none;">
                <button class="promotion-form-submit" @click="preSubmit">确定发布</button>
            </section>
        </div>

        <i-action-sheet :visible="sheet.show" :actions="sheet.actions" show-cancel @cancel="hideSheet" @iclick="onSheetClick" :mask-closable="true" />

        <i-modal title="温馨提醒" :visible="modal.show" :actions="modal.actions" @iclick="onModalClick">
            <div style="padding: 0 20rpx; color: #777; text-indent: 56rpx; text-align: left;">
                活动一经发布不可修改，请确认提交的数据是否都正确无误。
            </div>
        </i-modal>

        <i-message id="message" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { imgHost } from '@/config';
import { $Message } from '@/ui/iview/base/index';
import { formatPromotionIntro } from '@/utils';

const attributes = {
    title: { name: '活动标题', tips: '请输入活动标题' },
    price: { name: '领劵价格', tips: '用户购劵时需要支付的费用' },
    offset: { name: '使用门槛', tips: '单笔消费满多少可用，0 表示无门槛' },
    value: { name: '劵值面额', tips: '优惠劵能抵扣的金额' },
    quantity: { name: '总发劵量', tips: '优惠劵的总发行量，0 表示不限量' },
    content: { name: '商家说明', tips: '请输入优惠劵使用规则及相关说明' },
    overed_at: { name: '活动截止', tips: '' },
    day_limit: { name: '每日限用', tips: '每天前多少名可用，0 表示不限制' },
    receive_commission: { name: '分享返利', tips: '用户分享给好友领取后获得的佣金，不得高于领劵价' },
    days: { name: '有效天数', tips: '自领取之日起，多少天内有效' },
    start_at: { name: '生效日期', tips: '请选择优惠劵的生效日期，自该日起可用' },
    end_at: { name: '失效日期', tips: '请选择优惠劵的失效日期，自该日起失效' },
};

export default {
    data: () => ({
        attributes,
        imgHost,
        sheet: {
            show: false,
            actions: [
                {
                    name: '重新上传',
                },
                {
                    name: '删除图片',
                    color: '#f30',
                },
            ]
        },
        imgId: 0,
        modal: {
            show: false,
            actions: [
                {
                    name: '我再看看',
                },
                {
                    name: '确认提交',
                    color: '#f30',
                }
            ]
        },
    }),

    computed: {
        ...mapState('promotion', [
            'promotion',
        ]),
        ...mapState('user', [
            'token',
        ]),

        intro() {
            return formatPromotionIntro(this.promotion);
        },
    },

    methods: {
        hideSheet() {
            this.sheet.show = false;
        },
        hideModal() {
            this.modal.show = false;
        },
        onImageClick(e, i) {
            this.imgId = i;
            if (this.promotion.images[i]) {
                this.sheet.show = true;
            } else {
                this.uploadFile();
            }
        },

        onSheetClick(e) {
            this.hideSheet();
            const { index } = e.mp.detail;
            if (index === 0) {
                this.uploadFile();
            } else {
                const { images } = this.promotion;
                images.splice(this.imgId, 1);
                this.promotion.images = images;
            }
        },

        onModalClick(e) {
            this.hideModal();
            const { index } = e.mp.detail;
            if (index === 1) {
                this.doSubmit();
            }
        },

        uploadFile() {
            // const { images } = this.promotion;
            // images.splice(this.imgId, 1);
            // images.splice(this.imgId, 0, 'promotion~0f271491-be6e-4b60-9217-9b500de2d5e3.png');
            // this.promotion.images = images;
            // console.log(this.promotion);

            wx.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success: res => {
                    wx.showLoading({
                        mask: true,
                    })
                    wx.uploadFile({
                        url: imgHost + "upload",
                        filePath: res.tempFilePaths[0],
                        name: 'file',
                        formData: {
                            path: `promotion`
                        },
                        header: {
                            'Authorization': `Bearer ${this.token}`,
                        },
                        success: res => {
                            let ret = JSON.parse(res.data);
                            const { images } = this.promotion;
                            images.splice(this.imgId, 1);
                            images.splice(this.imgId, 0, ret.data.filename);
                            this.promotion.images = images;
                        },

                        complete: () => {
                            wx.hideLoading();
                        }
                    })
                },
            })
        },

        preSubmit() {
            if (this.promotion.images.length < 1) {
                $Message({
                    content: '请至少上传一张活动图片',
                    type: 'error',
                });
                return false;
            }
            this.modal.show = true;
        },

        doSubmit() {
            this.$store.dispatch('promotion/updatePromotion', {
                ...this.promotion
            });
        }
    }
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
    }

    &-submit {
        background: rgba(255, 68, 51, .8);;
        width: 100%;
        height: 90rpx;
        line-height: 90rpx;
        color: #fff;
        font-size: 30rpx;
        font-weight: 300;
        padding: 0;
        border-radius: 0;
    }

    &-uploader {
        // flex: 1;
        width: calc(20% - 20rpx);
        margin: 10rpx;
        padding: 0;
        background: #f7f7f7;
        border: none;
        border-radius: 3px;
        overflow: hidden;
        height: 120rpx;
        display: flex;
        justify-content:center;
        align-items:center;

        image {
            width: 100%;
            height: 120rpx;
        }

        &-holder {
            background: #fff;
        }
    }

    &-base, &-btn {
        section {
            display: flex;
            border-bottom: 1rpx solid #f1f1f1;
            padding: 10rpx 15rpx;

            div {
                flex: 1;
                font-size: 28rpx;
                display: flex;

                input, picker, p{
                    flex: 1;
                    font-size: 28rpx;
                    height: 70rpx;
                    line-height: 70rpx;
                }
                text {
                    width: 100%;
                    background: #f7f7f7;
                    line-height: 55rpx;
                    color: #777;
                    border-radius: 6rpx;
                    padding: 10rpx;
                }
                textarea {
                    flex: 1;
                    font-size: 28rpx;
                    line-height: 50rpx;
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
    }

    &-file {
        section {
            padding: 20rpx;
            border-bottom: 1px solid #eee;
            display: flex;
        }

        image {
            border-radius: 10rpx;
            width: 250rpx;
            height: 200rpx;
        }

        div {
            flex: 1.2;
            margin-left: 20rpx;

            h3 {
                line-height: 35rpx;
                margin-bottom: 15rpx;
                font-weight: 300;
                text-indent: 0;
            }

            p {
                font-size: 28rpx;
                color: #777;
                line-height: 45rpx;
            }
        }
    }

    &-btn {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 1;
        height: 90rpx;
        width: 100%;
        padding: 0;
        box-shadow:0px -4px 15px rgba(100, 100, 100, .3);
        border: none;

        section {
            padding: 0;
        }
    }

}
</style>

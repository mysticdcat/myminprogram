<template>
    <div class="store-form">
        <h3>基本信息</h3>

        <div class="store-form-base store-form-section">
            <section>
                <label>店铺名称</label>
                <input confirm-type="next" v-model.lazy="store.name">
            </section>

            <section>
                <label>联系电话</label>
                <input confirm-type="next" type="number" v-model="store.phone">
            </section>

            <section>
                <label>营业时间</label>
                <input confirm-type="next" v-model.lazy="store.open_time">
            </section>

            <section>
                <label>所属行业</label>
                <picker mode="selector" range-key="name" @change="onIndustryChange" :range="industries">
                    {{ industryName }}
                </picker>
            </section>

            <section>
                <label>位置信息</label>
                <p @click="chooseLocation" v-if="store.latitude === 0"><i-icon type="coordinates" size="35" /> 点此选取</p>
                <p @click="chooseLocation" v-else><i-icon type="coordinates_fill" size="35" />[{{showLat}}, {{showLng}}] <span style="color: #f60;">重新选取</span></p>
            </section>
            <section>
                <label>详细地址</label>
                <input confirm-type="next" v-model.lazy="store.address" placeholder="请先选取位置后再完善地址">
            </section>
        </div>

        <h3>店铺图片</h3>
        <div class="store-form-section store-form-file">
            <section>
                <image :src="bannerSrc"
                    mode="aspectFill"
                    @click="showPreview(bannerSrc)"
                />
                <div>
                    <h3>店招照片</h3>
                    <p>需拍出完整门匾、门框（建议正对门店2米处拍摄）</p>
                    <button class="store-form-uploader"
                            :disabled="btns.banner"
                            :loading="btns.banner"
                            @click="uploadFile('banner')"
                    >
                        <i-icon type="add" size="35" />上传
                    </button>
                </div>
            </section>
            <section>
                <image :src="innerSrc"
                    mode="aspectFill"
                    @click="showPreview(innerSrc)"
                />
                <div>
                    <h3>店内环境</h3>
                    <p>需真实反应店内环境，如收银台、商品展示、桌椅等</p>
                    <button class="store-form-uploader"
                            :disabled="btns.inner"
                            :loading="btns.inner"
                            @click="uploadFile('inner')"
                    >
                        <i-icon type="add" size="35" />上传
                    </button>
                </div>
            </section>
        </div>

        <h3>资质图片</h3>
        <div class="store-form-section store-form-file">
            <section>
                <image :src="licenseSrc"
                    mode="aspectFill"
                    @click="showPreview(licenseSrc)"
                />
                <div>
                    <h3>营业执照</h3>
                    <p>需文字清晰、边框完整、露出国徽，可用有效特许证件代替</p>
                    <button class="store-form-uploader"
                            :disabled="btns.license"
                            :loading="btns.license"
                            @click="uploadFile('license')"
                    >
                        <i-icon type="add" size="35" />上传
                    </button>
                </div>
            </section>

            <section>
                <image :src="identitySrc"
                    mode="aspectFill"
                    @click="showPreview(identitySrc)"
                />
                <div>
                    <h3>法人身份证</h3>
                    <p>需清晰展示身份证文字信息</p>
                    <button class="store-form-uploader"
                            :disabled="btns.identity"
                            :loading="btns.identity"
                            @click="uploadFile('identity')"
                    >
                        <i-icon type="add" size="35" />上传
                    </button>
                </div>
            </section>
        </div>

        <div class="store-form-section store-form-btn">
            <section style="border: none;">
                <button class="store-form-submit" @click="doSubmit">提交资料</button>
            </section>
        </div>

        <div style="height: 100rpx;"></div>

        <i-modal title="定位授权" :visible="modal.show" :show-ok="false" :show-cancel="false" :actions="modal.actions" @iclick="onModalClick">
            <div style="padding: 0 20rpx; color: #777; text-indent: 56rpx; text-align: left;">
                我们需要获取您当前的定位信息，以便您可以直接在地图上选取店铺的精确位置！
            </div>
        </i-modal>

        <i-message id="message" />
    </div>
</template>

<script>
// import { map } from '@/utils';
import { mapState } from 'vuex';
import { imgHost } from '@/config';
import { $Message } from '@/ui/iview/base/index';

export default {
    data: () => ({
        industryIndex: null,

        modal: {
            show: false,
            actions: [
                {name: '关闭', color: '#999'},
                {name: '开启授权', color: 'green', openType: 'openSetting'},
            ]
        },

        btns: {
            banner: false,
            inner: false,
            license: false,
            identity: false,
        }
    }),

    computed: {
        ...mapState('store', [
            'industries',
            'store',
        ]),
        ...mapState('user', [
            'token',
        ]),

        industryName() {
            let item = this.industries[this.industryIndex];
            return item ? item.name : '请选择行业';
        },

        showLat() {
            return this.store.latitude.toFixed(5);
        },

        showLng() {
            return this.store.longitude.toFixed(5);
        },

        bannerSrc() {
            if (this.store.banner) {
                return `${imgHost}fit/600/${this.store.banner}`;
            } else {
                return `${imgHost}fit/300/store~facade~null.png`;
            }
        },

        innerSrc() {
            if (this.store.inner) {
                return `${imgHost}fit/600/${this.store.inner}`;
            } else {
                return `${imgHost}fit/300/store~inner~null.png`;
            }
        },
        licenseSrc() {
            if (this.store.license) {
                return `${imgHost}fit/900/${this.store.license}`;
            } else {
                return `${imgHost}fit/300/store~license~null.png`;
            }
        },
        identitySrc() {
            if (this.store.identity) {
                return `${imgHost}fit/900/${this.store.identity}`;
            } else {
                return `${imgHost}fit/300/store~identity~null.png`;
            }
        },
    },

    methods: {
        showPreview(url) {
            wx.previewImage({
                urls: [
                    url
                ]
            })
        },

        onIndustryChange(e) {
            this.industryIndex = e.mp.detail.value;
            this.store.industry_id = this.industries[this.industryIndex].id;
            // this.$store.commit('store/saveStore', {industry_id: this.industries[this.industryIndex].id});
        },

        onModalClick(e) {
            this.modal.show = false;
        },

        chooseLocation() {
            wx.getSetting({
                success: res => {
                    if (res.authSetting['scope.userLocation']) {
                        wx.chooseLocation({
                            type: 'gcj02',
                            success: (res) => {
                                // this.$store.commit('store/saveStore', {
                                //     latitude: res.latitude,
                                //     longitude: res.longitude,
                                //     address: res.address + res.name,
                                // });
                                this.store.latitude = res.latitude;
                                this.store.longitude = res.longitude;
                                // this.store.address = res.address + res.name;
                                this.store.address = res.address;

                                // map.reverseGeocoder({
                                //     location: res,
                                //     success: (res) => {
                                //         if (res.status === 0) {
                                //             const { ad_info, address_component } = res.result;
                                //             this.$store.commit('store/saveStore', {
                                //                 city_id: ad_info.city_code.substr(-6),
                                //                 dist_id: ad_info.adcode,
                                //                 city: address_component.city,
                                //                 district: address_component.district,
                                //                 street: address_component.street,
                                //             });
                                //         }
                                //     }
                                // })
                            },
                        });
                    } else {
                        this.modal.show = true;
                    }
                }
            });

        },

        uploadFile(type) {
            wx.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success: res => {
                    this.btns[type] = true;
                    wx.uploadFile({
                        url: imgHost + "upload",
                        filePath: res.tempFilePaths[0],
                        name: 'file',
                        formData: {
                            path: `store/${type}`
                        },
                        header: {
                            'Authorization': `Bearer ${this.token}`,
                        },
                        success: res => {
                            let ret = JSON.parse(res.data);
                            this.store[type] = ret.data.filename;
                        },

                        complete: () => {
                            this.btns[type] = false;
                        }
                    })
                },
            })
        },

        async doSubmit() {
            const { store } = this;

            if (store.name.trim() === '') {
                $Message({
                    content: '店铺名称必须填写',
                    type: 'error',
                });
                return false;
            }

            if (store.phone.trim() === '') {
                $Message({
                    content: '联系电话必须填写',
                    type: 'error',
                });
                return false;
            }

            if (store.open_time.trim() === '') {
                $Message({
                    content: '营业时间必须填写',
                    type: 'error',
                });
                return false;
            }

            if (store.industry_id === 0) {
                $Message({
                    content: '所属行业必须选择',
                    type: 'error',
                });
                return false;
            }

            if (! store.latitude || ! store.longitude) {
                $Message({
                    content: '位置必须选择',
                    type: 'error',
                });
                return false;
            }

            if (store.address.trim() === '') {
                $Message({
                    content: '地址必须填写',
                    type: 'error',
                });
                return false;
            }

            if (! store.banner) {
                $Message({
                    content: '店招图必须上传',
                    type: 'error',
                });
                return false;
            }

            if (! store.inner) {
                $Message({
                    content: '店内环境图必须上传',
                    type: 'error',
                });
                return false;
            }

            if (! store.license) {
                $Message({
                    content: '营业执照必须上传',
                    type: 'error',
                });
                return false;
            }

            if (! store.identity) {
                $Message({
                    content: '法人身份证必须上传',
                    type: 'error',
                });
                return false;
            }

            await this.$store.dispatch('store/apply');
        }
    },

    async mounted() {
        wx.showLoading({
            mask: true
        });
        await this.$store.dispatch('store/getIndustries');
        if (this.store.industry_id > 0) {
            this.industries.filter((i, k) => {
                if (i.id === this.store.industry_id) {
                    this.industryIndex = k;
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.store-form {
    background: #f7f7f7;

    h3 {
        line-height: 90rpx;
        font-size: 32rpx;
        font-weight: 400;
        text-indent: 10rpx;
    }

    &-section {
        background: #fff;
        border-top: 1rpx solid #eee;
        border-bottom: 1rpx solid #eee;
        padding-left: 10rpx;
    }

    &-submit {
        background: rgba(255, 68, 51, .8);
        width: 100%;
        height: 90rpx;
        line-height: 90rpx;
        color: #fff;
        font-size: 30rpx;
        font-weight: 200;
        padding: 0;
        border-radius: 0;
    }

    &-uploader {
        margin: 0;
        margin-top: 10rpx;
        padding: 0;
        background: #f60;
        border: none;
        border-radius: 3px;
        color: #fff;
        font-size: 28rpx;
        height: 50rpx;
        width: 150rpx;
        line-height: 50rpx;
        font-weight: 300;
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
                    content: "："
                }
            }

            input, picker, p {
                flex: 4;
                font-size: 28rpx;
                height: 70rpx;
                line-height: 70rpx;
            }
        }

        section:last-child {
            border: none;
        }
    }

    &-file {
        border-top: 1rpx solid #eee;
        border-bottom: 1rpx solid #eee;

        section {
            padding: 20rpx;
            border-bottom: 1rpx solid #f1f1f1;
            display: flex;
        }

        section:last-child {
            border: none;
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
}
</style>

<template>
    <div class="container">

        <div style="background: #f43; padding: 10rpx;">
            <div class="coupon-list" style="overflow: hidden;">
                <p class="cm-title ellipsis">{{detail.promotion.data.title}}</p>
                <div style="text-align:center; position: relative;">
                    <div v-if="detail.status != 100" style="position: absolute; width: 100%; height: 100%; display: flex; align-items:center; justify-content: center; background: rgba(180, 185, 150, .5)">
                        <span style="color: #000; font-size: 40rpx; font-weight: 100;">
                            <!-- 已使用 -->
                            {{statusText}}
                        </span>
                    </div>

                    <div :style="{opacity: detail.status != 100 ? .02 : 1}">
                        <image :src="qrImg" style="width: 500rpx; height: 500rpx;" mode="aspectFill" />
                        <p v-if="qrcode.refresh" @click="getQrcode" style="color: #777; font-weight: 300; height: 50rpx; line-height: 10rpx;"><i-icon type="refresh" size="35" />{{qrcode.message}}</p>
                        <p v-else style="color: #777; font-weight: 300; height: 50rpx; line-height: 10rpx; color: RGBA(0, 178, 106, 1.00)"><i-icon type="success" size="35" style="vertical-align: -1rpx" />{{qrcode.message}}</p>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div class="coupon-price">
                <div style="display: flex;" v-if="detail.promotion_type === 1">
                    <div style="flex: .5;">
                        <span>￥</span>
                        <span style="font-size: 60rpx;">{{valueTxt}}</span>
                    </div>
                    <div style="flex: 1; padding: 20rpx 0 0 10rpx;">
                        <coupon-tag />
                    </div>
                </div>

                <div style="display: flex;" v-if="detail.promotion_type === 2">
                    <div style="flex: .5;">

                        <span style="font-size: 60rpx;">{{valueTxt}}</span>
                        <span> 折</span>
                    </div>
                    <div style="flex: 1; padding: 20rpx 0 0 10rpx;">
                        <coupon-tag text="折扣劵" />
                    </div>
                </div>

                <div>
                    <!-- <p>累计使用：32536</p> -->
                    <p>今天使用：{{detail.today_used}}</p>
                </div>
            </div>
        </div>

        <div style="text-align: center;">
            <zan-tab
                id="couponTab"
                :list="tabMaps"
                :selected-id="selectedTab"
                :height="90"
                :fixed="false"
                @tabchange="handleTabChange"
            />
        </div>

        <div>
            <swiper
                :indicator-dots="false"
                :autoplay="false"
                :interval="5000"
                :duration="300"
                :current-item-id="selectedTab"
                @change="handleSwiperChange"
                :style="{height: swiperHeight}"
            >

                <swiper-item item-id="intro">
                    <div id="intro">
                        <zan-panel :title="detail.store.data.name">
                            <div class="coupon-intro coupon-store" style="padding-right: 0;">
                                <div style="flex: 3.6">
                                    <dl>
                                        <dt><i-icon type="clock_fill" size="34" />营业时间：</dt>
                                        <dd>{{detail.store.data.open_time}}</dd>
                                    </dl>
                                    <dl>
                                        <dt><i-icon type="shop_fill" size="34" />门店地址：</dt>
                                        <dd @click="showMap">{{detail.store.data.address}}</dd>
                                    </dl>
                                </div>
                                <div style="flex: 1.4">
                                    <div @click="telCall"
                                        :class="{'btn-hover': isTouched.phone}"
                                        data-name="phone"
                                        @touchstart="btnTouchStart"
                                        @touchend="btnTouchEnd"
                                        style="margin:0 auto; color: #fff; background:#00B662; font-size: 40rpx; text-align: center; line-height: 70rpx; width:70rpx; height: 70rpx; border-radius: 50%;"
                                    >
                                        <zan-icon type="phone" />
                                    </div>
                                    <p @click="showMap" style="font-size: 26rpx; font-weight: 300; padding: 30rpx 0; color: #777">
                                        <span style="border: 1px dashed #ddd; border-radius: 5rpx; padding: 5rpx; padding-right: 10rpx;">
                                            <i-icon size="32" color="#777" type="coordinates" />{{ detail.distance }}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </zan-panel>

                        <zan-panel title="用劵须知">
                            <div class="coupon-intro">
                                <text>{{ intro }}</text>
                            </div>
                        </zan-panel>

                        <zan-panel title="商家说明">
                            <div class="coupon-intro">
                                <text>{{detail.promotion.data.content}}</text>
                            </div>
                        </zan-panel>
                    </div>
                </swiper-item>

                <swiper-item item-id="comment" v-for="(s, k) in evaluationList" :key="k">
                    <div id="comment">
                        <div class="comment-top">
                            <div>
                                <div style="font-size: 50rpx; color: #f43;">{{evaluationListPaginate.score}}</div>
                                <p>商家评分</p>
                            </div>
                            <div>
                                <div style="font-size: 50rpx; color: #777;">97%</div>
                                <p>满意度</p>
                            </div>
                        </div>

                        <comment-item
                            :avatar="s.user.data.avatar"
                            :score="s.score"
                            :nickname ="s.user.data.nick_name"
                            :date="s.created_at"
                            :title="s.promotion.data.title"
                            :content="s.content"
                            :images="s.images"
                        />
                        <zan-loadmore :type="evaluationListLoader.type" :text="evaluationListLoader.text" style="color: #888;"></zan-loadmore>
                    </div>
                </swiper-item>


            </swiper>



        </div>

        <div class="coupon-footer-holder"></div>

        <div class="coupon-footer">
            <div @click="openAction" :class="{'btn-hover': isTouched.action}" data-name="action" @touchstart="btnTouchStart" @touchend="btnTouchEnd">
                <i-icon type="share" size="36" color="#fff" />分享赚钱
            </div>
            <div @click="goToComment" :class="{'btn-hover': isTouched.buy}" data-name="buy" @touchstart="btnTouchStart" @touchend="btnTouchEnd">
                <i-icon type="message" size="36" color="#fff" />立即点评
            </div>
        </div>

        <i-action-sheet :visible="showAction" :actions="actions" :show-cancel="true" @cancel="hideAction" @click="click" />

    </div>
</template>

<script>
import coupon from '@/components/coupon';
import couponTag from '@/components/couponTag';
import commentItem from '@/components/commentItem';
import progressBar from '@/components/progressBar';
import dayjs from 'dayjs';
import { formatPromotionIntro, sleep } from '@/utils';
import { mapState } from 'vuex';
import { goHost } from '@/config';
import { setInterval, clearInterval, setTimeout, clearTimeout, clearImmediate } from 'timers';

export default {
    components: {
        coupon,
        couponTag,
        commentItem,
        progressBar,
    },
    computed: {
        ...mapState('user', ['coordi']),
        ...mapState('coupon', ['detail','qrcode','evaluationList','evaluationListPaginate','evaluationListLoader']),

        statusText: function () {
            var text = "已取消";
            if(this.detail.status ===0){
                text = "待支付"
            }else if(this.detail.status ===-10){
                text = "已过期"
            }else if(this.detail.status ===10){
                text = "已使用"
            }else if(this.detail.status ===100){
                text = "未使用"
            }
            return text;
        },

        intro() {
            return formatPromotionIntro(this.detail.promotion.data);
        },

        valueTxt() {
            return this.detail.promotion_type === 1 ? this.detail.value : this.detail.value * 100;
        },

        qrImg() {
            return `${goHost}qrcode/${this.qrcode.file}`;
        },
        qrExp() {

        }
    },

    data: () => ({
        id: 0,
        screenBrightness: .3,
        isTouched: {
            'comment': false,
            'phone': false,
        },

        tabMaps: [
            {
                id: 'intro',
                title: '使用说明',
            },
            {
                id: 'comment',
                title: '用户点评',
            },
        ],

        selectedTab: 'intro',

        showAction: false,
        actions: [
            {
                name: '选项1',
            },
            {
                name: '选项2'
            },
            {
                name: '去分享',
                icon: 'share',
                openType: 'share'
            }
        ],
        swiperHeight: '1000px',

        qrCode: {
            showOK: true,
            showRefresh: false,
            message: '',
        },

    }),

    methods: {
        fixHeight() {
            wx.createSelectorQuery().select('#' + this.selectedTab).boundingClientRect(rect => {
                // console.log(rect.height)
                this.swiperHeight = rect.height + 'px';
            }).exec();
        },

        onShareAppMessage() {
            return {
                title: 'iView Weapp',
                imageUrl: 'https://file.iviewui.com/iview-weapp-logo.png'
            };
        },

        openAction() {
            this.showAction = true;
        },
        hideAction() {
            this.showAction = false;
        },

        btnTouchStart(event) {
            this.isTouched[event.currentTarget.dataset.name] = true;
        },
        btnTouchEnd(e) {
            this.isTouched[e.currentTarget.dataset.name] = false;
        },
        goToComment() {
            wx.navigateTo({
                url: "/pages/comment/form?user_coupon_id="+this.detail.id+"&store_name="+this.store.name+"&title="+this.promotion.title,
            })
        },
        telCall() {
            wx.makePhoneCall({
                phoneNumber: this.detail.store.data.phone
            });
        },
        showMap() {
            wx.openLocation({
                latitude: this.detail.store.data.latitude,
                longitude: this.detail.store.data.longitude,
                scale: 17,
                name: this.detail.store.data.name,
            })
        },
        handleTabChange(e) {
            this.selectedTab = e.mp.detail;
            // console.log(e)
            if(this.selectedTab =="comment"){
                this.getEvaluationList()
            }

        },
        handleSwiperChange(e) {
            this.selectedTab = e.mp.detail.currentItemId;
            this.fixHeight();
        },
        getEvaluationList(replace = false){
            console.log("list")
            let current_page = this.evaluationListPaginate.pagination.current_page
            let page = current_page + 1;

            this.$store.dispatch('coupon/getEvaluationList', {
                store_id: this.detail.store.data.id ? this.detail.store.data.id:1 ,
                include : "user,promotion",
                page:page,
            });
        },

        async getQrcode() {
            await this.$store.dispatch('coupon/getQrcode', {
                id: this.id,
            })
        },
    },

    async onLoad(options) {
        const { query } = this.$mp;
        this.id = parseInt(query.id) || 0;
        console.log(query);
        let params = {
            include: 'promotion,store'
        };
        if (this.coordi) { //计算距离
            params.location = `${this.coordi.latitude},${this.coordi.longitude}`;
        }
        await this.getQrcode();
        await this.$store.dispatch('coupon/getDetail', {
            id: this.id,
            params,
        });

        await sleep(500);
        this.fixHeight();

        if (this.id % 2 !== 0) {
            wx.getScreenBrightness({
                success: (res) => {
                    console.log(res);
                    this.screenBrightness = res.value;
                    wx.setScreenBrightness({
                        value: .8,
                    });
                }
            })
        }
    },

    onUnload() {
        console.log('页面卸载')
        this.$store.dispatch('coupon/clearTimeInterval')
        // if (this.id % 2 !== 0) {
        //     wx.setScreenBrightness({
        //         value: this.screenBrightness,
        //         success: (res) => {
        //             console.log(res);
        //         }
        //     });
        // }
    },

    onReachBottom() {
        console.log("bottom");
        if (this.evaluationListPaginate.pagination.current_page >= this.evaluationListPaginate.pagination.total_pages) {
            return false;
        } else {
            this.getEvaluationList()
        }
    },
}
</script>

<style>
.coupon-list {
    position: relative;
    margin: 20rpx auto;
    width: 90%;
    border-radius: 10rpx;
    box-shadow: 0 10px 20px rgba(29, 49, 85, 0.28);
    background: #fff;
}
.cm-title {
    height: 80rpx;
    border-bottom: 1px dashed #eee;
    line-height: 80rpx;
    text-align: center;
    font-size: 30rpx;
    color: #555;
    font-weight: 300;
}
.coupon-price {
    background: linear-gradient(to bottom, #fff, #fefefe);
    height: 70rpx;
    border-bottom: 2rpx dashed #eee;
    overflow: hidden;
    font-size: 24rpx;
    display: flex;
    padding: 10rpx;
}
.coupon-price > div:first-child {
    flex: 3;
    color: #FF4343;
}
.coupon-price > div:nth-child(2) {
    flex: 1;
    font-size: 22rpx;
    font-weight: 300;
}
.coupon-price > div:last-child > p {
    line-height: 33rpx;
    height: 33rpx;
}
.coupon-intro {
    line-height: 45rpx;
    padding: 30rpx 40rpx;
}
.coupon-store {
    display: flex;
}
.coupon-store > div:first-child {
    flex: 4;
}
.coupon-store > div:last-child {
    flex: 1;
    border-left: 1px solid #f7f7f7;
    text-align: center;
}
.coupon-store dl {
    display: flex;
}
.coupon-store dl > dt {
    flex: 1.4;
    color: #555;
}
.coupon-store dl > dd {
    flex: 2.7;
}
.coupon-footer-holder {
    height: 90rpx;
}
.coupon-footer {
    width: 100%;
    background: #f9f9f9;
    height: 90rpx;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    display: flex;
    line-height: 80rpx;
    box-shadow:0px -4px 15px rgba(100, 100, 100, .3);
}
.coupon-footer > div {
    flex: 1;
    text-align: center;
    line-height: 90rpx;
    color: #fff;
    font-size: 30rpx;
    font-weight: 300;
}
.coupon-footer > div:first-child {
    background: #FF8755;
}
.coupon-footer > div:last-child {
    background: #ff4343;
}
.btn-hover {
    opacity: .8;
}

.comment-btn {
    margin-top: 6rpx;
    background: #f43;
    color: #fff;
    width: 190rpx;
    height: 60rpx;
    line-height: 60rpx;
    text-align: center;
    border-radius: 6rpx;
    font-size: 30rpx;
}

.comment-top {
    padding: 20rpx 0;
    display: flex;
    color: #999;
    font-size: 22rpx;
    border-bottom: 1px solid #f7f7f7;
}
.comment-top > div {
    flex: 1;
    text-align: center;
}
.comment-top > div:last-child {
    border-left: 1px solid #f7f7f7;
}
</style>

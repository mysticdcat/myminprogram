<template>
    <div class="container">
        <div class="top-search">
            <search-bar :city="city.name" />
        </div>

        <div style="height: 360rpx;">
            <swiper :indicator-dots="true"
                :autoplay="true" circular :interval="5000" :duration="300" style="height: 350rpx; border-radius: 10rpx; margin:0 10rpx; box-shadow: 2px 2px 3px rgba(29, 49, 85, .3);">
                <block v-for="(item, index) in imgUrls" :key="index">
                    <swiper-item style="border-radius: 10rpx;">
                        <image :src="item" class="slide-image" mode="aspectFill" />
                    </swiper-item>
                </block>
            </swiper>
        </div>

        <div class="tab-wrapper">
            <zan-tab
                id="filterTab"
                :scroll="false"
                :list="filterMaps"
                :selected-id="selectedTab"
                :height="80"
                :fixed="false"
                @tabchange="handleTabChange"
            />
        </div>

        <div class="shop-list">
            <swiper
                :indicator-dots="false"
                :autoplay="false"
                :interval="5000"
                :duration="300"
                :current-item-id="selectedTab"
                @change="handleSwiperChange"
                :style="{height: swiperHeight}"
            >

                <swiper-item v-for="(s, k) in filterMaps" :key="k" :item-id="s.id">
                    <div v-if="!list[s.id] || list[s.id].length === 0">

                        <div class="shop-list-local-setting" v-if="s.id === 'nearby' && showOpenSetting">
                            <p>客官，我不知您身在何处，千言万语，不知从何说起</p>
                            <button open-type="openSetting" @opensetting="openSetting">位置授权</button>
                        </div>

                        <div class="shop-list-loading" v-else>
                            <p>正在玩命加载，客官稍候片刻...</p>
                        </div>
                    </div>

                    <div v-else :id="s.id">
                        <shop-item
                            v-for="item in list[s.id]"
                            :image="item.store.data.banner"
                            :title="item.title"
                            :name="item.store.data.name"
                            :key="item.id"
                            :url="`/pages/coupon/index?id=${item.id}`"
                            :distance="item.distance"
                            :selled="item.received"
                            :quantity="item.quantity"
                            :deduction="item.value"
                            :price="item.price"
                            :type="item.type"
                            :latitude="item.store_lat"
                            :longitude="item.store_lng"
                        />
                        <zan-loadmore :type="loader[s.id].type" :text="loader[s.id].text" style="color: #888;"></zan-loadmore>
                    </div>
                </swiper-item>

            </swiper>
        </div>

    </div>
</template>

<script>
import shopItem from '@/components/shopItem'
import searchBar from '@/components/searchBar';
import { mapState } from 'vuex';
import { loginMixin } from '@/mixins';
import { imgHost } from '@/config';

export default {
    mixins: [
        loginMixin,
    ],

    data () {
        return {
            imgHost,
            showOpenSetting: false,

            imgUrls: [

                'http://seopic.699pic.com/photo/40007/7624.jpg_wh1200.jpg',
                'http://seopic.699pic.com/photo/50011/8655.jpg_wh1200.jpg',
                'https://img.meituan.net/msmerchant/998af828dac10b9a1099d347add4c5561007768.jpg',

            ],
            interval: 3000,
            duration: 500,

            filterMaps: [
                {
                    id: 'nearby',
                    title: '离我最近',
                },
                {
                    id: 'popular',
                    title: '最受欢迎',
                },

            ],
            selectedTab: 'nearby',
            distanceTab: 0,

            swiperHeight: '500rpx',
        }
    },

    computed: {
        ...mapState('user', ['city', 'coordi']),
        ...mapState('home', ['list', 'paginate', 'loader']),
    },

    components: {
        searchBar,
        shopItem,
    },

    methods: {
        fixHeight(type = this.selectedTab) {
            if (this.list[type] && this.list[type].length > 0) {
                this.swiperHeight = 280 * this.list[type].length + 50 + 'rpx'
            } else {
                this.swiperHeight = '350rpx';
            }
            // wx.createSelectorQuery().select(`#${type}`).boundingClientRect(rect => {
            //     this.swiperHeight = rect.height + 10 + 'px';
            // }).exec();
        },

        async openSetting(e) {
            const { authSetting} = e.mp.detail;
            if (authSetting['scope.userLocation']) {
                await this.$store.dispatch('user/getPosition');
                this.showOpenSetting = false;
                this.getList(this.selectedTab, true);
            }
        },

        handleTabChange(e) {
            this.selectedTab = e.mp.detail;
            if (e.target.scroll) {
                e.target.onScroll(this.selectedTab);
            }
        },

        async handleSwiperChange(e) {
            let st = this.selectedTab;
            if (e.mp.detail.currentItemId !== st) {
                this.selectedTab = e.mp.detail.currentItemId;
            } else {
                this.selectedTab = st;
            }

            if (! this.list[this.selectedTab]) {
                await this.getList(this.selectedTab, true);
            }
            this.fixHeight();
        },

        async getList(type = this.selectedTab, replace = false) {
            let page = this.paginate[type].current_page + 1;
            if (replace) {
                page = 1;
            }
            let params = {};

            if (type === 'nearby') {
                if (this.coordi) {
                    params = Object.assign({}, params, {
                        search: '', //后期需要加入状态判断
                        include: 'store',
                        location: `${this.coordi.latitude},${this.coordi.longitude}`,
                        orderBy: 'distance',
                        sortedBy: 'asc',
                        size: 5,
                        page,
                    });

                    await this.$store.dispatch('home/getList', {
                        params,
                        replace,
                        type,
                    });
                } else {
                    this.showOpenSetting = true;
                    this.$store.commit('home/saveList', {
                        list: [],
                        pagination: {current_page: 0},
                        type: this.selectedTab,
                        replace: true,
                    }, { root: true });
                }
            } else {

                params = Object.assign({}, params, {
                    search: '', //后期需要加入状态判断
                    include: 'store',
                    orderBy: 'received',
                    sortedBy: 'desc',
                    size: 5,
                    page,
                });

                if (this.coordi) {
                    params.location = `${this.coordi.latitude},${this.coordi.longitude}`;
                }

                await this.$store.dispatch('home/getList', {
                    params,
                    replace,
                    type,
                });
            }

            this.fixHeight(type);
        },

        onShareAppMessage() {
            return {
                title: 'iView Weapp',
                imageUrl: 'https://file.iviewui.com/iview-weapp-logo.png'
            };
        },
    },

    async onPullDownRefresh(e) {
        this.$store.commit('home/saveList', {
            list: [],
            pagination: {current_page: 0},
            type: this.selectedTab,
            replace: true,
        }, { root: true });
        await this.getList(this.selectedTab, true);
        wx.stopPullDownRefresh();
    },

    onReachBottom(type = this.selectedTab) {
        if (this.paginate[type].current_page >= this.paginate[type].total_pages) {
            return false;
        } else {
            this.getList();
        }
    },

    async onLoad() {
        wx.showShareMenu();
        await this.checkLogin();

        await this.getList(this.selectedTab, true);
    },

    onShow() {

    },

    onReady() {

    }

}
</script>


<style lang="less" scoped>
.top-search {
    height: 70rpx;
    display: flex;
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    z-index: 1;
}

.tab-wrapper {
    position: sticky;
    position: -webkit-sticky;
    z-index: 1;
    top: 70rpx;
    border-top: 1px solid #f9f9f9;
}

.shop-list {
    background: #fff;
    padding-top: 8px;

    &-local-setting {
        color: #777;
        text-align: center;

        p {
            line-height: 180rpx;
        }

        button {
            width: 180rpx;
            height: 70rpx;
            color: #fff;
            font-size: 28rpx;
            line-height: 70rpx;
            background: rgba(255, 68, 51, .7);
        }
    }

    &-loading {
        p {
            color: #777;
            text-align: center;
            line-height: 200rpx;
        }
    }

}
</style>

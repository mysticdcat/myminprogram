<template>
    <div>
        <div style="position: fixed; top: 0; width: 100%; z-index: 10;">
            <zan-search
                placeholder="搜索..."
                :keyword="inputValue"
                :focus="focus"
                :useCancel="false"
                searchStyle="height: 88rpx; padding: 0 30rpx; background: #FFF; border-bottom: 1px solid #f7f7f7;"
                inputStyle="height: 60rpx; border-radius: 30rpx; background: #FAFAFA;"
                @change="searchChange"
                @search="searchDone"
            />
        </div>
        <div style="height: 88rpx;"></div>

        <div class="search-history" :class="{'hide': hideHistory}">
            <p class="search-history-title">
                <span class="search-history-del" @click="beforeClearHistory"><i-icon type="trash" size="45" /></span>
                最近搜索
            </p>
            <div>
                <span class="search-history-tag" v-for="(item, k) in history" :key="k" @click="(e) => { setSearch(item, e) } ">
                    {{item}}
                </span>
            </div>
        </div>

        <div class="search-result" :class="{'hide': hideResult}">
            <shop-item
                v-for="item in list"
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
            <zan-loadmore :type="loader.type" :text="loader.text" style="color: #888; "></zan-loadmore>
        </div>

        <i-modal :visible="modalShow" @ok="handleClearHistory" @cancel="()=> {this.modalShow = false;}">
            <view>确定要清空所有搜索记录吗？</view>
        </i-modal>
        <i-toast id="toast" />
        <i-message id="message" />
    </div>
</template>

<script>
import shopItem from '@/components/shopItem';
import { $Message } from '@/ui/iview/base/index';
import { sleep } from '@/utils';
import { mapState } from 'vuex';

const historySize = 10;

export default {
    components: {
        shopItem,
    },

    data: () => ({
        inputValue: '',
        focus: true,
        history: [],
        result: [],

        modalShow: false,
        hideHistory: false,
        hideResult: true,
    }),

    computed: {
        ...mapState('user', ['city', 'coordi']),
        ...mapState('search', ['list', 'paginate', 'loader']),
    },

    methods: {
        searchChange(e) {
            this.focus = true;
            this.inputValue = e.mp.detail.value;
        },

        async getList(replace = false) {
            let page = this.paginate.current_page + 1;
            if (replace) {
                page = 1;
            }

            let params = Object.assign({}, {
                search: `city_id:${this.city.id}`,
                include: 'store',
                searchWith: this.inputValue,
                orderBy: 'id',
                sortedBy: 'desc',
                size: 5,
                page,
            });

            if (this.coordi) {
                params = Object.assign(params, {
                    location: `${this.coordi.latitude},${this.coordi.longitude}`,
                    orderBy: 'distance',
                    sortedBy: 'asc',
                });
            }

            await this.$store.dispatch('search/getList', {replace, params});
        },

        async searchDone(e) {
            this.focus = false;
            if (this.inputValue === '') {
                $Message({
                    content: '主人，请给我一点提示我才能搜索哦~',
                    type: 'error'
                });
                await sleep(2);
                this.focus = true;
                return false;
            }

            wx.showLoading({
                mask: true,
                title: 'Loading...'
            })
            await this.getList(true);

            this.hideHistory = true;
            this.hideResult = false;

            let history = this.history;
            if (history.includes(this.inputValue)) {
                let fi = history.findIndex(i => i === this.inputValue);
                history.splice(fi, 1);
            } else {
                if (history.length == historySize) {
                    history.splice(historySize - 1, 1);
                }
            }
            history.splice(0, 0, this.inputValue);
            this.history = history;

            wx.setStorage({
                key: 'searchHistory',
                data: history,
            });
        },
        setSearch(tag, e) {
            this.inputValue = tag;
            this.focus = false;
            this.searchDone();
        },
        beforeClearHistory() {
            this.focus = false;
            this.modalShow = true;
        },
        handleClearHistory() {
            this.history = [];
            wx.setStorage({
                key: 'searchHistory',
                data: this.history,
            });
            this.modalShow = false;
            this.focus = true;
        }
    },

    onReachBottom() {
        if (this.paginate.current_page >= this.paginate.total_pages) {
            return false;
        } else {
            this.getList()
        }
    },

    created() {
        // wx.clearStorage();
        wx.getStorage({
            key: 'searchHistory',
            success: (res) => {
                this.history = res.data;
            },
            fail: () => {
                this.history = [];
                wx.setStorage({
                    key: 'searchHistory',
                    data: [],
                });
            }
        })
    },

    onUnload() {
        this.inputValue = '';
    },

    watch: {
        inputValue() {
            if (this.inputValue === '') {
                this.hideHistory = false;
                this.hideResult = true;
            }
        }
    }
}
</script>

<style lang="less" scoped>
.hide {
    display: none;
}
.search {
    &-history {
        padding: 0 20rpx;
        font-size: 26rpx;
        &-title {
            font-size: 30rpx;
            line-height: 70rpx;
            height: 70rpx;
            padding-top: 10rpx;
        }

        &-del {
            padding-left: 30rpx;
            float: right;
        }

        &-tag {
            color: #555;
            display: inline-block;
            height: 50rpx;
            line-height: 50rpx;
            padding: 0 10px;
            border-radius: 25rpx;
            margin: 20rpx 30rpx 20rpx 0;
            background: #f7f7f7;
        }
    }
    &-result {
        min-height: 100vh;
    }
}

</style>

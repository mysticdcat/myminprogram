<template>
    <div>

        <promotion-item
            v-for="item in list"
            :image="store.banner"
            :title="item.title"
            :key="item.id"
            :id="item.id"
            :received="item.received"
            :quantity="item.quantity"
            :value="item.value"
            :price="item.price"
            :type="item.type"
            :created="item.created_at"
            :audited="item.audit_at"
            :overed="item.overed_at"
            :status="item.status"
        />
        <zan-loadmore :type="loader.type" :text="loader.text" style="color: #888;"></zan-loadmore>

    </div>
</template>

<script>
import promotionItem from '@/components/promotionItem';
import { mapState } from 'vuex';

export default {
    components: {
        promotionItem,
    },

    data: () => ({
        animation: {},
    }),

    computed: {
        ...mapState('store', ['store']),
        ...mapState('promotion', ['list', 'paginate', 'loader']),
    },

    methods: {
        async loadData(replace = false) {
            let page = this.paginate.current_page + 1;
            if (replace) {
                page = 1;
            }
            let params = Object.assign({}, {
                orderBy: 'id',
                sortedBy: 'desc',
                size: 5,
                page,
            });

            await this.$store.dispatch('promotion/getList', {replace, params});
        }
    },

    async onPullDownRefresh() {
        await this.loadData(true);
        wx.stopPullDownRefresh();
    },

    onReachBottom() {
        if (this.paginate.current_page >= this.paginate.total_pages) {
            return false;
        } else {
            this.loadData()
        }
    },

    mounted() {
        wx.showLoading({
            title: '玩命加载...',
        });
        this.loadData(true);
    }
}
</script>

<style lang="less" scoped>

.promotion-item {
    font-size: 28rpx;
    border-top: 1rpx solid #f3f3f3;
    margin-bottom: 15rpx;

    &-title {
        font-size: 32rpx;
        line-height: 50rpx;
        border-bottom: 1rpx solid #f3f3f3;
        background: #f7f7f7;
        padding: 10rpx;
    }

    &-content {
        display: flex;
        padding: 10rpx 15rpx;
    }
    &-info {
        flex: 3;

        p {
            color: #777;
            line-height: 45rpx;
        }
    }

    &-actions {
        flex: 1;

    }

    &-btn {
        padding: 0;
        margin: 25rpx auto;
        height: 60rpx;
        line-height: 60rpx;
        width: 100%;
        font-weight: 200;
        font-size: 28rpx;
        background: #f43;
        color: #fff;
        border-radius: 5rpx;

        &[disabled] {
            background: #ddd;
            border-radius: 5rpx;
        }
    }
}
</style>


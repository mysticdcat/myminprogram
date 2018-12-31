<template>
<div class="container">
    <div class="shop-list">
        <feedback-item
            v-for="item in feedbackList"
            :key="item.id"
            :id="item.id"
            :content="item.content"
            :status="item.status"
            :created_at="item.created_at"
        />
       <zan-loadmore :type="feedbackLoader.type" :text="feedbackLoader.text" style="color: #888;"></zan-loadmore>
    </div>

    <div class="coupon-footer">
        <div @click="goForm" data-name="action" @touchstart="btnTouchStart" @touchend="btnTouchEnd">
            <i-icon type="brush" size="36" color="#fff" />我要反馈
        </div>
    </div>
</div>

</template>

<style>
.shop-list{
    padding-bottom: 90rpx;
}
.coupon-footer {
    width: 100%;
    background: #ff4433;
    height: 90rpx;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    display: flex;
    line-height: 80rpx;
    z-index: 10;
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

</style>


<script>
import feedbackItem from '@/components/feedbackItem'
import { mapState } from 'vuex';
export default {
    components: {
        feedbackItem,
    },
    data: () => ({
        animation: {},
    }),
    computed: {
        ...mapState('user', ['feedbackList', 'feedbackPaginate', 'feedbackLoader']),
    },
    methods: {
        goForm() {
            wx.navigateTo({
                url: '/pages/mine/feedbackform',
            })
        },
        async loadData(replace = false) {
            let page = this.feedbackPaginate.current_page + 1;
            if (replace) {
                page = 1;
            }

            let params = Object.assign({}, {
                orderBy: 'id',
                sortedBy: 'desc',
                size: 5,
                page,
            });

            await this.$store.dispatch('user/getFeedList', {replace, params});
        },


    },

    async onPullDownRefresh() {
        await this.loadData(true);
        wx.stopPullDownRefresh();
    },

    onReachBottom() {
        if (this.feedbackPaginate.current_page >= this.feedbackPaginate.total_pages) {
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
    },

}
</script>

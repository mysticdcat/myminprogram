<template>
       <div class="shop-list">
        <evaluation-item
            v-for="item in list"
            :key="item.id"
            :id="item.id"
            :title="item.title"
            :content="item.content"
            :created_at="item.created_at"
        />
       <zan-loadmore :type="loader.type" :text="loader.text" style="color: #888;"></zan-loadmore>
    </div>
</template>

<style lang="less" scoped>

</style>

<script>
import evaluationItem from '@/components/evaluationItem'
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState('evaluation', ['list','loader','paginate']),
    },
    components: {
        evaluationItem,
    },

    methods: {
        async getList(replace = false) {  //是否重新加载
            let page = this.paginate.current_page + 1;
            if (replace) {
                page = 1;
            }

            let params = Object.assign({}, {
                orderBy: 'id',
                sortedBy: 'desc',
                size: 10,
                page,
            });

            await this.$store.dispatch('evaluation/getList', {replace, params});
        },
    },

    async onReachBottom() {
        if (this.paginate.current_page < this.paginate.total_pages) {
            await this.getList(false);
        } else {
            return false;
        }
    },

    async onPullDownRefresh(e) {
        this.$store.commit('evaluation/saveList', {
            list: [],
            pagination: {current_page: 0,total_pages:1},
            replace: true,
        });
        await this.getList(true);
        wx.stopPullDownRefresh()
    },


    onReady() {
        this.getList(false);
    }
}


</script>

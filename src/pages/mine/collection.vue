<template>
       <div class="shop-list">
        <collection-item
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
import collectionItem from '@/components/collectionItem'
import { mapState } from 'vuex';

/*export default {
    computed: {
        ...mapState('collection', ['list','loader']),
    },
    components: {
        collectionItem,
    },

    methods: {
        async getList() {
            await this.$store.dispatch('collection/getList');
        }
    },

    onReady() {
        this.getList();
    }
}*/

export default {
    computed: {
        ...mapState('collection', ['list','loader','paginate']),
    },
    components: {
        collectionItem,
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

            await this.$store.dispatch('collection/getList', {replace, params});
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
        this.$store.commit('collection/saveList', {
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

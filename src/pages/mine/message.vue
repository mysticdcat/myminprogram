<template>
       <div class="shop-list">
        <message-item
            v-for="item in list"
            :key="item.id"
            :id="item.id"
            :title="item.title"
            :content="item.content"
            :created_at="item.created_at"
            :read_status="item.read_status"
            @click="readMessage(item.id)"
        />
       <zan-loadmore :type="loader.type" :text="loader.text" style="color: #888;"></zan-loadmore>
    </div>
</template>

<style lang="less" scoped>

</style>

<script>
import messageItem from "@/components/messageItem";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("message", ["list", "loader", "paginate"])
  },
  components: {
    messageItem
  },

    methods: {
        async readMessage(messageId){
            console.log(messageId)
            let params = Object.assign({}, {
                id: messageId,
            });
            await this.$store.dispatch('message/updateMesageStatus', {params});
        },
        async getList(replace = false) {  //是否重新加载
            let page = this.paginate.current_page + 1;
            if (replace) {
                page = 1;
            }

      let params = Object.assign(
        {},
        {
          orderBy: "id",
          sortedBy: "desc",
          size: 6,
          page
        }
      );
      await this.$store.dispatch("message/getList", { replace, params });
    }
  },

    async onReachBottom() {
        if (this.paginate.current_page < this.paginate.total_pages) {
            wx.showLoading({
                title: '玩命加载...',
            });
            await this.getList(false);
        } else {
            return false;
        }
    },

    async onPullDownRefresh() {
        this.$store.commit('message/saveList', {
            list: [],
            pagination: {current_page: 0,total_pages:1},
            replace: true,
        });
        await this.getList(true);
        // wx.stopPullDownRefresh()
    },

    onReady() {
        this.getList(false);
    }
}
</script>

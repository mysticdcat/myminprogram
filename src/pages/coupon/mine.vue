<template>
  <div class="container">

    <div class="tab-wrapper">
      <zan-tab
        id="filterTab"
        :scroll="false"
        :list="tabMap"
        :selected-id="selectedTab"
        :height="80"
        :fixed="true"
        @tabchange="handleTabChange"
      />
    </div>

    <div
      class="list"
      :style="{background: listBgColor}"
    >
      <swiper
        :indicator-dots="false"
        :autoplay="false"
        :interval="5000"
        :duration="300"
        :current-item-id="selectedTab"
        @change="handleSwiperChange"
        :style="{height: swiperHeight}"
      >
        <swiper-item
          v-for="(s, k) in tabMap"
          :key="k"
          :item-id="s.id"
        >
          <div v-if="! list[s.id]">
            <p class="list-item-loading">正在玩命加载，客官请稍候...</p>
          </div>

          <div v-else-if="list[s.id].length === 0">
            <p class="list-item-loading">还没有符合条件的数据哦~</p>
          </div>

          <div
            v-else
            :id="s.id"
          >
            <coupon-item
              v-for="item in list[s.id]"
              :image="imgHost+`fit/150/`+item.store.data.banner"
              :title="item.promotion.data.title"
              :name="item.store.data.name"
              :key="item.id"
              :id="item.id"
              :distance="item.distance"
              :selled="item.selled"
              :least="item.least"
              :value="item.value"
              :type="item.type"
              :status="item.status"
              :latitude="item.store.data.latitude"
              :longitude="item.store.data.longitude"
              :category="s.id"
              :start_at="item.start_at"
              :end_at="item.end_at"
            />

            <zan-loadmore
              :type="loader[s.id].type"
              :text="loader[s.id].text"
              style="color: #888;"
            ></zan-loadmore>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
import { sleep } from "@/utils";
import couponItem from "@/components/couponItem";
import { loginMixin } from "@/mixins";
import { mapState } from "vuex";
import { imgHost } from "@/config";

export default {
  mixins: [loginMixin],

  components: {
    couponItem
  },

  computed: {
    ...mapState("user", ["coordi"]),
    ...mapState("coupon", ["paginate", "loader", "list"])
  },

  data: () => ({
    scrollTop: 0,
    count: 8,
    tabMap: [
      {
        id: "normal",
        title: "待使用"
      },
      {
        id: "waitPay",
        title: "待支付"
      },
      {
        id: "used",
        title: "已使用"
      },
      {
        id: "expired",
        title: "已过期"
      }
    ],
    selectedTab: "normal",
    listBgColor: "#fff",
    imgHost: imgHost,

    swiperHeight: "600rpx"
  }),

  methods: {
    fixHeight(type = this.selectedTab) {
      // wx.createSelectorQuery().select('#' + this.selectedTab).boundingClientRect(rect => {
      //     console.log(rect);
      //     this.swiperHeight = rect.height + 10 + 'px';
      // }).exec();

      if (this.list[type] && this.list[type].length > 0) {
        this.swiperHeight = 280 * this.list[type].length + 50 + "rpx";
      } else {
        this.swiperHeight = "600rpx";
      }
    },

    handleTabChange(e) {
      this.selectedTab = e.mp.detail;
      this.listBgColor = this.selectedTab === "normal" ? "#fff" : "#ffffff";
      if (e.target.scroll) {
        e.target.onScroll(this.selectedTab);
      }
    },

    async handleSwiperChange(e) {
      this.selectedTab = e.mp.detail.currentItemId;
      this.listBgColor = this.selectedTab === "normal" ? "#fff" : "#ffffff";

      if (!this.list[this.selectedTab]) {
        await this.fetchData(this.selectedTab, true);
      }

      this.fixHeight();
    },

    async fetchData(type = this.selectedTab, replace = false) {
      let search = [];

      switch (type) {
        case "normal":
          search.push("status:100");
          break;
        case "waitPay":
          search.push("status:0");
          break;
        case "used":
          search.push("status:10");
          break;
        case "expired":
          search.push("status:-10");
          break;
      }

      let page = this.paginate[this.selectedTab].current_page + 1;

      if (replace) {
        page = 1;
      }

      let params = Object.assign(
        {},
        {
          include: "promotion,store",
          orderBy: "id",
          sortedBy: "desc",
          size: 5,
          search: search.join(";"),
          page
        }
      );

      if (this.coordi) {
        //计算距离
        params.location = `${this.coordi.latitude},${this.coordi.longitude}`;
      }

      await this.$store.dispatch("coupon/getList", { type, replace, params });

      this.fixHeight(type);
    }
  },

  onReachBottom() {
    if (
      this.paginate[this.selectedTab].current_page >=
      this.paginate[this.selectedTab].total_pages
    ) {
      return false;
    } else {
      this.fetchData();
    }
  },

  async onPullDownRefresh(e) {
    this.$store.commit(
      "coupon/saveList",
      {
        list: [],
        pagination: { current_page: 0 },
        type: this.selectedTab,
        replace: true
      },
      { root: true }
    );
    await this.fetchData(this.selectedTab, true);
    wx.stopPullDownRefresh();
  },

  async onLoad(options) {
    await this.checkLogin();
    await this.fetchData(this.selectedTab, true);
  },
  async onShow() {
    if (this.store.selectedTab) {
      this.selectedTab = this.store.selectedTab;
    }
  }
};
</script>

<style>
.list {
  padding-top: 8px;
  min-height: 100vh;
}
.list-item-loading {
  line-height: 400rpx;
  text-align: center;
  color: #777;
}
</style>

<template>
  <div class="mine">
    <div class="mine-header">
      <div
        class="mine-header-wp"
        @click="updateInfo"
      >
        <avatar
          :src="user.avatar"
          size="150"
        />
        <p class="mine-header-nickname">{{ nickName }}
          <i-icon
            type="brush_fill"
            size="30"
          />
        </p>
      </div>
      <div
        class="mine-header-message"
        @click="goToMessage"
      >
        <i-icon
          type="message"
          size="60"
          color="#fff"
        />
      </div>
    </div>

    <div
      class="mine-panel"
      style="margin-top: -30rpx;"
    >
      <div class="mine-panel-items">
        <div @click="goToBalance">
          <span>{{wallet.balance}}</span>
          <p>账户余额</p>
        </div>
        <div>
          <span>{{wallet.soure}}</span>
          <p>我的分享</p>
        </div>
      </div>
    </div>

    <div class="mine-panel">
      <h3>我的劵包</h3>
      <div class="mine-panel-items">
        <div @click='goToPacket("normal")'>
          <span>{{coupon.unuse}}</span><span> 张</span>
          <p>未使用</p>
        </div>
        <div @click='goToPacket("used")'>
          <span>{{coupon.used}}</span><span> 张</span>
          <p>已使用</p>
        </div>
        <div @click='goToPacket("expired")'>
          <span>{{coupon.invalid}}</span><span> 张</span>
          <p>已失效</p>
        </div>
      </div>
    </div>

    <div class="mine-panel">
      <ul class="mine-operates">
        <li @click="goToStore">
          <i-icon
            type="shop_fill"
            size="35"
          /> 我的店铺
          <span>
            <i-icon
              type="enter"
              size="40"
            /></span>
        </li>

      </ul>
    </div>

    <div class="mine-panel">
      <h3>服务</h3>
      <div class="mine-panel-items">

        <div @click="goToPage('novice')">
          <span>
            <i-icon
              type="document_fill"
              color="#f43"
              size="60"
            />
          </span>
          <p>常见问题</p>
        </div>

        <div @click="goToPage('notice')">
          <span>
            <i-icon
              type="activity_fill"
              color="#f43"
              size="60"
            />
          </span>
          <p>官方公告</p>
        </div>

        <div @click="goToPage('about')">
          <span>
            <i-icon
              type="prompt_fill"
              color="#f43"
              size="60"
            />
          </span>
          <p>关于我们</p>
        </div>
        <div @click="goFeedBack">
          <span>
            <i-icon
              type="interactive_fill"
              color="#f43"
              size="60"
            />
          </span>
          <p>意见反馈</p>
        </div>
      </div>
    </div>

    <div class="mine-panel">
      <ul class="mine-operates">
        <li @click="goToEvaluation">
          <i-icon
            type="shop_fill"
            size="35"
          /> 我的评价
          <span>
            <i-icon
              type="enter"
              size="40"
            /></span>
        </li>
        <li @click="goToUserCollection">
          <i-icon
            type="shop_fill"
            size="35"
          /> 我的收藏
          <span>
            <i-icon
              type="enter"
              size="40"
            /></span>
        </li>
        <li>
          <i-icon
            type="setup_fill"
            size="35"
          /> 系统设置
          <span>
            <i-icon
              type="enter"
              size="40"
            /></span>
        </li>
      </ul>
    </div>

    <i-modal
      title="用户授权"
      :visible="authModal.show"
      :show-ok="false"
      :show-cancel="false"
      :actions="authModal.actions"
      @iclick="onAuthModalClick"
      @getuserinfo="onGetUserInfo"
    >
      <div style="padding: 0 20rpx; color: #777; text-indent: 56rpx; text-align: left;">
        在您同意授权后，系统将自动同步您的微信头像和昵称！
      </div>
    </i-modal>
  </div>
</template>

<style lang="less" scoped>
.mine {
  background: #f9f9f9;
  padding-bottom: 80rpx;
  &-header {
    height: 350rpx;
    background: url("https://images.pexels.com/photos/1025990/pexels-photo-1025990.jpeg?auto=compress&cs=tinysrgb&&w=600")
      center no-repeat;
    background-size: cover;
    position: relative;

    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background: inherit;
      filter: blur(3px);
      -webkit-filter: blur(3px);
      z-index: 2;
    }

    &-wp {
      position: relative;
      z-index: 3;
      height: 400rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    &-nickname {
      font-size: 28rpx;
      color: #fff;
      line-height: 60rpx;
    }

    &-message {
      position: absolute;
      z-index: 3;
      top: 20rpx;
      right: 20rpx;
    }
  }

  &-panel {
    box-shadow: 0 1px 20px rgba(29, 49, 85, 0.103);
    position: relative;
    z-index: 4;
    background: #fff;
    margin: 30rpx 15rpx;
    border-radius: 20rpx;

    h3 {
      line-height: 70rpx;
      font-size: 32rpx;
      color: #555;
      padding: 5rpx 20rpx;
      border-bottom: 1px dashed #eee;
    }

    &-items {
      display: flex;

      div {
        text-align: center;
        padding-top: 30rpx;
        flex: 1;

        span {
          font-size: 40rpx;
          line-height: 80rpx;
          color: #555;

          &:nth-child(2) {
            font-size: 24rpx;
          }
        }

        p {
          color: #999;
          font-size: 28rpx;
          padding-bottom: 30rpx;
        }
      }
    }
  }

  &-operates {
    list-style: none;
    li {
      line-height: 80rpx;
      padding: 5rpx 20rpx;
      font-size: 30rpx;
      color: #777;
      border-bottom: 1px solid #f7f7f7;

      &:last-child {
        border: none;
      }

      span {
        float: right;
      }
    }
  }
}
</style>

<script>
import { mapState } from "vuex";
import avatar from "@/components/avatar";
import { loginMixin } from "@/mixins";
import wxapi from "@/utils/wxapi";

export default {
  mixins: [loginMixin],

  data: () => ({
    canUseOpenType: wx.canIUse("button.open-type.getUserInfo"),
    authModal: {
      show: false,
      actions: [
        { name: "不要同步", color: "#777" },
        { name: "我要授权", color: "#1890ff", openType: "getUserInfo" }
      ]
    }
  }),

  computed: {
    ...mapState("user", ["user", "wallet", "coupon"]),

    nickName() {
      return this.user.nick_name ? this.user.nick_name : "游客";
    }
  },

  components: {
    avatar
  },

  methods: {
    async goToStore() {
      let checkOk = await this.checkBind();
      if (checkOk) {
        wx.navigateTo({
          url: "/pages/store/index"
        });
      }
    },
    async goToPacket(selectedTab) {

      this.store.selectedTab = selectedTab
      wx.switchTab({
        url: `/pages/coupon/mine`,
      });
    },

    goToBalance() {
      wx.navigateTo({
        url: `/pages/mine/balance`
      });
    },

    goToPage(t) {
      wx.navigateTo({
        url: `/pages/mine/news?type=${t}`
      });
    },

    goToMessage() {
      wx.navigateTo({
        url: "/pages/mine/message"
      });
    },

    goToEvaluation() {
      wx.navigateTo({
        url: "/pages/mine/evaluation"
      });
    },

    goToUserCollection() {
      wx.navigateTo({
        url: "/pages/mine/collection"
      });
    },

    goFeedBack() {
      wx.navigateTo({
        url: `/pages/mine/feedback`
      });
    },

    updateInfo() {
      this.getWXUserInfo(true);
    },

    async getWXUserInfo(showTips = false) {
      let res = await wxapi("getSetting");

      if (res.authSetting["scope.userInfo"]) {
        let res = await wxapi("getUserInfo");
        const { userInfo } = res || {};
        let data = {
          avatar: userInfo.avatarUrl,
          nick_name: userInfo.nickName,
          gender: userInfo.gender,
          country: userInfo.country,
          province: userInfo.province,
          city: userInfo.city
        };

        await this.$store.dispatch("user/updateUser", data);

        if (showTips) {
          wxapi("showToast", {
            icon: "none",
            title: "头像、昵称已更新"
          });
        }
      } else {
        if (showTips) {
          if (this.canUseOpenType) {
            this.authModal.show = true;
          } else {
            wx.showToast({
              icon: "none",
              title: "授权失败"
            });
          }
        }
      }
    },

    onAuthModalClick(e) {
      this.authModal.show = false;
    },

    async onGetUserInfo(e) {
      const { userInfo } = e.mp.detail.data;
      let data = {
        avatar: userInfo.avatarUrl,
        nick_name: userInfo.nickName,
        gender: userInfo.gender,
        country: userInfo.country,
        province: userInfo.province,
        city: userInfo.city
      };

      await this.$store.dispatch("user/updateUser", {
        ...data
      });

      wxapi("showToast", {
        icon: "none",
        title: "授权成功，信息已同步"
      });
    },

    async userNum() {
      var token =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL2NvdXBvblNlcnZlclwvcHVibGljXC9hcGlcL3VzZXJcL3Rva2VuIiwiaWF0IjoxNTQxOTg1NTIyLCJleHAiOjE1NDIyNDQ3MjIsIm5iZiI6MTU0MTk4NTUyMiwianRpIjoiQ0xlRFpmODVNeDlUb2VZWSIsInN1YiI6MiwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.zDiDrRo4YkNVUFVbaC7AbbTu1ML33aVvRuN1u9P76D8";
      this.$store.dispatch("user/getUserInfo", {
        token: token
      });
    }
  },

  async mounted() {
    await this.checkLogin(false);
    this.getWXUserInfo();
    this.userNum();
  }
};
</script>


<template>
  <div class="container">
    <div>
      <swiper
        :indicator-dots="false"
        :autoplay="true"
        circular
        :interval="5000"
        :duration="300"
        style="height: 350rpx;"
      >
        <block
          v-for="(item, index) in promotion.images"
          :key="index"
        >
          <swiper-item>
            <image
              :src="imgHost + 'fit/600/' + item"
              class="slide-image"
              mode="aspectFill"
            />
          </swiper-item>
        </block>
      </swiper>
    </div>

    <div class="coupon-list">
      <div style="padding: 20rpx;">
        <coupon
          height="270rpx"
          width="98%"
          :value="promotion.value"
          :offset="promotion.offset"
          :type="promotion.type"
          :bgColor="couponBgColor"
          :expired="{days: promotion.days, start_at: promotion.start_at, end_at: promotion.end_at}"
        />
      </div>
    </div>

    <div class="coupon-title">
      <h3 class="ellipsis">{{promotion.title}}</h3>
      <div @click="openAction">
        <i-icon
          type="send"
          size="50"
          color="#999"
        />
      </div>
    </div>

    <div>
      <div class="coupon-price">
        <div>
          <span>￥</span>
          <span style="font-size: 60rpx;">{{price}}</span>
        </div>
        <div>
          <p style="margin-bottom: 10rpx;">{{least}}</p>
          <progress-bar
            active
            :percent="percent"
            :width="150"
            :text="`已抢 ${promotion.received} 份`"
          />
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
            <zan-panel :title="promotion.store.data.name">
              <div
                class="coupon-intro coupon-store"
                style="padding-right: 0;"
              >
                <div style="flex: 3.6">

                  <dl>
                    <dt>
                      <i-icon
                        type="clock_fill"
                        size="34"
                      />营业时间：</dt>
                    <dd>{{promotion.store.data.open_time}}</dd>
                  </dl>
                  <dl>
                    <dt>
                      <i-icon
                        type="shop_fill"
                        size="34"
                      />门店地址：</dt>
                    <dd @click="showMap">{{promotion.store.data.address}}</dd>
                  </dl>
                </div>
                <div style="flex: 1.4">
                  <div
                    @click="telCall"
                    :class="{'btn-hover': isTouched.phone}"
                    data-name="phone"
                    @touchstart="btnTouchStart"
                    @touchend="btnTouchEnd"
                    style="margin:0 auto; color: #fff; background:#00B662; font-size: 40rpx; text-align: center; line-height: 70rpx; width:70rpx; height: 70rpx; border-radius: 50%;"
                  >
                    <zan-icon type="phone" />
                  </div>
                  <p
                    @click="showMap"
                    style="font-size: 26rpx; font-weight: 300; padding: 30rpx 0; color: #777"
                  >
                    <span style="border: 1px dashed #ddd; border-radius: 5rpx; padding: 5rpx; padding-right: 10rpx;">
                      <i-icon
                        size="32"
                        color="#777"
                        type="coordinates_fill"
                      />{{promotion.distance}}
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
                <text>{{promotion.content}}</text>
              </div>
            </zan-panel>
          </div>
        </swiper-item>

        <swiper-item item-id="comment">
          <div id="comment">
            <div class="comment-top">
              <div>
                <div style="font-size: 50rpx; color: #f43;">4.2</div>
                <p>商家评分</p>
              </div>
              <div>
                <div style="font-size: 50rpx; color: #777;">97%</div>
                <p>满意度</p>
              </div>
            </div>
            <block
              v-for="(item, index) in promotion.images"
              :key="index"
            >
              <comment-item
                avatar="https://i.loli.net/2017/08/21/599a521472424.jpg"
                :score="4"
                nickname="橙子-001"
                date="2018-07-28"
                :title="title"
                content="份量还是很足的，味道也很合我的胃口，真的很不错，很赞。这个价格可以了，不常搞活动，感觉自己赚到了，嘿嘿。下次还会带朋友一起来吃！"
                :images="[
                                'http://p0.meituan.net/deal/__47977241__4531756.jpg@600w_600h_1l',
                                'http://p1.meituan.net/deal/__47977254__6807669.jpg@600w_600h_1l',
                                'http://p1.meituan.net/shaitu/459835672116f86f1c89e987919e77c5131750.jpg@600w_600h_1l',
                            ]"
              />
            </block>
            <!-- <comment-item
                            avatar="https://i.loli.net/2017/08/21/599a521472424.jpg"
                            :score="4"
                            nickname="橙子-001"
                            date="2018-07-28"
                            :title="title"
                            content="份量还是很足的，味道也很合我的胃口，真的很不错，很赞。这个价格可以了，不常搞活动，感觉自己赚到了，嘿嘿。下次还会带朋友一起来吃！"
                            :images="[
                                'http://p0.meituan.net/deal/__47977241__4531756.jpg@600w_600h_1l',
                                'http://p1.meituan.net/deal/__47977254__6807669.jpg@600w_600h_1l',
                                'http://p1.meituan.net/shaitu/459835672116f86f1c89e987919e77c5131750.jpg@600w_600h_1l',
                            ]"
                        />

                        <comment-item
                            avatar="http://p0.meituan.net/deal/4ebb8fa245e30cb19f97e951a0d4f090127838.jpg@600w_600h_1l"
                            score="2"
                            date="2018-07-27"
                            :title="title"
                            nickname="orange"
                            content="服务态度拒差。 太差了 以后不要去吃了 羊肉串还掉颜色 掉颜色都掉鱼上面了 都是染上去的颜色。火锅烤肉都不怎么样 不要去了"
                        />

                        <comment-item
                            avatar="http://p1.meituan.net/deal/7ce470c101c850897215ac0a448a8dd8136660.jpg@600w_600h_1l"
                            score="3"
                            date="2018-05-19"
                            :title="title"
                            nickname="喵小白"
                            content="和朋友吃完肚子疼，一个下午都在厕所度过，盘子很多灰尘和虫子。店家态度很差。东西很不卫生，真的超级后悔，没有吃什么东西完全没食欲。浪费钱，不知道好评哪来的，果然以后不能贪便宜唉"
                            :images="[
                                'http://p1.meituan.net/deal/2009786e896ea58ed766eed4ac65ab6c118429.jpg@600w_600h_1l',
                                'http://p1.meituan.net/deal/b8dd4a8ce987c95c14b714931f44adde824978.jpg@600w_600h_1l',
                                'http://p0.meituan.net/deal/50de9a1c7e9349712de84353c1a10be6104526.jpg@600w_600h_1l',
                            ]"
                        /> -->

            <zan-loadmore type="loading" />
          </div>
        </swiper-item>
      </swiper>
    </div>

    <div class="coupon-footer-holder"></div>

    <div class="coupon-footer">
      <div>
        <span @click="goHome">
          <i-icon
            type="homepage"
            size="55"
          />
          <i>首页</i>
        </span>
        <span @click="favorite">
          <i-icon
            size="55"
            :type="favOptions.type"
            :color="favOptions.color"
          />
          <i>关注</i>
        </span>
      </div>
      <div
        @click="openAction"
        :class="{'btn-share-disabled': shareDisabled}"
      >
        <i-icon
          type="share"
          size="36"
          color="#fff"
        />分享赚钱
      </div>
      <div
        @click="buy"
        :class="{'btn-buy-disabled': shareDisabled}"
      >
        ￥1.00 立即领取
      </div>
    </div>

    <i-modal
      title="领取失败"
      :visible="buyModal.show"
      :actions="buyModal.actions"
      @iclick="onBuyModalClick"
    >
      <div class="modal-content">
        {{buyModal.message}}
      </div>
    </i-modal>

    <i-modal
      title="用户授权"
      :visible="userAuthModal.show"
      :show-ok="false"
      :show-cancel="false"
      :actions="userAuthModal.actions"
      @iclick="onUserAuthModalClick"
      @getuserinfo="onGetUserInfo"
    >
      <div class="modal-content">
        生成海报时，需要用到您的头像和昵称，请允许我们获取这些信息
      </div>
    </i-modal>

    <i-modal
      title="相册授权"
      :visible="albumAuthModal.show"
      :show-ok="false"
      :show-cancel="false"
      :actions="albumAuthModal.actions"
      @iclick="onAlbumAuthModalClick"
    >
      <div class="modal-content">
        保存海报需要写入相册的权限，请允许我们保存到相册
      </div>
    </i-modal>

    <i-action-sheet
      :visible="showAction"
      :actions="actions"
      :show-cancel="true"
      @cancel="hideAction"
      @iclick="onActionClick"
    >
      <view
        slot="header"
        style="padding: 20rpx"
      >
        <view style="color: #444;font-size: 30rpx">分享赚钱</view>
        <text>每位好友通过您的分享成功领劵您均可获得 {{promotion.receive_commission}} 元佣金</text>
      </view>
    </i-action-sheet>

    <div
      class="coupon-share"
      catchtouchmove="ture"
      :hidden="! shareModal"
    >
      <div :style="{width: screen.width + 'px'}">
        <div style="box-shadow: 0px 1px 2px rgba(100, 100, 100, 0.2);">
          <canvas
            canvas-id="shareCanvas"
            :style="{ width: screen.width + 'px', height: screen.height + 'px' }"
          ></canvas>
        </div>
        <div class="coupon-share-save">
          <button @click="saveSharePicture">保存图片至相册</button>
          <p>将图片保存到相册后即可分享至朋友圈</p>
        </div>
        <div class="coupon-share-close">
          <i-icon
            @click="hideShareModal"
            type="delete_fill"
            size="100"
            color="#ddd"
          />
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import coupon from "@/components/coupon";
import commentItem from "@/components/commentItem";
import progressBar from "@/components/progressBar";
import { loginMixin } from "@/mixins";
import { mapState } from "vuex";
import { imgHost } from "@/config";
import { formatPromotionIntro } from "@/utils";
import wxapi from "@/utils/wxapi";
import { sleep } from "@/utils";

export default {
  mixins: [loginMixin],

  components: {
    coupon,
    commentItem,
    progressBar
  },

  computed: {
    ...mapState("home", ["promotion", "channel"]),
    ...mapState("user", ["user", "coordi"]),
    ...mapState("order", ["order"]),

    price() {
      return this.promotion.price.toFixed(2);
    },

    least() {
      return this.promotion.quantity
        ? `剩 ${this.promotion.quantity - this.promotion.received} 份`
        : "不限量";
    },

    percent: function() {
      return this.promotion.quantity
        ? Math.ceil(this.promotion.received / this.promotion.quantity * 100)
        : 100;
    },

    intro() {
      return formatPromotionIntro(this.promotion);
    },

    couponBgColor() {
      return this.promotion.status === 1
        ? this.promotion.type === 1
          ? "#D2415F"
          : "#f43"
        : "#bbbbbb";
    }
  },

  data: () => ({
    imgHost,
    query: {}, // Query params;
    screen: {
      rpx: 1,
      width: 0,
      height: 0
    },
    shareModal: false,
    sharePicCreated: false,
    shareDisabled: true,
    isTouched: {
      phone: false
    },

    tabMaps: [
      {
        id: "intro",
        title: "使用说明"
      },
      {
        id: "comment",
        title: "用户点评"
      }
    ],

    selectedTab: "intro",

    showAction: false,
    actions: [
      {
        name: "生成海报发送朋友圈",
        aliIcon: "pengyouquan"
      },
      {
        name: "转发给微信好友或群",
        aliIcon: "weixin2",
        openType: "share"
      }
    ],
    swiperHeight: "1000px",

    userAuthModal: {
      show: false,
      actions: [
        { name: "暂不分享", color: "#777" },
        { name: "同意授权", color: "#1890ff", openType: "getUserInfo" }
      ]
    },

    albumAuthModal: {
      show: false,
      actions: [
        { name: "暂不保存", color: "#777" },
        { name: "同意授权", color: "#1890ff", openType: "openSetting" }
      ]
    },

    buyModal: {
      show: false,
      actions: [],
      message: "",
      code: 0
    },

    favOptions: {
      color: "#777",
      type: "collection"
    }
  }),

  methods: {
    goHome() {
      wx.switchTab({
        url: "/pages/index/main"
      });
    },

    favorite() {
      let title = "已成功关注店铺";
      let options = {
        color: "#f43",
        type: "collection_fill"
      };
      if (this.favOptions.type === "collection_fill") {
        title = "已成功取消关注";
        options = {
          color: "#777",
          type: "collection"
        };
      }
      wx.showToast({
        icon: "none",
        title
      });
      this.favOptions = Object.assign(this.favOptions, options);
    },

    fixHeight() {
      wx
        .createSelectorQuery()
        .select("#" + this.selectedTab)
        .boundingClientRect(rect => {
          this.swiperHeight = rect.height + "px";
        })
        .exec();
    },

    async onGetUserInfo(e) {
      const { userInfo } = e.mp.detail.data;
      if (userInfo) {
        await this.showShareModal(userInfo);
      }
    },

    async getEvaluateList() {},

    canotTips() {
      let title = "活动尚未开始";
      if (this.promotion.status === -100) {
        title = "活动已经结束";
      }
      wx.showToast({
        icon: "none",
        title
      });
    },

    openAction() {
      if (this.shareDisabled) {
        this.canotTips();
      }
      this.showAction = !this.shareDisabled;
    },
    hideAction() {
      this.showAction = false;
    },

    async showShareModal(avatar = null) {
      if (this.sharePicCreated) {
        wx.showLoading({
          mask: true,
          title: "正在生成海报"
        });
        await sleep(200);
        wx.hideLoading();
        this.shareModal = true;
        return;
      }
      if (!avatar) {
        let res = await wxapi("getSetting");

        if (res.authSetting["scope.userInfo"]) {
          wx.showLoading({
            mask: true,
            title: "正在生成海报"
          });
          let res = await wxapi("getUserInfo");
          await this.drawSharePicture(res.userInfo);
          wx.hideLoading();
        } else {
          this.userAuthModal.show = true;
        }
      } else {
        wx.showLoading({
          mask: true,
          title: "正在生成海报"
        });

        await this.drawSharePicture(avatar);
        wx.hideLoading();
      }
    },

    hideShareModal() {
      this.shareModal = false;
    },

    async saveSharePicture() {
      wxapi("authorize", {
        scope: "scope.writePhotosAlbum"
      })
        .then(async res => {
          await this.doSavePicture();
        })
        .catch(res => {
          this.hideShareModal();
          this.albumAuthModal.show = true;
        });
    },

    async doSavePicture() {
      wx.showLoading({
        title: "正在保存",
        mask: true
      });

      await wxapi("canvasToTempFilePath", {
        canvasId: "shareCanvas"
      })
        .then(res => {
          wxapi("saveImageToPhotosAlbum", {
            filePath: res.tempFilePath
          })
            .then(res => {
              wx.hideLoading();
              wx.showToast({
                icon: "none",
                title: "海报已保存成功，快晒到朋友圈吧~"
              });
              this.hideShareModal();
            })
            .catch(res => {
              wx.hideLoading();
              wx.showToast({
                icon: "none",
                title: "海报保存失败，请重试"
              });
            });
        })
        .then(res => {});
    },

    async onActionClick(e) {
      this.hideAction();

      const { index } = e.mp.detail;

      if (index === 0) {
        await this.showShareModal();
      }
    },

    btnTouchStart(event) {
      this.isTouched[event.currentTarget.dataset.name] = true;
    },
    btnTouchEnd(e) {
      this.isTouched[e.currentTarget.dataset.name] = false;
    },

    telCall() {
      wx.makePhoneCall({
        phoneNumber: this.promotion.store.data.phone
      });
    },
    showMap() {
      wx.openLocation({
        latitude: this.promotion.store_lat,
        longitude: this.promotion.store_lng,
        scale: 17,
        name: this.promotion.store.data.name
      });
    },

    handleTabChange(e) {
      this.selectedTab = e.mp.detail;
    },

    handleSwiperChange(e) {
      this.selectedTab = e.mp.detail.currentItemId;
      this.fixHeight();
    },

    onUserAuthModalClick(e) {
      this.userAuthModal.show = false;
    },

    onAlbumAuthModalClick(e) {
      this.albumAuthModal.show = false;
      const { index } = e.mp.detail;
      this.shareModal = index !== 0;
    },

    onBuyModalClick(e) {
      this.buyModal.show = false;
      const { index } = e.mp.detail;
      if (index === 1) {
        switch (this.buyModal.code) {
          case 8001: //立即使用
            wx.switchTab({
              url: "/pages/coupon/mine?type=waitUse"
            });
            break;

          case 8002: //立即支付
            wx.navigateTo({
              url: `/pages/coupon/order?id=${this.buyModal.id}`
            });
            break;
        }
      }
    },

    async drawSharePicture(userInfo) {
      const { width, height, rpx } = this.screen;
      let imgHeight = Math.round(width * 0.5);
      let banner = await wxapi("getImageInfo", {
        src: `${imgHost}fill/${width}x${imgHeight}/${this.promotion.images[0]}`
      });

      let avatar = await wxapi("getImageInfo", {
        src: userInfo.avatarUrl
      });

      // TODO 上线后方可生成C码
      // let qrcode = await this.$http.get('consumer/wechat/qrcode', {
      //     scence: `uid:${this.user.id};pmid:${this.promotion.id}`,
      // });
      let qrcode = await wxapi("getImageInfo", {
        src: "https://www.huizaiquan.com/qrcode_mp.jpg"
      });

      const ctx = wx.createCanvasContext("shareCanvas");

      ctx.save();
      ctx.setFillStyle("#fff");
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      ctx.drawImage(banner.path, 0, 0, width, imgHeight);

      ctx.save();
      ctx.beginPath();
      const left = Math.round(width / 2);
      let avatarSize = Math.round(30 * rpx);
      ctx.arc(left, imgHeight, avatarSize, 0, 2 * Math.PI);
      ctx.clip();
      ctx.closePath();
      ctx.drawImage(
        avatar.path,
        left - avatarSize,
        imgHeight - avatarSize,
        avatarSize * 2,
        avatarSize * 2
      );
      ctx.restore();

      let titleFontSize = 14 * rpx;
      ctx.setFontSize(titleFontSize);
      ctx.setFillStyle("#777");
      ctx.setTextAlign("center");

      const titleArr = this.promotion.title.split("");
      let currentText = "";
      let currentWidth;
      let currentLine = 1;
      for (let letter of titleArr) {
        currentText += letter;
        currentWidth = ctx.measureText(currentText).width;
        if (currentWidth >= width - 30) {
          ctx.fillText(
            currentText,
            width / 2,
            imgHeight + 35 * rpx + (titleFontSize + 5 * rpx) * currentLine
          );
          currentText = "";
          currentLine++;
        }
      }

      if (currentText) {
        ctx.fillText(
          currentText,
          width / 2,
          imgHeight + 35 * rpx + (titleFontSize + 5 * rpx) * currentLine
        );
      }

      ctx.save();
      ctx.setLineDash([6, 10], 0);
      ctx.beginPath();
      let lineTop =
        imgHeight + 55 * rpx + (titleFontSize + 5 * rpx) * currentLine;
      ctx.moveTo(0, lineTop);
      ctx.lineTo(width, lineTop);
      ctx.setStrokeStyle("#ddd");
      ctx.setLineWidth(1);
      ctx.stroke();
      ctx.restore();

      let normalFontSize = 12 * rpx;
      let miniFontSize = 10 * rpx;

      ctx.setFontSize(miniFontSize);

      let storeTxt = `本劵适用于 ${this.promotion.store.data.name}`;
      let storeTxtWidth = ctx.measureText(storeTxt).width + 10 * rpx;

      ctx.rect(
        width / 2 - storeTxtWidth / 2,
        lineTop - miniFontSize / 2 - 3 * rpx,
        storeTxtWidth,
        miniFontSize + 5 * rpx
      );
      ctx.setFillStyle("#f43");
      ctx.fill();

      ctx.setFillStyle("#fff");
      ctx.fillText(storeTxt, width / 2, lineTop + miniFontSize / 2 - 2 * rpx);

      ctx.setFontSize(normalFontSize);
      ctx.setFillStyle("#777");
      let txt = `您的好友 ${userInfo.nickName} 邀您一起抢优惠劵啦`;
      ctx.fillText(txt, width / 2, lineTop + 25 * rpx);

      let couponFontSize = 24 * rpx;
      ctx.setFontSize(couponFontSize);
      ctx.setFillStyle("#f43");
      let coupon =
        this.promotion.type === 1
          ? this.promotion.value
          : this.promotion.value * 100;
      let couponTxtWidth = ctx.measureText(coupon.toString()).width + 5 * rpx;

      ctx.setFontSize(miniFontSize);
      let coupon_suffix =
        this.promotion.type === 1 ? "元 (抵扣劵)" : "折 (折扣劵)";
      let couponSuffixWidth = ctx.measureText(coupon_suffix).width + 5 * rpx;

      ctx.setFontSize(couponFontSize);
      ctx.fillText(
        coupon,
        width / 2 - couponSuffixWidth / 2,
        lineTop + 48 * rpx
      );
      ctx.setFontSize(miniFontSize);
      ctx.fillText(
        coupon_suffix,
        width / 2 + couponTxtWidth / 2,
        lineTop + 48 * rpx
      );

      let qrcodeSize = 125 * rpx;
      let qrcodeTop = lineTop + 50 * rpx;
      ctx.drawImage(
        qrcode.path,
        width / 2 - qrcodeSize / 2,
        qrcodeTop,
        qrcodeSize,
        qrcodeSize
      );

      let textTop = qrcodeTop + qrcodeSize + 15 * rpx;
      ctx.setFillStyle("#999");
      ctx.fillText(
        "长按识别图中小程序码进入小程序即可领取",
        width / 2,
        textTop
      );

      ctx.draw();

      this.screen.height = textTop + 10 * rpx;
      this.shareModal = true;
      this.sharePicCreated = true;
    },

    async buy() {
      if (this.shareDisabled) {
        this.canotTips();
        return false;
      }

      let payload = {
        id: this.query.id
      };
      if (this.query.cid) {
        payload.params = {
          channel_id: this.query.cid
        };
      }

      payload.onSuccess = data => {
        wx.navigateTo({
          url: `/pages/coupon/order?id=${data.id}`
        });
      };

      payload.onFail = res => {
        if (res.status === 422) {
          const { data } = res;
          switch (data.code) {
            case 8000:
              wx.showToast({
                icon: "none",
                title: data.message
              });
              break;

            case 8001:
              this.buyModal = {
                ...data.errors,
                code: data.code,
                show: true,
                actions: [
                  { name: "我再逛逛", color: "#777" },
                  { name: "现在使用", color: "#f43" }
                ]
              };
              break;

            case 8002:
              this.buyModal = {
                ...data.errors,
                code: data.code,
                show: true,
                actions: [
                  { name: "我再逛逛", color: "#777" },
                  { name: "立即支付", color: "#f43" }
                ]
              };
              break;
          }
        }
      };

      await this.$store.dispatch("order/buy", payload);
    },

    resetPage() {
      this.$store.commit("home/resetPromotion", {}, { root: true });
      this.shareModal = false;
      this.showAction = false;
      this.selectedTab = "intro";
      this.sharePicCreated = false;
      this.shareDisabled = true;
    }
  },

  async onLoad() {
    this.resetPage();

    this.selectedTab = "intro";
    await this.checkLogin();
    this.query = this.$mp.query;

    if (!this.query.id) {
      wx.switchTab({
        url: "/pages/index/main"
      });

      return;
    }

    let params = { include: "store" };
    if (this.query.cid) {
      //渠道递增
      params.channel_id = this.query.cid;
    }

    if (this.coordi) {
      //计算距离
      params.location = `${this.coordi.latitude},${this.coordi.longitude}`;
    }

    wx.showLoading({
      title: "加载中...",
      mask: true
    });
    await this.$store.dispatch("home/getPromotion", {
      id: this.query.id,
      params
    });

    if (this.promotion.status === 1) {
      wx.showShareMenu({
        withShareTicket: false
      });

      let sysInfo = await wxapi("getSystemInfo");

      this.screen = Object.assign(this.screen, {
        rpx: sysInfo.screenWidth / 375,
        width: Math.round(sysInfo.screenWidth * 0.75),
        height: Math.round(sysInfo.screenHeight * 0.8)
      });

      await this.$store.dispatch("home/getChannel", {
        promotion_id: this.promotion.id,
        store_id: this.promotion.store_id,
        user_id: this.user.id,
        create: 1
      });

      this.shareDisabled = false;
    } else {
      this.shareDisabled = true;
      wx.hideShareMenu();
    }

    sleep(500);
    this.fixHeight();
  },

  mounted() {},

  onShareAppMessage(e) {
    let title =
      this.promotion.type === 1
        ? `快来一起抢 ${this.promotion.value} 元「${
            this.promotion.store.data.name
          }」优惠劵吧~`
        : `快来一起抢 ${this.promotion.value * 100} 折「${
            this.promotion.store.data.name
          }」优惠劵吧~`;

    let path = `/pages/coupon/index?id=${this.promotion.id}`;
    if (this.channel.id) {
      path += `&cid=${this.channel.id}`;
    }

    return {
      title,
      path,
      imageUrl: `${imgHost}fill/500x400/${this.promotion.images[0]}`
    };
  },

  onUnload() {
    this.resetPage();
  }
};
</script>

<style>
.coupon-share {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  z-index: 10;
}

.coupon-share > div {
  background: #fff;
  padding: 20rpx;
  border-radius: 10rpx;
  margin: 40rpx auto;
  box-shadow: 0 10px 20px rgba(29, 49, 85, 0.28);
}

.coupon-share-save {
  margin-top: 20rpx;
}
.coupon-share-save > button {
  background: #f43;
  height: 70rpx;
  line-height: 70rpx;
  color: #fff;
  font-size: 28rpx;
}
.coupon-share-save > p {
  color: #999;
  font-size: 20rpx;
  text-align: center;
}
.coupon-share-close {
  width: 100%;
  padding: 0;
  margin: 0;
  text-align: center;
  position: absolute;
  bottom: 30rpx;
  left: 0;
}

.coupon-list {
  position: relative;
  top: -40rpx;
  margin: 0 auto;
  width: 90%;
  border-radius: 10rpx;
  box-shadow: 0 10px 20px rgba(29, 49, 85, 0.28);
  background: #fff;
}
.coupon-title {
  line-height: 70rpx;
  display: flex;
  padding: 0 15rpx;
  border-bottom: 1px solid #f3f3f3;
}
.coupon-title > h3 {
  flex: 6;
  font-size: 32rpx;
  color: #333;
  line-height: 70rpx;
}
.coupon-title > div {
  flex: 1;
  text-align: center;
  border-left: 1px solid #f7f7f7;
  margin: 10rpx 0;
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
  color: #ff4343;
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
  height: 90rpx;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  display: flex;
  line-height: 80rpx;
  box-shadow: 0px -4px 15px rgba(100, 100, 100, 0.3);
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
  flex: 0.8;
  background: #f3f3f3;
  display: flex;
  color: #777;
  line-height: 30rpx;
  padding: 8rpx 10rpx 0 10rpx;
}
.coupon-footer > div:first-child > span {
  flex: 1;
  text-align: center;
}
.coupon-footer > div:first-child > span > i {
  font-size: 20rpx;
  line-height: 25rpx;
}
.coupon-footer > div:nth-child(2) {
  background: #ff8755;
}
.coupon-footer > div:last-child {
  background: #ff4343;
}
.btn-hover {
  opacity: 0.8;
}
.btn-share-disabled {
  background: #ccc !important;
}
.btn-buy-disabled {
  background: #bbb !important;
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
.modal-content {
  padding: 0 20rpx;
  color: #777;
  text-indent: 56rpx;
  text-align: left;
}
</style>

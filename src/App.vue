<script>
import { mapState } from 'vuex';
import wxapi from '@/utils/wxapi';

export default {
    data: () => ({
        screenBrightness: .3,
    }),

    computed: {
        ...mapState('user', ['token', 'coordi']),
    },

    created () {
       
    },

    onShow() {
        console.log('app show')
        wx.getScreenBrightness({
            success: (res) => {
                this.screenBrightness = res.value;
            }
        })
    },

    onHide() {
        console.log('app hide')
        wx.setScreenBrightness({
            value: this.screenBrightness,
            success: (res) => {
                console.log(res);
            }
        });
    },

    onLaunch() {
        //  console.log(this.$mp.appOptions); //此处可以统一处理分享
    },

}
</script>

<style>
*, button {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
             SimSun, sans-serif;
}
button::after {
    border: none;
}
page::scrollbar {
    width: 0px;
    height: 0px;
    font-size: 0rpx;
    color: transparent;
    background: transparent;
    line-height: 0px;
}
page::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    font-size: 0rpx;
    color: transparent;
    background: transparent;
    line-height: 0px;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
.container {
    font-size: 28rpx;
}

.slide-image {
    width: 100%;
}
image {
    background: #f1f1f1;
}
.padding15 {
    padding: 15rpx;
}
.ellipsis{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    word-wrap:normal;
}

switch {
    transform: scale(.7);
    margin-left: -15rpx;
}
radio {
    transform:scale(0.8);
}
</style>

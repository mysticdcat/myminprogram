import Vue from 'vue'
import App from './evaluation.vue'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        usingComponents: {
            "i-icon": "/ui/iview/icon/index",
            "i-modal": "/ui/iview/modal/index",
            "zan-loadmore": "/ui/zanui/loadmore/index"
        },
        enablePullDownRefresh: true,
        backgroundTextStyle: "dark",
        navigationBarBackgroundColor: "#F9F9F9",
        navigationBarTextStyle: "black",
        backgroundColor: "#F9F9F9",
        navigationBarTitleText: '我的评价',
    }
}

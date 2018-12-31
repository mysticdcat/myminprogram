import Vue from 'vue'
import App from './mine.vue'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        enablePullDownRefresh: true,
        navigationBarTitleText: '我的卡包',
        usingComponents: {
            "zan-loadmore": "/ui/zanui/loadmore/index",
            "zan-tab": "/ui/zanui/tab/index",
            "i-icon": "/ui/iview/icon/index",
        },
    }
}

import Vue from 'vue'
import App from './list.vue'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        usingComponents: {
            "i-icon": "/ui/iview/icon/index",
            "zan-loadmore": "/ui/zanui/loadmore/index",
        },
        enablePullDownRefresh: true,
        onReachBottomDistance: 50,
        navigationBarTitleText: '活动管理',
    }
}

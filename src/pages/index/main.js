import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        enablePullDownRefresh: true,
        usingComponents: {
            "zan-loadmore": "/ui/zanui/loadmore/index",
            "zan-tab": "/ui/zanui/tab/index",
            "zan-capsule": "/ui/zanui/capsule/index",
            "i-icon": "/ui/iview/icon/index",
        },
    }
}

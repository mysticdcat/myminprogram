import Vue from 'vue'
import App from './index.vue'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        usingComponents: {
            "zan-search": "/ui/zanui/search/index",
            "zan-loadmore": "/ui/zanui/loadmore/index",
            "zan-capsule": "/ui/zanui/capsule/index",
            "i-icon": "/ui/iview/icon/index",
            "i-modal": "/ui/iview/modal/index",
            "i-message": "/ui/iview/message/index"
        },
    }
}

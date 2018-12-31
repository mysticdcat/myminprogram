import Vue from 'vue'
import App from './create.vue'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        usingComponents: {
            "i-icon": "/ui/iview/icon/index",
            "i-message": "/ui/iview/message/index",
        },
        navigationBarTitleText: '优惠活动',
    }
}

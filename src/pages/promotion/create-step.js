import Vue from 'vue'
import App from './create-step.vue'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        usingComponents: {
            "i-icon": "/ui/iview/icon/index",
            "i-message": "/ui/iview/message/index",
            "i-modal": "/ui/iview/modal/index",
            "i-action-sheet": "/ui/iview/action-sheet/index",
        },
        navigationBarTitleText: '优惠活动',
    }
}

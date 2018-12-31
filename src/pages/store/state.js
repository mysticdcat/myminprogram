import Vue from 'vue'
import App from './state.vue'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '店铺状态',

        usingComponents: {
            "i-icon": "/ui/iview/icon/index",
            "i-modal": "/ui/iview/modal/index",
        }
    }
}

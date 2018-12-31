import Vue from 'vue'
import App from './code.vue'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        usingComponents: {
            "ali-icon": "/ui/iview/ali-icon/index",
        },
    }
}

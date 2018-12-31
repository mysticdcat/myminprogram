import Vue from 'vue'
import App from './index.vue'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        usingComponents: {
            "i-icon": "/ui/iview/icon/index",
            "i-modal": "/ui/iview/modal/index",
        },

        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#F9F9F9',
        navigationBarTextStyle: 'black',
        backgroundColor: "#F9F9F9",
    }
}

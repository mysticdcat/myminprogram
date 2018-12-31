import Vue from 'vue'
import App from './news.vue'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        usingComponents: {
            "i-icon": "/ui/iview/icon/index",
        },

        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#F9F9F9',
        navigationBarTextStyle: 'black',
        backgroundColor: "#F9F9F9",
    }
}
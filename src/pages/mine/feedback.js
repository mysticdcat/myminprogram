import Vue from 'vue'
import App from './feedback.vue'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        enablePullDownRefresh: true,
        usingComponents: {
            "i-icon": "/ui/iview/icon/index",
            "i-steps": "/ui/iview/steps/index",
            "i-step": "/ui/iview/step/index",
            "zan-loadmore": "/ui/zanui/loadmore/index",
        },

        backgroundTextStyle: 'dark',
        navigationBarBackgroundColor: '#F9F9F9',
        navigationBarTextStyle: 'black',
        backgroundColor: "#F9F9F9",
        navigationBarTitleText: '意见反馈',
    }
}

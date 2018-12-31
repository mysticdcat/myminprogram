import Vue from 'vue'
import App from './feedbackform.vue'

const app = new Vue(App)
app.$mount()
export default {


    config: {
        usingComponents: {
            "i-message": "/ui/iview/message/index",
        },

        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#F9F9F9',
        navigationBarTextStyle: 'black',
        backgroundColor: "#F9F9F9",
        navigationBarTitleText: '我要反馈',
    }
}

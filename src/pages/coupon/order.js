import Vue from 'vue'
import App from './order.vue'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        usingComponents: {
            "ali-icon": "/ui/iview/ali-icon/index",
            "i-icon": "/ui/iview/icon/index",
            "i-modal": "/ui/iview/modal/index",
        },
        navigationBarTitleText: '订单支付',
        backgroundTextStyle: 'dark',
        navigationBarBackgroundColor: '#f43',
        navigationBarTextStyle: 'white',
        backgroundColor: "#ff4433",
    }
}

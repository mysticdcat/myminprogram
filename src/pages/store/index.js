import Vue from 'vue'
import App from './index.vue'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        usingComponents: {
            "i-icon": "/ui/iview/icon/index",
            "ff-canvas": "/ui/wxf2/canvas/f2-canvas",
        },
        backgroundTextStyle: 'dark',
        navigationBarBackgroundColor: '#f43',
        navigationBarTextStyle: 'white',
        backgroundColor: "#ff4433",
    }
}

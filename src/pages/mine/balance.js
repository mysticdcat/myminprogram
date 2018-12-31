import Vue from 'vue'
import App from './balance.vue'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        usingComponents: {
            "zan-tab": "/ui/zanui/tab/index",
            "zan-panel": "/ui/zanui/panel/index",
            "zan-icon": "/ui/zanui/icon/index",
            "zan-loadmore": "/ui/zanui/loadmore/index",
            "i-icon": "/ui/iview/icon/index",
            "i-action-sheet": "/ui/iview/action-sheet/index",
            "i-rate": "/ui/iview/rate/index",
        },
        navigationBarTitleText: '账户余额',
        backgroundTextStyle: 'dark',
        navigationBarBackgroundColor: '#f43',
        navigationBarTextStyle: 'white',
        backgroundColor: "#ff4433",
    }
}

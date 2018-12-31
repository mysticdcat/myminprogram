import Vue from "vue";
import App from "./writeoff.vue";

const app = new Vue(App);
app.$mount();

export default {
    config: {
        usingComponents: {
            "zan-panel": "/ui/zanui/panel/index",
            "zan-icon": "/ui/zanui/icon/index",
            "i-icon": "/ui/iview/icon/index",
            "i-modal": "/ui/iview/modal/index",
        },
        navigationBarTitleText: "核销详情"
    }
};

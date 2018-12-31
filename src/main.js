import Vue from 'vue'
import App from './App'
import fly from '@/utils/api';
import store from '@/store/index';

Vue.config.productionTip = false
Vue.prototype.$http = fly;
Vue.prototype.$store = store;
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

String.prototype.trim = function () {
    var str = this,
        str = str.replace(/^\s\s*/, ''),
        ws = /\s/,
        i = str.length;
    while (ws.test(str.charAt(--i)));
    return str.slice(0, i + 1);
}

export default {
    // 这个字段走 app.json
    config: {
        // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
        pages: [
            '^pages/index/main',    //首页
            'pages/search/index',   //搜索

            'pages/coupon/mine',
            'pages/coupon/detail',
            'pages/coupon/order',
            'pages/coupon/writeoff',
            'pages/comment/form',

            'pages/login/index',    //绑定手机号
            'pages/login/code',     //绑定手机号-验证码

            'pages/mine/index',     //我的
            'pages/mine/news',
            'pages/mine/feedback',  //意见反馈
            'pages/mine/feedbackform',
            'pages/mine/balance', //余额
            'pages/mine/bill', //账单明细
            'pages/mine/billdetail', //账单明细

            'pages/mine/message',   //我的消息
            'pages/mine/evaluation',   //我的评价
            'pages/mine/collection',   //我的收藏

            'pages/store/index',    //店铺首页
            'pages/store/create',   //创建店铺
            'pages/store/state',    //店铺状态显示

            'pages/promotion/create',
            'pages/promotion/create-step',
            'pages/promotion/list',
        ],
        window: {
            backgroundTextStyle: 'dark',
            navigationBarBackgroundColor: '#FFF',
            navigationBarTitleText: '惠再劵',
            navigationBarTextStyle: 'black',
            backgroundColor: "#FFF",
        },
        tabBar: {
            color: '#777',
            backgroundColor: '#f9f9f9',
            borderStyle: "dark",
            selectedColor: '#f44',
            list: [{
                pagePath: "pages/index/main",
                iconPath: './static/images/homepage.png',
                selectedIconPath: './static/images/homepage_fill.png',
                text: '商家',
            }, {
                pagePath: "pages/coupon/mine",
                iconPath: './static/images/coupons.png',
                selectedIconPath: './static/images/coupons_fill.png',
                text: '卡包',
            }, {
                pagePath: "pages/mine/index",
                iconPath: './static/images/addressbook.png',
                selectedIconPath: './static/images/addressbook_fill.png',
                text: '我的',
            }]
        }
    }
}

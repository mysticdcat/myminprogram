import api from "@/utils/api";
import wxapi from "@/utils/wxapi";
import { goHost } from "@/config";

export default {
    state: {
        token: '',
        user: {},
        coordi: null,
        wxuser: {},
        city: { //默认杭州
            id: 330100,
            name: '杭州',
            full_name: '杭州市',
        },
        feedbackPaginate: { current_page: 0 },
        feedbackLoader: {
            type: 'text',
            text: ' 上拉加载更多 ',
        },
        feedbackList: [],
        wallet: {
            // total_account:0,  //累计收益
            balance: 0,  //未入账
            soure: 0,  //已失效
        },
        coupon: {   //优惠券
            unuse: 0,  //未使用
            used: 0,   //已使用
            invalid: 0,  //已失效
        },
        balance: {
            balance: 0,
            withdraw_aleady: 0,
            withdraw_now: 0,
        }
    },
    actions: {
        async login(ctx, payload) {
            await api.post('user/login', payload).then(res => {
                const { data } = res;

                ctx.commit('saveUser', data.user);
                ctx.commit('saveToken', data.token);
                ctx.commit('store/saveStore', data.store, { root: true });
            });
        },

        async city(ctx, payload) {
            await api.get(`${goHost}geo/city`, {
                location: `${payload.longitude},${payload.latitude}`
            }).then(res => {
                ctx.commit('saveCity', res);
            })
        },

        async getUser(ctx) {
            await api.get('user/info').then(res => {
                ctx.commit('saveUser', res.data.user);
                ctx.commit('store/saveStore', res.data.store, { root: true });
            });
        },

        async getUserInfo(ctx) {
            await api.post('consumer/userInfo').then(res => {
                console.log(res)
                ctx.commit('saveUserInfo', res);
            });
        },

        async getBalanceMore(ctx) {
            console.log("getBalanceMore")
            await api.get('consumer/account').then(res => {
                ctx.commit('saveBalance', res);
            });
        },


        async updateUser(ctx, payload) {
            await api.post('user/info', {
                ...payload
            }).then(res => {
                ctx.commit('saveUser', res.data);
            })
        },

        async getFeedList(context, payload = { replace: false, params: {} }) {

            context.commit('saveLoader', { type: 'loading' });
            await api.get(`consumer/feedbacklist`, { ...payload.params }).then(res => {
                const { pagination } = res.meta || {};
                delete pagination.links;

                if (pagination.current_page === pagination.total_pages) {
                    context.commit('saveLoader', { type: 'text', text: ' 这已经是我的底线啦 ' });
                } else {
                    context.commit('saveLoader', { type: 'text', text: ' 上拉加载更多 ' });
                }
                context.commit('saveFeedList', { replace: payload.replace, list: res.data, pagination });
            });

        },

        async postFeedback(context, payload) {
            wx.showLoading({
                mask: true,
                title: "提交中..."
            });
            await api.post('consumer/feedback', payload).then(res => {
                context.dispatch('getFeedList', { replace: true });
                wx.navigateBack();
            })
        },

        async getPosition(ctx) {
            await wxapi('authorize', { //提前要求定位授权
                scope: 'scope.userLocation',
            }).then(async (res) => {
                let location = await wxapi('getLocation');
                ctx.commit('saveCoordi', location);
            }).catch(res => {
                ctx.commit('saveCoordi', null);
            })

            // let setting = await wxapi('getSetting');

            // if (! setting.authSetting['scope.userLocation']) {
            //     ctx.commit('saveCoordi', null);
            // } else {
            //     let location = await wxapi('getLocation');
            //     ctx.commit('saveCoordi', location);
            // }
        },
    },
    mutations: {
        saveUser(state, payload) {
            state.user = { ...state.user, ...payload }
        },

        saveUserInfo(state, payload) {
            // state.wallet.invalid = payload.invalid
            state.wallet.soure = payload.soure
            state.wallet.balance = payload.balance

            state.coupon.unused = payload.unused,
                state.coupon.used = payload.used,
                state.coupon.invalid = payload.invalid
        },

        saveToken(state, payload) {
            state.token = payload;
        },

        saveCity(state, payload) {
            state.city = {
                ...state.city,
                ...payload,
            }
        },

        saveCoordi(state, payload) {
            state.coordi = payload;
        },

        saveFeedList(state, payload) {
            state.feedbackPaginate = {
                ...state.paginate,
                ...payload.pagination,
            }
            if (payload.replace) { //替换
                state.feedbackList = payload.list;
            } else { //追加
                state.feedbackList.push(...payload.list);
            }
        },

        saveLoader(state, payload) {
            state.feedbackLoader = { ...state.loader, ...payload };
        },

        saveBalance(state, payload) {
            state.balance.balance = payload.data.balance
            state.balance.withdraw_aleady = payload.data.withdraw_aleady
            state.balance.withdraw_now = payload.data.withdraw_now
        }
    },
}

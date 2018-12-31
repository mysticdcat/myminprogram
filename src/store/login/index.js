import api from "@/utils/api";
import { sleep } from "@/utils";
import { $Message } from "@/ui/iview/base/index";

var timer = null;

const login = {
    state: {
        mobile: '',
        limitSec: 0,
    },
    actions: {
        getSmsCode(ctx, payload) {
            const { commit, dispatch } = ctx;

            wx.showLoading({
                mask: true,
            });

            api.post('/user/code', {
                mobile: payload.mobile,
            }).then(res => {
                commit('saveMobile', payload);
                commit('saveSecond', { second: 60 });

                clearTimeout(timer);
                dispatch('limitSeconds', {});

                wx.redirectTo({
                    url: '/pages/login/code',
                });
            }).catch(err => {
                $Message({
                    content: err.data.message,
                    type: 'error',
                });
            });
        },

        limitSeconds(ctx, payload) {
            if (ctx.state.limitSec > 0) {
                ctx.commit('saveSecond', { second: ctx.state.limitSec - 1 });
            } else {
                return;
            }

            timer = setTimeout(() => {
                ctx.dispatch('limitSeconds', {});
            }, 1000);
        },

        bindMobile(context, payload) {
            wx.showLoading({
                mask: true,
                title: '正在提交...',
            });

            payload.mobile = context.state.mobile;
            return api.post('user/mobile', { ...payload }).then(res => {
                context.commit('user/saveUser', res.data, { root: true });
                wx.navigateBack();
            }).catch(async err => {
                wx.showToast({
                    title: err.data.message,
                    icon: 'none',
                    mask: true,
                });
                // this.buyModal = {
                //     ...data.errors,
                //     code: data.code,
                //     show: true,
                //     actions: [
                //         { name: '我再逛逛', color: '#777' },
                //         { name: '现在使用', color: '#f43' },
                //     ],
                // }

                if (err.data.code === 8002) {
                    await sleep(3);
                    wx.redirectTo({
                        url: '/pages/login/index',
                    });
                }
            })
        },
    },
    mutations: {
        saveReferrer(state, payload) {
            state.referrer = { ...state.referrer, ...payload }
        },

        saveMobile(state, payload) {
            state.mobile = payload.mobile;
        },

        saveSecond(state, payload) {
            state.limitSec = payload.second;
        },
    },
}

export default login;

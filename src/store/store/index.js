import api from "@/utils/api";
import { $Message } from "@/ui/iview/base/index";
import { defaultStore } from './default';

export default {
    state: {
        industries: [],
        store: defaultStore,
    },
    actions: {
        async getIndustries(ctx) {
            await api.get('business/industries?size=100').then(res => {
                ctx.commit('saveIndustries', res.data);
            });
        },

        async apply(ctx) {
            wx.showLoading({
                title: '正在提交',
                mask: true,
            });
            await api.post('business/apply', ctx.state.store).then(res => {
                ctx.commit('saveStore', res.data);
                wx.redirectTo({
                    url: '/pages/store/state',
                });
            }).catch(err => {
                $Message({
                    content: err.data.message,
                    type: 'error',
                });
            });
        },

        async getStore(ctx) {
            await api.get('business/store').then(res => {
                ctx.commit('saveStore', res.data);
            }).catch(err => {
                ctx.commit('saveStore', null);
            });
        }
    },
    mutations: {
        saveIndustries(state, payload) {
            state.industries = payload;
        },

        saveStore(state, payload) {
            if (!payload) {
                state.store = defaultStore;
            } else {
                state.store = { ...state.store, ...payload };
            }
        },
    },
}

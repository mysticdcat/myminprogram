import api from "@/utils/api";
import { defaultPromotion } from "./default";
import { $Message } from "@/ui/iview/base/index";

export  default {
    state: {
        promotion: defaultPromotion,
        paginate: { current_page: 0 },
        loader: {
            type: 'text',
            text: ' 上拉加载更多 ',
        },
        list: [],
    },
    actions: {
        async getPromotion(context, payload = {}) {
            if (payload.id) {
                await api.get(`business/promotion/${payload.id}`, {}).then(res => {
                    context.commit('savePromotion', res.data);
                });
            } else {
                const { store } = context.rootState.store;

                context.commit('savePromotion', {
                    ...defaultPromotion,
                    id: 0,
                    store_id: store.id,
                    store_lat: store.latitude,
                    store_lng: store.longitude,
                    images: [
                        store.banner,
                        store.inner,
                    ],
                });

            }
        },

        async getList(context, payload = { replace: false, params: {} }) {
            // wx.showLoading({
            //     mask: true,
            //     title: '玩命加载...',
            // });
            context.commit('saveLoader', { type: 'loading' });
            await api.get('business/promotion', { ...payload.params }).then(res => {
                const { pagination } = res.meta || {};
                delete pagination.links;
                if (pagination.current_page === pagination.total_pages) {
                    context.commit('saveLoader', { type: 'text', text: ' 这已经是我的底线啦 ' });
                } else {
                    context.commit('saveLoader', { type: 'text', text: ' 上拉加载更多 ' });
                }
                context.commit('saveList', { replace: payload.replace, list: res.data, pagination });
            });

        },

        async updatePromotion(context, payload) {
            wx.showLoading({
                mask: true,
                title: '正在提交...',
            });
            await api.post('business/promotion', { ...payload }).then(res => {
                // context.commit('savePromotion', res.data);

                const { store } = context.rootState.store;
                context.commit('savePromotion', {
                    ...defaultPromotion,
                    id: 0,
                    store_id: store.id,
                    store_lat: store.latitude,
                    store_lng: store.longitude,
                    images: [
                        store.banner,
                        store.inner,
                    ],
                });

                wx.hideLoading();
                wx.redirectTo({
                    url: '/pages/promotion/list',
                });
            }).catch(err => {
                wx.hideLoading();
                $Message({
                    content: err.data.message,
                    type: 'error',
                });
            });
        }
    },
    mutations: {
        savePromotion(state, payload) {
            state.promotion = {
                ...state.promotion,
                ...payload,
            };
        },

        saveList(state, payload) {
            state.paginate = {
                ...state.paginate,
                ...payload.pagination,
            }
            if (payload.replace) { //替换
                state.list = payload.list;
            } else { //追加
                state.list.push(...payload.list);
            }
        },

        saveLoader(state, payload) {
            state.loader = { ...state.loader, ...payload };
        }
    },
};

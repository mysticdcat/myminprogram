import api from "@/utils/api";
import { defaultPromotion } from "./default";
import { sleep } from "@/utils";

export default {
    state: {
        list: {
            // nearby: [],
            // popular: [],
        },
        paginate: {
            nearby: { current_page: 0 },
            popular: { current_page: 0 },
        },
        loader: {
            nearby: {
                type: 'text',
                text: ' 上拉加载更多 ',
            },

            popular: {
                type: 'text',
                text: ' 上拉加载更多 ',
            }
        },

        promotion: Object.assign({}, defaultPromotion),

        channel: { id: 0 },
    },
    actions: {
        async getList(context, payload) {
            context.commit('saveLoader', { type: payload.type, loader: { type: 'loading' } });

            await api.get('consumer/promotion/list', payload.params).then(res => {
                const { pagination } = res.meta;

                if (pagination.current_page === pagination.total_pages) {
                    context.commit('saveLoader', {
                        type: payload.type,
                        loader: { type: 'text', text: ' 这已经是我的底线啦 ' },
                    });
                } else {
                    context.commit('saveLoader', {
                        type: payload.type,
                        loader: { type: 'text', text: ' 上拉加载更多 ' },
                    });
                }

                context.commit('saveList', {
                    type: payload.type,
                    list: res.data,
                    pagination: res.meta.pagination,
                    replace: payload.replace,
                });
            })
        },

        async getPromotion(context, payload) {
            const { params } = payload;

            await api.get(`consumer/promotion/detail/${payload.id}`, params || {}).then(res => {
                context.commit('savePromotion', res.data);
            }).catch(async res => {
                context.commit('savePromotion', defaultPromotion);
                wx.showToast({
                    icon: 'none',
                    mask: true,
                    title: '无效的活动',
                    duration: 2000,
                });
                await sleep(2);
                wx.switchTab({
                    url: '/pages/index/main',
                });
            })
        },

        async getChannel(ctx, payload) {
            await api.post('consumer/share/channel', { ...payload }).then(res => {
                ctx.commit('saveChannel', res.data);
            });
        },

        async pv(_, payload) {
            await api.post(`consumer/share/pv/${payload.id}`).then(res => {
                return res;
            });
        },
    },
    mutations: {
        saveList(state, payload) {
            const { list, pagination, type, replace } = payload;
            delete pagination.links;

            if (type === 'nearby') {
                // let oldList = state.list.nearby;
                state.list = {
                    ...state.list,
                    nearby: replace ? list : state.list.nearby.concat(list),
                }

                state.paginate = {
                    ...state.paginate,
                    nearby: {
                        ...state.paginate.nearby,
                        ...pagination,
                    }
                }
            } else {
                state.list = {
                    ...state.list,
                    popular: replace ? list : state.list.popular.concat(list),
                }
                state.paginate = {
                    ...state.paginate,
                    popular: {
                        ...state.paginate.popular,
                        ...pagination,
                    }
                }
            }

        },

        saveLoader(state, payload) {
            const { type, loader } = payload;
            if (type === 'nearby') {
                state.loader = {
                    ...state.loader,
                    nearby: loader
                };
            } else {
                state.loader = {
                    ...state.loader,
                    popular: loader,
                }
            }
        },

        savePromotion(state, payload) {
            state.promotion = {
                ...state.promotion,
                ...payload,
            }
        },

        resetPromotion(state) {
            state.promotion = defaultPromotion;
        },

        saveChannel(state, payload) {
            state.channel = {
                ...state.channel,
                ...payload,
            };
        },
    },
};

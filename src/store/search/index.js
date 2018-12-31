import api from "@/utils/api";

export default {
    state: {
        list: [],
        paginate: { current_page: 0 },
        loader: {
            type: 'text',
            text: ' 上拉加载更多 ',
        },
        list: [],
    },
    actions: {
        async getList(context, payload) {
            context.commit('saveLoader', { type: 'loading' });

            await api.get('consumer/promotion/list', payload.params).then(res => {
                const { pagination } = res.meta;

                if (pagination.current_page === pagination.total_pages) {
                    context.commit('saveLoader', { type: 'text', text: ' 这已经是我的底线啦 ' });
                } else {
                    context.commit('saveLoader', { type: 'text', text: ' 上拉加载更多 ' });
                }

                context.commit('saveList', {
                    list: res.data,
                    pagination: res.meta.pagination,
                    replace: payload.replace,
                });
            })
        }
    },
    mutations: {
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

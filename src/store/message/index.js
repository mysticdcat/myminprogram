import api from '@/utils/api';

export default {
    state: {
        list: [],
        loader: { type: 'text', text: ' 上拉加载更多'},
        paginate: { current_page: 0,total_pages:1 },
    },

    actions: {
        async getList(context, payload) {
            context.commit('saveLoader', {type: 'loading'});
            api.get('consumer/messagelist', payload.params).then(res => {
                context.commit('saveList', {
                    replace: payload.replace,
                    list: res.data,
                });
                
                const { pagination } = res.meta;
                delete pagination.links;
                if (pagination.current_page === pagination.total_pages) {
                    context.commit('saveLoader', {type: 'text', text: ' 这已经是我的底线啦 '});
                } else {
                    context.commit('saveLoader', { type: 'text', text: ' 上拉加载更多 ' });
                }
                context.commit('savePaginate', pagination);
                console.log(context.state.paginate);
            })
        },
        async updateMesageStatus(context, payload) {
            console.log("updateMesageStatus")
            // context.commit('saveLoader', {type: 'loading'});
            api.get('consumer/messageStatus/{id}', payload.params).then(res => {
            })
        }

    },

    mutations: {
        saveList(state, payload) {
            if (payload.replace) { //替换
                state.list = payload.list;
            } else { //追加
                state.list.push(...payload.list);
            }
        },
        savePaginate(state, payload) {
            state.paginate = {
                ...state.paginate,
                ...payload,
            }
        },
        saveLoader(state, payload) {
            state.loader = {...state.loader, ...payload};
        }
    }
}

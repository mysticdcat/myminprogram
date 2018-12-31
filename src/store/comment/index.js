import api from '@/utils/api';

export default {
    state: {
        comment: {},
        buyModal: {
            show: false,
            actions: [
                { name: '确定', color: '#777' },
            ],
            message: '',
        },
    },

    actions: {
        postComment(ctx, payload) {
            console.log(ctx);
            console.log(payload)
            const { commit, dispatch } = ctx;
            wx.showLoading({
                mask: true,
                title: '正在提交...',
            });
            api.post('/consumer/evaluate', payload).then(res => {
                console.log("res")
                console.log(res)
                wx.showToast({
                    title: res.message,
                    icon: 'none',
                    mask: true,
                });
                wx.redirectTo({
                    url: 'pages/coupon/detail?user_coupon_id=3',
                });
            }).catch(err => {
                console.log("err")
                ctx.commit('saveBuyModal', {
                    show: true,
                    message: err.data.message,
                });
            });
        },
    },

    mutations: {
        saveBuyModal(state, payload) {
            console.log(payload)

            state.buyModal.show = payload.show
            state.buyModal.message = payload.message
        },
    }
}

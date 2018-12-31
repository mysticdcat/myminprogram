import api from '@/utils/api';
import { sleep } from '@/utils';

export default {
    state: {
        order: { id: 0, price: 0.00, value: 0.00, offset: 0.00, promotion: {data: {price: 0.00}}, store: {data: {}} },
        // order: {
        //     "id": 27, "user_id": 1, "store_id": 1, "store_lat": "30.224610000", "store_lng": "119.973880000", "promotion_id": 9, "channel_id": 9, "promotion_type": 1, "offset": 20, "value": 5, "start_at": "2018-11-03", "end_at": "2018-12-03", "status": 0, "payment": 1, "price": 1, "sn": "18K03T57380000001155", "out_trade_no": null, "clerk_uid": 0, "paid_at": null, "used_at": null, "commented_at": null, "note": null, "note_rank": 0, "created_at": "2018-11-03 19:57:38", "updated_at": "2018-11-03 19:57:38", "promotion": { "data": { "id": 9, "title": "这是一个名字非常非", "store_id": 1, "city_id": "330100", "dist_id": 330108, "store_lat": 30.22461, "store_lng": 119.97388, "geo_hash": "wtm7fn4r458v", "price": 1, "type": 1, "offset": 20, "value": 5, "days": 30, "start_at": null, "end_at": null, "overed_at": "2019-01-10", "receive_limit": 0, "day_limit": 10, "quantity": 100, "received": 1, "used": 0, "used_commission": 0, "receive_commission": 1, "status": 1, "audit_id": 2, "audit_at": "2018-11-01 19:37:52", "sort": 50, "deleted_at": null, "created_at": "2018-10-17 21:04:11", "updated_at": "2018-11-01 19:37:52", "distance": "\u672a\u77e5\u8ddd\u79bb" } }, "store": { "data": { "id": 1, "name": "\u6a59\u5b50\u7684\u5c0f\u5e97", "banner": "store~banner~ec7dee50-f51c-4d1b-b72c-32e795a4d632.jpg", "longitude": 119.97388, "latitude": 30.22461}}
        // }
        buyModal: {
            show: false,
            actions: [
                { name: '取消', color: '#777' },
                { name: '确定', color: '#777' },
            ],
            message: '',
        },
    },

    actions: {
        async buy(context, payload) {
            wx.showLoading({
                title: '创建订单',
                mask: true,
            });
            api.post(`consumer/promotion/order/${payload.id}`, payload.params || {}).then(res => {
                context.commit('saveOrder', res.data);
                payload.onSuccess(res.data);
            }).catch(res => {
                payload.onFail(res);
            })
        },

        async info(context, payload) {
            // if (context.state.order && context.state.order.id === payload.id) {
            //     return false;
            // }
            wx.showLoading({
                title: '获取订单',
                mask: true,
            });
            api.get(`consumer/coupon/detail/${payload.id}`, payload.params || {}).then(res => {
                context.commit('saveOrder', res.data);
            }).catch(res => {
                wx.showToast({
                    icon: 'none',
                    title: res.data.message,
                });
            });
        },

        async pay(ctx, payload) { 
            await api.post('consumer/pay/callback', payload).then(res => {
                const { data } = res;
                ctx.commit('user/saveUser', {
                    balance: data.balance,
                }, {root: true});

                wx.switchTab({
                    url: '/pages/coupon/mine?type=waitUse',
                });

            }).catch(res => {
                wx.showToast({
                    icon: 'none',
                    title: res.data.message,
                })
            });
        },

        async wxpay(_, payload) {
            await api.post('consumer/wechat/unify', payload).then(res => {
                const { data } = res;
                data.success = res => {
                    wx.switchTab({
                        url: '/pages/coupon/mine?type=waitUse',
                    });
                };

                wx.requestPayment(data);
            }).catch(res => {
                wx.showToast({
                    icon: 'none',
                    title: res.data.message,
                })
            });
        },

        async cancel(_, payload) {
            wx.showLoading({
                mask: true,
                title: '正在取消',
            });
            await api.post('consumer/coupon/cancel', payload).then(async res => {
                wx.showToast({
                    icon: 'none',
                    title: '订单已取消成功',
                });

                await sleep(2000);
                wx.navigateBack();
            }).catch(res => {
                wx.showToast({
                    icon: 'none',
                    title: res.data.message,
                });
            })
        }
    },

    mutations: {
        saveOrder(state, payload) {
            state.order = Object.assign(state.order, payload);
        }
    }
}

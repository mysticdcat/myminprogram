import api from "@/utils/api";
import { goHost } from "@/config";
import dayjs from "dayjs";

export default {
    state: {
        paginate: {
            normal: { current_page: 0 },
            waitPay: { current_page: 0 },
            used: { current_page: 0 },
            expired: { current_page: 0 }
        },
        loader: {
            normal: { type: "text", text: " 上拉加载更多 " },
            waitPay: { type: "text", text: " 上拉加载更多 " },
            used: { type: "text", text: " 上拉加载更多 " },
            expired: { type: "text", text: " 上拉加载更多 " }
        },
        list: {},
        detail: {
            id: 0,
            price: 0.0,
            value: 0.0,
            offset: 0.0,
            promotion_type: 1,
            promotion: { data: { price: 0.0 } },
            store: { data: {} }
        },
        evaluationList: {},
        evaluationListPaginate: {
            pagination: { current_page: 0 }
        },
        evaluationListLoader: {
            type: "text",
            text: " 上拉加载更多 "
        },
        qrcode: {
            file: "default.png",
            expired: 0,
            message: '已成功刷新',
            refresh: false,
        },
        timer: null
    },
    actions: {
        async getList(
            context,
            payload = { replace: false, type: "normal", params: {} }
        ) {
            context.commit("saveLoader", {
                type: payload.type,
                loader: { type: "loading" }
            });

            await api
                .get(`consumer/coupon/list`, { ...payload.params })
                .then(res => {
                    const { pagination } = res.meta || {};
                    delete pagination.links;

                    if (pagination.current_page === pagination.total_pages) {
                        context.commit("saveLoader", {
                            type: payload.type,
                            loader: { type: "text", text: " 这已经是我的底线啦 " }
                        });
                    } else {
                        context.commit("saveLoader", {
                            type: payload.type,
                            loader: { type: "text", text: " 上拉加载更多 " }
                        });
                    }
                    context.commit("saveList", {
                        replace: payload.replace,
                        list: res.data,
                        type: payload.type,
                        pagination
                    });
                });
        },

        async getDetail(context, payload) {
            wx.showLoading({
                title: "Loading...",
                mask: true
            });
            return api
                .get(`consumer/coupon/detail/${payload.id}`, payload.params || {})
                .then(res => {
                    context.commit("saveDetail", res.data);
                })
                .catch(async err => {
                    wx.showToast({
                        title: err.data.message,
                        icon: "none",
                        mask: true
                    });
                });
        },

        async getQrcode(context, payload) {
            context.dispatch("clearTimeInterval");
            console.log(payload)
            wx.showLoading({
                mask: true,
                title: 'Loading...',
            });

            context.commit('saveQrcode', {
                refresh: true,
                message: '正在刷新二维码',
            });

            return api.get(`${goHost}coupon/qrCode/${payload.id}`).then(res => {
                context.commit("saveQrcode", res.data);
                let exp = dayjs.unix(res.data.expired);
                let now = dayjs();
                let as = exp.diff(now, "second");
                let count = as;

                if (count > 0) {
                    context.state.timer = setInterval(async (c, p) => {
                        --count;
                        if (count === 0) {
                            c.dispatch("clearTimeInterval");
                            c.dispatch("getQrcode", p);
                            return;
                        }

                        if (as - count <= 10) {
                            c.commit("saveQrcode", {
                                refresh: false,
                                message: '已成功刷新',
                            });
                        } else {
                            if (count <= 60) {
                                c.commit("saveQrcode", {
                                    refresh: true,
                                    message: `${count}秒后自动刷新`,
                                })
                            } else {
                                c.commit("saveQrcode", {
                                    refresh: true,
                                    message: "刷新二维码",
                                })
                            }
                        }
                    }, 1000, context, payload);
                }
            }).catch(async err => {
                    context.commit("saveQrcode", {
                        file: "default.png",
                        expired: 0
                    });
                });
        },

        clearTimeInterval(ctx, _) {
            clearInterval(ctx.state.timer);
        },

        async scanQrcode(context, payload) {
            return api.post(`${goHost}coupon/scan`, {...payload}).then(res => {
                context.commit("saveDetail", res.data);
                wx.navigateTo({
                    url: '/pages/coupon/writeoff',
                })
            }).catch(async err => {
                wx.showToast({
                    title: err.data.message,
                    icon: "none",
                    mask: true
                });
                wx.navigateBack();
            })
        },

        //获取店铺评价
        async getEvaluationList(context, payload) {
            return api
                .get(`consumer/evaluateList`, { ...payload })
                .then(res => {
                    context.commit("saveEvaluationList", res);
                    if (
                        res.meta.pagination.current_page ===
                        res.meta.pagination.total_pages
                    ) {
                        console.log("=");
                        context.commit("saveEvaluationLoader", {
                            type: "text",
                            text: "这已经是我的底线啦"
                        });
                    } else {
                        console.log("!=");
                        // context.commit('evaluationListLoader', {
                        //     evaluationListLoader: { type: 'text', text: ' 上拉加载更多 ' },
                        // });
                    }
                })
                .catch(async err => {
                    wx.showToast({
                        title: err.data.message,
                        icon: "none",
                        mask: true
                    });
                });
        }
    },
    mutations: {
        saveList(state, payload) {
            const { list, pagination, type, replace } = payload;
            delete pagination.links;

            switch (type) {
                case 'normal':
                    state.list = {
                        ...state.list,
                        normal: replace ? list : state.list.normal.concat(list),
                    }
                    state.paginate = {
                        ...state.paginate,
                        normal: {
                            ...state.paginate.normal,
                            ...pagination,
                        }
                    }
                    break;

                case 'waitPay':
                    state.list = {
                        ...state.list,
                        waitPay: replace ? list : state.list.waitPay.concat(list),
                    }
                    state.paginate = {
                        ...state.paginate,
                        waitPay: {
                            ...state.paginate.waitPay,
                            ...pagination,
                        }
                    }
                    break;

                case 'used':
                    state.list = {
                        ...state.list,
                        used: replace ? list : state.list.used.concat(list),
                    }
                    state.paginate = {
                        ...state.paginate,
                        used: {
                            ...state.paginate.used,
                            ...pagination,
                        }
                    }
                    break;

                case 'expired':
                    state.list = {
                        ...state.list,
                        expired: replace ? list : state.list.expired.concat(list),
                    }
                    state.paginate = {
                        ...state.paginate,
                        expired: {
                            ...state.paginate.expired,
                            ...pagination,
                        }
                    }
                    break;
            }

        },

        saveLoader(state, payload) {
            const { type, loader } = payload;
            state.loader[type] = {
                ...state.loader[type],
                ...loader
            }
        },

        saveDetail(state, payload) {
            state.detail = Object.assign(state.detail, payload);
        },

        saveQrcode(state, payload) {
            state.qrcode = {
                ...state.qrcode,
                ...payload,
            }
        },

        saveEvaluationList(state, payload) {
            // console.log(payload)
            console.log(payload.data)
            console.log(payload.meta)
            state.evaluationList = payload.data
            state.evaluationListPaginate = payload.meta
        },

        saveEvaluationLoader(state, payload) {
            // const { type,loader } = payload;
            console.log(payload)
            // state.evaluationListLoader = {
            //     ...state.loader,
            //     ...loader
            // }
        },
    },
}

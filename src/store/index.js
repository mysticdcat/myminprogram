import Vue from 'vue';
import Vuex from 'vuex';

import login from '@/store/login';
import user from '@/store/user';
import store from '@/store/store';
import promotion from '@/store/promotion';
import coupon from '@/store/coupon';
import home from '@/store/home';
import search from '@/store/search';
import comment from '@/store/comment';
import order from '@/store/order';
import message from '@/store/message';
import evaluation from '@/store/evaluation';
import collection from '@/store/collection';

Vue.use(Vuex);
 export default new Vuex.Store({
    modules: {
        login: {
            namespaced: true,
            ...login,
        },
        user: {
            namespaced: true,
            ...user,
        },
        store: {
            namespaced: true,
            ...store,
        },
        promotion: {
            namespaced: true,
            ...promotion,
        },
        coupon: {
            namespaced: true,
            ...coupon,
        },
        home: {
            namespaced: true,
            ...home,
        },
        search: {
            namespaced: true,
            ...search,
        },
        comment: {
            namespaced: true,
            ...comment,
        },
        order: {
            namespaced: true,
            ...order,
        },
        message: {
            namespaced: true,
            ...message,
        },
        evaluation: {
            namespaced: true,
            ...evaluation,
        },
        collection: {
            namespaced: true,
            ...collection,
        }
    }
 });

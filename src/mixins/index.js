import { mapState } from 'vuex';
import wxapi from '@/utils/wxapi';

export  const loginMixin = {
    computed: {
        ...mapState('user', [
            'user',
            'coordi',
            'token',
        ]),
        ...mapState('store', [
            'store',
        ]),
    },

    methods: {
        async checkLogin(getPosition = true) {
            if (this.token) {
                if (getPosition) {
                    await this.$store.dispatch('user/getPosition');
                }
            } else {
                let res = await wxapi('login');
                if (res.code) {
                    const { code } = res;
                    await this.$store.dispatch('user/login', { code });
                    this.$http.interceptors.request.use(req => {
                        req.headers['Authorization'] = 'Bearer ' + this.token;
                        return req;
                    });

                    if (getPosition) {
                        
                        await this.$store.dispatch('user/getPosition');

                        if (this.coordi) {
                            wx.showLoading({
                                mask: true,
                                title: '正在获取位置信息'
                            })
                            await this.$store.dispatch('user/city', {
                                latitude: this.coordi.latitude,
                                longitude: this.coordi.longitude,
                            })
                        }
                    }
                }
            }

        },
        //检测是否已绑定手机
        async checkBind() {
            await this.$store.dispatch('user/getUser');

            if (! this.user.mobile) {
                // let pages = getCurrentPages();
                // let currentPage = pages[pages.length - 1];

                // this.$store.commit('login/saveReferrer', {
                //     route: currentPage.route,
                //     options: currentPage.options,
                // });
                wx.navigateTo({
                    url: '/pages/login/index'
                });
                return false;
            } else {
                return true;
            }
        },

        async checkStore() {
            // await this.$store.dispatch('store/getStore');

            if (! this.store || ! this.store.id) {
                wx.redirectTo({
                    url: '/pages/store/create',
                });
                return false;
            } else if (this.store.status !== 1) {
                wx.redirectTo({
                    url: '/pages/store/state',
                });
                return false;
            }
            return true;
        }
    },
}

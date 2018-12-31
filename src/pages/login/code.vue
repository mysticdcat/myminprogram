<template>
    <div class="bind-form">
        <h3 class="bind-form-title">请输入验证码</h3>
        <ul class="bind-form-code" @click="showKeyBoard">
            <li class="bind-form-code-item" v-for="(i, k) in length" :key="k" @click="showKeyBoard">
                {{ code[i] }}
            </li>
        </ul>
        <input type="number"
            :focus="focus"
            :cursor="cursor"
            style="width:0; height: 0;"
            v-model="code"
            @blur="hideKeyBoard"
        />
        <p class="bind-form-tip">验证码已发送至: {{ mobile }}，请注意查收</p>
        <p class="bind-form-tip" @click="reSend" v-if="limitSec === 0">
            没收到短信？<span>重新获取验证码</span>
        </p>
        <p class="bind-form-tip" v-else>
            没收到短信？<span>{{limitSec}}</span> 秒后重新获取
        </p>

        <button v-if="canUserOpenType"
            open-type="getUserInfo"
            @getuserinfo="getUserInfo"
            class="bind-form-btn"
            :disabled="btnDisabled"
        >
            <ali-icon type="wechat" size="45" color="#FFF" va="-5" /> 立即绑定到微信
        </button>

        <button v-else @click="doBind" class="bind-form-btn" :disabled="btnDisabled">立即绑定</button>
    </div>
</template>

<style lang="less" scoped>
.bind-form {
    padding: 20rpx;

    &-title {
        text-align: center;
        font-size: 40rpx;
        line-height: 100rpx;
        font-weight: 300;
    }

    &-tip {
        text-align: center;
        font-size: 28rpx;
        color: #777;

        span {
            color: rgba(255,68,51, .7);
        }
    }

    &-code {
        display: flex;
        justify-content:center;
        &-item {
            border: 1px solid #eee;
            border-radius: 10rpx;
            width: 100rpx;
            height: 100rpx;
            line-height: 100rpx;
            text-align: center;
            margin: 20rpx;
            font-size: 40rpx;
        }
    }

    &-btn {
        background: #f43;
        color: #fff;
        font-size: 35rpx;
        font-weight: 200;
        height: 80rpx;
        line-height: 80rpx;
        border: none;
        border-radius: 10rpx;
        margin-top: 40rpx;
    }
}
</style>

<script>
import { mapState } from 'vuex';

export default {
    data: () => ({
        canUserOpenType: wx.canIUse('button.open-type.getUserInfo'),
        focus: true,
        btnDisabled: true,
        length: 4,
        code: '',
        cursor: 1,
    }),

    computed: {
        ...mapState('login', [
            'mobile',
            'limitSec',
        ]),

        reSendText() {
            return this.limitSec > 0 ? `没收到短信？${this.limitSec}</span> 秒后重新获取` : '没收到短信？<span>重新获取</span>';
        }
    },

    methods: {
        showKeyBoard() {
            this.focus = true;
        },
        hideKeyBoard() {
            this.focus = false;
        },

        reSend() {
            if (this.limitSec === 0) {
                wx.redirectTo({
                    url: '/pages/login/index',
                });
            }
        },

        getUserInfo(e) {
            this.doBind(e);
        },

        doBind(e) {
            const { userInfo } = e.mp.detail;

            let data = {code: this.code};
            if (userInfo) {
                data = {
                    ...data,
                    avatar: userInfo.avatarUrl,
                    country: userInfo.country,
                    province: userInfo.province,
                    city: userInfo.city,
                    gender: userInfo.gender,
                    nick_name: userInfo.nickName,
                }
            }

            this.$store.dispatch('login/bindMobile', {
                ...data
            }).then(() => {
                this.code = '';
                this.btnDisabled = true;
                this.cursor = 1;
                this.focus = true;
            });
        }
    },

    watch: {
        code() {
            this.cursor = this.code.length;
            if (this.code.length >= this.length) {
                this.code = String(this.code).slice(0, this.length);
            }

            if (this.code.length === this.length) {
                this.btnDisabled = false;
                this.hideKeyBoard();
            } else {
                this.btnDisabled = true;
            }
        }
    }
}
</script>

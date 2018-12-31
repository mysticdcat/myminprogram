<template>
    <div class="bind-form">
        <h3 class="bind-form-title">手机号绑定</h3>
        <input type="number" v-model="mobile" :focus="focus" class="bind-form-input" placeholder="请输入您的手机号码" />
        <button class="bind-form-btn" :disabled="btnDisabled" @click="getCode">{{ btnText }}</button>

        <i-message id="message" />
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

    &-input {
        margin: 100rpx auto;
        font-size: 35rpx;
        font-weight: 200;
        text-align: center;
        height: 60rpx;
        line-height: 60rpx;
        color: #777;
        border-bottom: 1px solid #eee;
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
    }
}
</style>

<script>
import { mapState } from 'vuex';

export default {
    data: () => ({
        lengthOk: false,
        mobile: '',
        focus: true,
    }),

    computed: {
        ...mapState('user', [
            'user',
        ]),
        ...mapState('login', [
            'limitSec',
        ]),

        btnDisabled() {
            return ! this.lengthOk || this.limitSec > 0;
        },
        btnText() {
            return this.limitSec > 0 ? `${this.limitSec} 秒后重新发送` : '下一步'
        }
    },

    methods: {
        getCode() {
            this.$store.dispatch('login/getSmsCode', {
                mobile: this.mobile
            });
        },
        hideKeyboard() {
            this.focus = false;
        }
    },

    watch: {
        mobile() {
            if (this.mobile.length > 11) {
                this.mobile = String(this.mobile).slice(0, 11);
            }

            if (this.mobile.length === 11) {
                this.lengthOk = true;
                this.hideKeyboard();
            } else {
                this.lengthOk = false;
            }
        }
    }
}
</script>

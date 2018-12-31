<template>
    <div class="mine">
        <form @submit="commentSubmit">
            <view class="page-section-title">反馈内容</view>
            <view class="textarea-wrp">
                <textarea placeholder-class="phcolor" placeholder="必填" name="feed"/>
            </view>
            <view class="page-section-title">手机号码</view>
            <view class="weui-cell weui-cell_input">
                <input type="number" :value="user.mobile" placeholder-class="phcolor" class="weui-input" placeholder="非必填" name="mobile"/>
            </view>
            <button  formType="submit">提交</button>
        </form>

        <i-message id="message" />
    </div>
</template>

<script>
import { $Message } from '@/ui/iview/base/index';
import { mapState } from 'vuex';
export default {
    data: () => ({
    }),

    computed: {
        ...mapState('user', ['user']),
    },

    methods: {
        async commentSubmit(e) {
            const { value } = e.mp.detail;
            if (value.feed == '') {
                $Message({
                    content: '亲，您是不是忘了填写反馈内容了:(',
                    type: 'error',
                });
                return false;
            }
            this.$store.dispatch('user/postFeedback', value);
        },
    }
}
</script>

<style>
    .mine{
        width: 90%;
        font-size: 14px;
        color: #777;
        margin: 0 auto;
    }

    .page-section-title{
        padding: 10px 0px;
        display: inline-block;
    }

    textarea{
        width: auto;
        padding: 8px;
        height: 260px;
        border: 1px solid #eee;
    }

    input{
        border: 1px solid #eee; padding: 8px;
    }

    .phcolor {
		color: #aab2bd;
    }

    .textarea-wrp {
        background-color: #fff;
    }

    button{
        font-size: 30rpx;
        height: 80rpx;
        line-height: 80rpx;
        color: #fff;
        border-radius:3px;
        margin-top:20px;
        background: #ff4433;
    }


</style>



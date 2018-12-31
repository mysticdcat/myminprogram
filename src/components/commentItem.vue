<template>
    <div class="comment-item">
        <div class="comment-avatar">
            <avatar size="90" :src="avatar" />
        </div>
        <div class="comment-description">
            <p>
                <span class="comment-nickname">{{ nickname }}</span>
                <span class="comment-at">{{ date }}</span>
            </p>
            <p class="comment-score">
                <i-rate :disabled="true" :value="score" size="35" />
            </p>
            <div class="comment-content">
                <div class="comment-text">
                    {{ content }}
                </div>
                <div class="comment-image">
                    <image
                        v-for="(url, k) in images"
                        :src="url"
                        :key="k"
                        style="width: 150rpx; height: 150rpx; margin: 20rpx 20rpx 0 0;"
                        @click="showPreview(url, event)"
                        mode="aspectFill"
                    />
                </div>
            </div>
            <p class="comment-coupon"><i-icon type="coupons" size="26" color="#777" /> {{title}}</p>
        </div>
    </div>
</template>

<style lang="less">
.comment {
    &-item {
        padding: 25rpx;
        overflow: hidden;
        display: flex;
        border-bottom: 1px solid #f7f7f7;
    }

    &-avatar {
        flex: 1;
    }
    &-description {
        flex: 5;
    }

    &-description p:first-child {
        overflow: hidden;
        display: flex;
        width: 100%;
    }

    &-nickname, &-at {
        display: block;
        font-size: 30rpx;
        height: 40rpx;
        flex: 1;
    }

    &-at {
        text-align: right;
        font-size: 28rpx;
        color: #777;
    }

    &-score {
        padding-bottom: 20rpx;
        text-align: justify;
    }
    
    &-coupon {
        font-size: 20rpx; 
        color: #777; 
        padding-top: 10rpx;
    }
}
</style>

<script>
import avatar from '@/components/avatar';

export default {
    components: {
        avatar,
    },
    props: ['avatar', 'nickname', 'score', 'date', 'content', 'images', 'title'],

    methods: {
        showPreview(url, e) {
            wx.previewImage({
                current: url,
                urls: this.images
            });
        }
    }
}
</script>

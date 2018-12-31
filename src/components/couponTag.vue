<template>
    <div class="tag-warp">
        <div class="tag-container">
            <i class="tag-dot" :style="{borderColor}"></i>
            <div class="tag-header" :style="{background: backgroundColor, borderColor: borderColor}"></div>
            <div class="tag-content" :style="{backgroundColor, borderColor, color: fontColor}">
                {{text}}
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.tag {
    &-warp {

    }
    &-container {
        padding: 0 0 0 20rpx;
        position: relative;
        z-index: 1;
    }
    &-dot {
        position: absolute;
        border-width: 1px;
        border-style: solid;
        background: #fff;
        width: 10rpx;
        height: 10rpx;
        border-radius: 10rpx;
        top: 16rpx;
        left: 16rpx;
    }
    &-header {
        border-width: 1px;
        border-style: solid;
        width: 32rpx;
        height: 32rpx;
        border-radius: 8rpx;
        transform: rotate(45deg);
        position: absolute;
        left: 6rpx;
        top: 5rpx;
        z-index: -1;
    }
    &-content {
        width: 100rpx;
        height: 40rpx;
        border-radius: 6rpx;
        border-width: 1px;
        border-style: solid;
        border-left: none;
        text-indent: 10rpx;
        text-align: center;
        font-weight: 300;
        line-height: 40rpx;
        font-size: 24rpx;
    }
}
</style>


<script>
export default {
    props: {
        backgroundColor: {
            type: String,
            default: 'RGBA(255, 244, 244, 1.00)',
        },
        borderColor: {
            type: String,
            default: 'RGBA(252, 225, 226, 1.00)',
        },
        fontColor: {
            type: String,
            default: '#f43',
        },
        text: {
            type: String,
            default: '代金劵',
        }
    }
}
</script>


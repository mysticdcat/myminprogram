<template>
    <div class="progress-outer" :style="{width: width + 'rpx', background: outerColor}">
        <div class="progress-inner" :style="{background: innerColor, width: percent + '%'}">
            <p class="progress-inner-bg" :animation="animation"></p>
        </div>
        <p class="progress-text">{{text}}</p>
    </div>
</template>

<style lang="less" scoped>
.progress {
    &-outer {
        background-color:RGBA(254, 180, 194, 1.00);
        border-radius: 10rpx;
        overflow: hidden;
        position: relative;
    }

    &-text {
        position: absolute;
        width: 100%;
        color: #fff;
        text-align: left;
        line-height: 20rpx;
        padding-left: 20rpx;
        font-size: 16rpx;
        font-weight: 300;
        top: 0;
        left: 0;
    }

    &-inner {
        position: relative;
        height: 20rpx;
        border-radius: 10rpx;
        overflow: hidden;

        &-bg {
            background: #fff;
            width: 0;
            height: 100%;
            opacity: 1;
            position: absolute;
            border-radius: 10rpx;
            top: 0;
            left: 0;
            right:0;
            bottom: 0;
        }
    }
}

</style>

<script>
export default {
    props: {
        active: {
            type: Boolean,
            default: false,
        },
        text: {
            type: String,
            default: ''
        },
        width: {
            type: Number,
            default: 300,
        },
        percent: {
            type: Number,
            default: 0,
        },
        outerColor: {
            type: String,
            default: 'RGBA(254, 180, 194, 1.00)',
        },
        innerColor: {
            type: String,
            default: '#f43',
        }
    },

    data: () => ({
        animation: {},
    }),

    onReady() {
        if (this.active) {
            let animation = wx.createAnimation({
                timingFunction: 'ease-in-out',
            });

            let animation2 = wx.createAnimation({
                duration: 1,
            });

            animation.width(0).width('100%').opacity(0.3).opacity(0).step({
                duration: 2000
            });
            this.animation = animation.export();

            let loop = false;
            setInterval(() => {
                if (loop) {
                    animation.width(0).width('100%').opacity(0.3).opacity(0).step({
                        duration: 2000,
                    });
                    this.animation = animation.export();
                    loop = false;
                } else {
                    animation.width(0).opacity(.8).step({
                        duration: 0,
                    });
                    this.animation = animation.export();
                    loop = true;
                }
            }, 2000);
        }
    }
}
</script>

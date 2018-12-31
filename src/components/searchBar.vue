<template>
    <div class="search-bar">
        <div class="search-city">
            <text>{{city}}</text>
            <i-icon size="38" color="#777" type="coordinates_fill" />
        </div>
        <div class="search-input" @click="toSearch">
            <i-icon type="search" size="35"  color="#999" />
            {{holder}}
        </div>
        <div class="search-scan" @click="doScan">
            <i-icon type="scan" size="55" color="#777" />
        </div>
    </div>
</template>

<style lang="less">
.search{
    &-bar {
        background: #fff;
        width: 100%;
        height: 70rpx;
        display: flex;
    }
    &-input {
        margin-top: 2px;
        flex: auto;
        border-radius: 30rpx;
        height: 55rpx;
        line-height: 60rpx;
        background: #eee;
        padding: 0 10px;
        text-align: center;
        color: #999;
        font-size: 28rpx;
    }
    &-city {
        text-align: center;
        font-size: 32rpx;
        color: #777;
        line-height: 60rpx;
        flex: 1;
    }
    &-scan {
        flex: .7;
        line-height: 60rpx;
        text-align: center;
    }
}
</style>

<script>
    export default {
        props: {
            city: {
                type: String,
                default: '杭州',
            },
            holder: {
                type: String,
                default: '搜索品牌或店名',
            }
        },

        methods: {
            toSearch() {
                wx.navigateTo({
                    url: '/pages/search/index',
                });
            },
            doScan() {
                wx.scanCode({
                    success: res => {
                        if (res.scanType == "QR_CODE") {
                            this.$store.dispatch('coupon/scanQrcode', {
                                token: res.result,
                            });
                        }
                    }
                })
            }
        }
    }
</script>

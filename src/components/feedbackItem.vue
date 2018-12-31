<template>
    <div class="feedback-main">
    <div class="feedback-list">
        <view slot="title" class="feedback-date">
            {{created_at}}
        </view>
        <view slot="content" class="feedback-content">
            <a>{{content}}</a>
        </view>
        <i-steps current=status>
            <!-- status="wait" -->
            <i-step >
                <view slot="title" >
                    待跟进
                </view>
            </i-step>
            <i-step >
                <!-- status="process" -->
                <view slot="title">
                    处理中
                </view>
            </i-step>
            <!-- status="finish" -->
            <i-step >
                <view slot="title" icon="camera">
                    已完成
                </view>
            </i-step>
        </i-steps>
    </div>

    </div>
</template>

<style lang="less" scoped>
.feedback{

    &-main{
        margin: 0 auto;
        background:#F9F9F9;
        padding-bottom: 10px;
    }
    &-list{
        overflow: hidden;
        background: #fff;
        display: block;
        font-size: 13px;
        color: #999;
        padding: 12px;
    }
    &-date{
        border-bottom:1px dashed #dedede;
        padding-bottom: 8px;
        margin-bottom: 8px;
        font-size: 13px;
        color: #999;
    }
    &-content{
        padding-bottom:16px;
    }
    &-content a{
        font-size: 16px; color: #666;
    }
}


</style>

<script>


export default {

    props: ['id', 'content','status','created_at'],

    data: () => ({
            current : 0,

    }),


}
</script>


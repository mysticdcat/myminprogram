<template>
    <div class="list-main">
        <div class="list-list">

            <view slot="content" class="list-content">
                <a>{{id}}</a>
            </view>

            <view slot="time" class="list-date">
                {{created_at}}
            </view>

        </div>

    </div>
</template>

<style lang="less" scoped>
    .list{

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
            /* border-bottom:1px dashed #cccccc;*/
            /*padding-bottom: 8px;*/
            /* margin-bottom: 8px;*/
            font-size: 13px;
            color: #999;
            text-align: right;
        }
        &-title{
            border-bottom:1px dashed #dedede;
            padding-bottom:6px;
            margin-bottom: 5px;
            font-size: 16px; color: #666;
        }
        &-content{
            padding-bottom:8px;
        }
        &-content a{
            font-size: 16px; color: #666;
        }
    }


</style>

<script>


    export default {

        props: ['id','created_at'],

        data: () => ({
            current : 0,

        }),


    }
</script>


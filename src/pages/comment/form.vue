<template>
    <div class="comment-form">

        <form @submit="commentSubmit">
            <p class="comment-form-item">
                <label for="">商户名称</label>
                <span>
                    {{store_name}}
                </span>
            </p>
            <p class="comment-form-item">
                <label for="">点评活动</label>
                <span>
                    {{title}}
                </span>
            </p>
            <p class="comment-form-item">
                <label for="">服务打分</label>
                <input name="score" :value="score" style="display: none;">

                <span style="margin-top: -3rpx;">
                    <i-rate
                        @change="onScoreChange"
                        size="45"
                        :value="score"
                    />
                </span>
            </p>


            <textarea class="comment-form-textarea" name="content" :show-confirm-bar="true" placeholder="这位客官，对我说点什么呗..." />

            

            <div class="comment-form-image">

                <div class="comment-form-image-item"  v-for="(item, k) in images.pic" :key="k" @click="onImageClick($event, k)" >
                    <image 
                        :src = "imgHost+'fit/300/'+item"
                        mode="aspectFill"
                    />
                </div>

                <div class="comment-form-image-item" v-show=images.show  v-if="images.pic.length < 3" >
                    <div class="comment-form-image-add" @click="onImageClick($event,images.pic.length)">
                        <i-icon type="add" size="70" color="#777" />
                    </div>
                </div>
            </div>

            <i-action-sheet :visible="sheet.show" :actions="sheet.actions" show-cancel @cancel="hideSheet" @iclick="onSheetClick" :mask-closable="true" />

            <div class="padding15" style="padding-bottom: 30rpx;">
                <button class="comment-form-btn" formType="submit">发表点评</button>
            </div>
        </form>

        <i-modal title="提示" :visible="buyModal.show" :actions="buyModal.actions" @iclick="onBuyModalClick">
            <div class="modal-content">
                {{buyModal.message}}
            </div>
        </i-modal>
    </div>
</template>

<style lang="less" scoped>
.comment-form {
    &-item {
        height: 90rpx;
        line-height: 90rpx;
        font-size: 26rpx;
        border-bottom: 1px solid #eee;
        display: flex;

        label {
            color: #999;
            text-align: center;
            flex: .9;
        }
        span {
            flex: 3;
        }
    }

    &-textarea {
        height: 200rpx;
        margin: 0 20rpx;
        padding: 15rpx;
        font-size: 26rpx;
    }

    &-image {
        border-top: 1px solid #eee;
        display: flex;
        padding: 10rpx 20rpx;
        overflow: hidden;

        &-item {
            width: 160rpx;
            height: 160rpx;
            border-radius: 5rpx;
            border:1px solid #eee;
            background: #f9f9f9;
            margin: 10rpx;
        }

        &-add {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items:center;
        }

        image {
            width: 100%;
            height: 100%;
        }
    }

    &-btn {
        background: #f43;
        border: none;
        height: 70rpx;
        line-height: 70rpx;
        width: 100%;
        border-radius: 4px;
        color: #fff;
        font-size: 28rpx;
        font-weight: 300;
    }
}
</style>

<script>
import { sleep } from '@/utils/';
import { imgHost } from '@/config';
import { mapState } from 'vuex';
export default {
    data: () => ({
        imgHost,
        score: 5,
        store_name:'',
        title:'',
        user_coupon_id:0,

        images:{
            pic:[],
            show:true,
            imgId: 0, //当前定位在第一张图片
        },
        sheet: {
            show: false,
            actions: [
                {
                    name: '重新上传',
                },
                {
                    name: '删除图片',
                    color: '#f30',
                },
            ]
        },
    }),
    computed: {
        ...mapState('comment', [
            'comment',
            'buyModal'
        ]),
        ...mapState('user', [
            'token',
        ]),
    },
    methods: {
        hideSheet() {
            this.sheet.show = false;
        },
        onSheetClick(e) {
            this.hideSheet();
            const { index } = e.mp.detail;
            if (index === 0) { //重新上传
                this.choosePic();
            } else {
                this.images.pic.splice(this.images.imgId, 1);
            }
        },

        async commentSubmit(e) {
            console.log(this.buyModal)
            var formData = e.mp.detail.value;
            if(formData.content == ""){
                this.buyModal.show = true
                this.buyModal.message="这位客官，对我说点什么呗..."
            }else{
                this.comment.score = formData.score;
                this.comment.content = formData.content;
                this.comment.images = this.images.pic
                this.comment.user_coupon_id = this.user_coupon_id

                // var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL2NvdXBvblNlcnZlclwvcHVibGljXC9hcGlcL3VzZXJcL3Rva2VuIiwiaWF0IjoxNTQxNDY5NDM4LCJleHAiOjE1NDE3Mjg2MzgsIm5iZiI6MTU0MTQ2OTQzOCwianRpIjoiTHVQSW43dXY3cFVqd2VGSyIsInN1YiI6MiwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.NZ-_70YYvBy-rSQdh1Alq1wuZzCCQuxaZ4LedY7DF-o";
                this.$store.dispatch('comment/postComment', {
                    ...this.comment,
                    "token":this.token
                });
            }
            
        },
        onScoreChange(e) {
            this.score = e.mp.detail.index
        },
        onImageClick(e, i) {

            this.images.imgId = i;

            if (this.images.pic[i]) {
                this.sheet.show = true;
            } else {  
                this.choosePic()  
            }
        },
        
        choosePic() {
            var that = this;
            wx.chooseImage({
                count: 3,
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    for (var index in res.tempFilePaths) {
                        that.upload_file(imgHost + 'upload', res.tempFilePaths[index])
                    }
                }
            })
        },

        upload_file: function (url, filePath) {
            var that = this;
            // var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL2NvdXBvblNlcnZlclwvcHVibGljXC9hcGlcL3VzZXJcL3Rva2VuIiwiaWF0IjoxNTQxNDY5NDM4LCJleHAiOjE1NDE3Mjg2MzgsIm5iZiI6MTU0MTQ2OTQzOCwianRpIjoiTHVQSW43dXY3cFVqd2VGSyIsInN1YiI6MiwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.NZ-_70YYvBy-rSQdh1Alq1wuZzCCQuxaZ4LedY7DF-o";
            wx.uploadFile({
                url: url,
                filePath: filePath,
                name: 'file', 
                header: {
                    'Authorization': `Bearer ${this.token}`,
                }, // 设置请求的 header
                formData: {  path: `comment` }, // HTTP 请求中其他额外的 form data
                success: res => {
                    console.log(res.data)
                    let ret = JSON.parse(res.data);
                    
                    this.images.pic.splice(this.images.imgId, 1);
                    this.images.pic.splice(this.images.imgId, 0, ret.data.filename);
                },

                complete: () => {
                }
            })
        },
        onBuyModalClick(e) {
            this.buyModal.show = false;
        },
    
    },

    onLoad: function (query) {
        // console.log(query);
        this.store_name = query.store_name
        this.title = query.title
        this.user_coupon_id = query.user_coupon_id
    }
}
</script>

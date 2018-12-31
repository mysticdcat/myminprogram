<template>
    <div class="store-state">
        <section>
            <label >店铺名称</label>
            <p>{{ store.name }}</p>
        </section>
        <section>
            <label >所属行业</label>
            <p>{{ industryTxt }}</p>
        </section>
        <section>
            <label >申请时间</label>
            <p>{{ store.created_at }}</p>
        </section>
        <section>
            <label >店铺状态</label>
            <p @click="showModal">
                <i :style="{color: statusObj.color}">·</i>
                <span>{{ statusObj.text }}</span>

                <i-icon type="feedback_fill" size="30" />
            </p>
        </section>

        <i-modal title="店铺状态" :visible="modal.show" :show-ok="false" :show-cancel="false" :actions="modal.actions" @iclick="onModalClick">
            <div style="padding: 0 20rpx; color: #777; text-indent: 56rpx; text-align: left;">
                {{modal.text}}
            </div>
        </i-modal>
    </div>
</template>

<style lang="less" scoped>
.store-state {
    width: 80%;
    margin: 20% auto;
    font-size: 30rpx;

    section {
        display: flex;
        line-height: 80rpx;
        border-bottom: 1px dashed #eee;

        label {
            color: #555;
            flex: 1;
            &:after {
                content: "："
            }
        }

        p {
            color: #777;
            flex: 3;
            height: 80rpx;
            line-height: 80rpx;

            i, span {
                vertical-align: middle;
                font-size: 80rpx;
                display: inline-block;
            }

            span {
                font-size: 30rpx;
                margin-right: 10rpx;
            }
        }
    }
}
</style>


<script>
import { mapState } from 'vuex';
import { storeStatus } from '@/config';

export default {
    data: () => ({
        modal: {
            show: false,
            text: '',
            actions: [],
        },
    }),

    computed: {
        ...mapState('store', [
            'store',
            'industries',
        ]),

        industryTxt() {
            let item = this.industries.find(i => i.id === this.store.industry_id);
            return item ? item.name : '未知';
        },

        statusObj() {
            let ret = { color: 'gray', text: '未知' };
            let s = storeStatus.find(i => i.status === this.store.status)
            if (s) {
                ret = {...ret, ...s}
            }

            return ret;
        },
    },

    methods: {
        showModal() {
            this.modal.show = true;
        },

        onModalClick(e) {
            this.modal.show = false;
            if (e.mp.detail.index === 1) {
                wx.redirectTo({
                    url: '/pages/store/create',
                });
            }
        }
    },

    async mounted() {
        this.modal.show = false;

        await this.$store.dispatch('store/getStore');
        if (this.store.status === 1) {
            wx.redirectTo({
                url: '/pages/store/index',
            });
        } else {
            await this.$store.dispatch('store/getIndustries');

            switch(this.store.status) {
                case -100:
                    this.modal = {
                        ...this.modal,
                        text: this.store.status_note,
                        actions: [
                            { name: '关闭', color: '#f43' },
                        ],
                    }
                    break;

                case -1:
                    this.modal = {
                        ...this.modal,
                        text: this.store.status_note,
                        actions: [
                            { name: '关闭', color: '#777' },
                            { name: '重新提交', color: '#1890ff' }
                        ],
                    }
                    break;

                case 0:
                    this.modal = {
                        ...this.modal,
                        text: '我们会尽快完成审核，在此期间，请耐心等待',
                        actions: [
                            { name: '关闭', color: '#777' },
                        ],
                    }
                    break;

                default:
                    this.modal = {
                        ...this.modal,
                        text: '',
                        actions: [
                            { name: '关闭', color: '#777' },
                        ],
                    }
            }
        }
    },
}
</script>

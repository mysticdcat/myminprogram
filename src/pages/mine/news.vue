<template>
    <div>
        <web-view :src="url"></web-view>
    </div>
</template>

<script>
import { pages } from '@/config';

export default {
    data: () => ({
        url: '',
    }),

    mounted() {
        let item = pages[this.$mp.query['type']];
        this.url = item.url;
        wx.setNavigationBarTitle({
            title: item.text,
        });
    }
}
</script>


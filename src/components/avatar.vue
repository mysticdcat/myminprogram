<template>
    <image :src="imgSrc" :style="{width: size + 'rpx', height: size + 'rpx', borderRadius: '50%'}" mode="aspectFill" />
</template>

<style>

</style>

<script>
import { imgHost } from '@/config';

export default {
    props: ['src', 'size'],

    computed: {
        imgSrc() {
            if (! this.src) {
                return `${imgHost}fit/${this.size}/avatar~null.png`;
            } else {
                if (this.src.startsWith('http')) {
                    return this.src;
                } else {
                    return imgHost + this.src;
                }
            }
        }
    }
}
</script>


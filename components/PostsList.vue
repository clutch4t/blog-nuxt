<template>
  <div class="flex flex-col gap-4">
        <UProgress animation='carousel' v-if="!posts.length" class="flex justify-center">Loading...</UProgress>
        <transition-group v-else name='post-list'>
            <PostItem v-for="post in posts" :post='post' :key="post.id" />
        </transition-group>
  </div>
</template>

<script setup lang='ts'>
import { defineProps } from "vue";

const props = defineProps({
    posts: {
        type: Array,
        required: true
    }
});

import {ref} from 'vue'

const loading = ref(false);


</script>

<style scoped>
.post-list-move,
.post-list-enter-active,
.post-list-leave-active {
    transition: all .4s ease;
}

.post-list-enter-from,
.post-list-leave-to {
    opacity: 0;
    transform: translateX(100%);
}

.post-list-leave-active {
    position: absolute;
}

.post-list-move {
    transition: transform .4s ease;
}
</style>
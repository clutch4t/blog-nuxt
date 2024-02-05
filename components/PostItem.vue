<template>
     <UCard>
        <div class="flex gap-20 justify-between cursor-pointer items-center">
            <div class="flex flex-col gap-3">
                <div>
                    <b class="text-lg">Title:</b> {{post.title}}
                </div>
                <div class='flex flex-wrap text-wrap flex-col w-full'>
                    <b class="text-lg">Content:</b> {{post.body}}
                </div>
            </div>
            <NuxtLink :to="`/posts/${post.id}`">
                <UButton type='success' size='md' class="bg-green-500 p-2 ml-4 w-24 flex items-center justify-center">See the post</UButton>
            </NuxtLink>
        </div>
    </UCard>
</template>

<script setup lang='ts'>
    const props = defineProps({
    post: {
        type: Object,
        required: true
    }
});
</script>

<style>

</style>
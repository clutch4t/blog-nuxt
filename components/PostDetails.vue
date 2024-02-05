<template>
    <div class="container mx-auto">
        <div class="card flex w-full">
            <NuxtLink :to="`/`">
                <UButton color="transparent" title="Go back">
                    <UIcon name="i-heroicons-arrow-left-20-solid" dynamic class="w-5 h-5" color="green"/>
                </UButton>
            </NuxtLink>
            <div class="p-7">
                <h1 class="text-2xl font-bold"><span>Post from user #</span>{{post.userId}}</h1>
                <h2 class="text-xl my-7"><span class="font-bold">Title:</span> {{post.title}}</h2>
                <h2 class="text-xl pb-1"><span class="font-bold">Post contents:</span></h2>
                <p class="mb-7">{{post.body}}</p>
                <UProgress animation='carousel' v-if="!postComments.length" class="flex justify-center">Loading...</UProgress>
                <transition-group v-else name='comments-list'>
                    <span class="font-bold">Comments:</span>
                    <PostComments v-for="comment in postComments" :comment="comment" :key="comment.id"/>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>

    const postComments = ref([] as Array<any>)

    const { post } = defineProps(['post'])

    async function fetchComments(){
        try{
            const {data: comments} = await useFetch(`http://localhost:9000/comments?postId=${post.userId}`, {
                  method: 'GET',
                  lazy: false,
                })
        
            console.log(comments);
            postComments.value = [...postComments.value, ...comments._rawValue]
            console.log(postComments);
        } catch (error) {
            console.log((error as Error).message);
        } 
    }


onMounted(() => {
    fetchComments()
})

</script>

<style scoped>
</style>
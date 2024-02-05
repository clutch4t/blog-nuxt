<template>
    <div>
        <Head>
            <Title>Nuxt Blog App | {{post.title}}</Title>
            <Meta name='description' :content="post.body" />
        </Head>
        <PostDetails :post='post' />
    </div>

</template>

<script setup lang="ts">
    const {id} = useRoute().params
    const uri = `http://localhost:9000/posts/${id}`

    const {data: post} = await useFetch(uri)

    if(!post.value){
        throw createError({statusCode: 404, statusMessage: "Post not found", fatal: true})
    }

</script>

<style scoped>

</style>
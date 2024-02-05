<template>
    <div class="flex flex-col gap-4">
        <div class="card my-3">
            <h4>{{comment.name}} <UIcon name="i-heroicons-at-symbol-20-solid" dynamic class="w-5 h-5" color='green' /> <span class="font-bold">{{comment.email}}</span> said:</h4>
            <p>{{comment.body}}</p>
        </div>
    </div>
</template>

<script setup lang="ts">

    const props = defineProps({
        comment: {
            type: Object,
            required: true
        }
    })

</script>

<style scoped>

</style>
<template>
    <Head>
        <Title>Nuxt Blog App</Title>
    </Head>
    <div class="container">
      <div class="flex flex-col gap-4">
        <div class="mt-4 flex justify-between items-center">
        <UInput v-model="searchQuery" type='text' color="primary" variant="outline" placeholder="Search for a post..." class="w-full"></UInput>
        </div>
        <div class="flex justify-end">
              <USelectMenu v-model='selectedSort' :options='sortOptions' class="w-40">
                  <template #leading>
                      <UIcon v-if='selectedSort.icon' :name="selectedSort.icon" dynamic class="w-5 h-5" />
                  </template>
              </USelectMenu>
        </div>
        <PostsList :posts='sortedAndSearchedPosts'/>
        <div ref="target" class="target"></div>
      </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue'
import { IPost } from '~/types';

const loading = ref(true);

const searchQuery = ref('');

const filteredPosts = ref([])
const posts = ref([] as Array<IPost>)

const page = ref(0);
const limit = ref(10)

const target = ref(null)


const sortOptions = [
    {
        value: "title",
        label: "Sort by title",
        icon: 'i-heroicons-pencil-solid'
    },
    {
        value: "body",
        label: "Sort by content",
        icon: 'i-heroicons-bars-3'
    }
]
const selectedSort = ref(sortOptions[0]);
const selectedItem = ref("");
 
async function fetchPosts() {
      try {
        loading.value = true;
        const {data: response} = await useFetch(`http://localhost:9000/posts?_page=${page.value}&_per_page=${limit.value}`, {
          method: 'GET',
          lazy: false,
        })
        posts.value = [...posts.value, ...response.data];
      } catch (error) {
        console.log((error as Error).message);
      } finally {
        loading.value = false;
      }
}

async function loadMorePosts() {
  try {
      page.value += 1;
      const response = await fetch(`http://localhost:9000/posts?_page=${page.value}&_per_page=${limit.value}`)
      const data = await response.json();
      posts.value = [...posts.value, ...data.data];
    } catch (error) {
        console.log((error as Error).message);
      }
}

  const sortedPosts = computed(() => {
      return [...posts.value].sort((a, b) => { return a[selectedSort.value.value]?.localeCompare(b[selectedSort.value.value]) });
  })
  const sortedAndSearchedPosts = computed(() => {
    return sortedPosts.value.filter(post => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
  })


onMounted(() => {
  fetchPosts()

   const options = {
      rootMargin: '0px',
      threshold: 1.0
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio > 0) {
              entry.target.classList.add('in-viewport');
            }else{
              entry.target.classList.remove('in-viewport');
            }

            if (entry.isIntersecting) {
              loadMorePosts()
            }
        });
      },
      options
    );

  if(target.value){
    observer.observe(target.value)
  }
})

</script>

<style scoped>
.container{
  max-width: 1200px;
  margin: 2rem auto;
}
</style>

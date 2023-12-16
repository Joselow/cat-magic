<script setup lang="ts">
import { useVirtualList, useInfiniteScroll, } from '@vueuse/core'; 
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { useCatImage } from '@/composables/useCatImage';
import { useDebounceRef } from "@/composables/useDebounceRef.js"
import { useScrollToTop } from "@/composables/useScrollToTop.js"

const catsNumberValue = ref([1])

const fact = useDebounceRef('cat', 800)

const wordNumber = computed(()=> fact.value.split(' ').length)
const { img } = useCatImage({ fact, wordNumber })

const { list, wrapperProps, containerProps }  = useVirtualList(
  catsNumberValue,  {
    itemHeight: 400,
  },
)

useInfiniteScroll(containerProps.ref, () => {
  catsNumberValue.value = [...catsNumberValue.value, ...Array.from(Array(10).keys())];
})

let scrollToTopFn: () => void;
const showScrollButtonValue = ref(false)

onMounted(() => {
  document.body.style.overflow = 'hidden';

  const { scrollToTop, showScrollButton } = useScrollToTop(containerProps.ref.value!)
  scrollToTopFn = scrollToTop
  watch (showScrollButton, (value) => showScrollButtonValue.value = value)
})

onUnmounted(() => {
  document.body.style.overflow = 'visible'
})

</script>

<template>
  <section>
    <span> write something and view the change</span>
    <input type="text" v-model="fact"
    >  
    <span>this has infinite scrolling and list virtualization</span>  
  </section>
  <div v-bind="containerProps"
    class="container-cats"
  >
        <div v-bind="wrapperProps" class="cats">
          <div  v-for="{ index } in list" :key="index" 
            class="cats-img"
          >
          <img 
            :src="`${img} ${index}`"
            alt="Imagen obtained by first word of cat'"
            title="Imagen obtained by first word of cat"
            />   
          </div>
        </div>
      </div>
      <button 
    class="toTopButton"    
    v-if="showScrollButtonValue" @click="scrollToTopFn">↑</button>
</template>

<style scoped>
input {
  /* max-width: 50%; */
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.3em 1em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  transition: border-color 0.25s;
  margin: 0 5px;
}
.container-cats {
  margin-top: 15px;
  width: 100vw;
  height: 80vh; 
  border-top: 1px solid #eee;
  padding-top: 25px;
}
.cats-img {
  width: 300px;
  height: 400px;
  margin: auto;
  margin-bottom: 25px;
}
.cats-img img {
  object-fit: cover;
  width:100%; 
  height: 100%;
  border-radius:20px;
}
</style>
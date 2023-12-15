<script setup lang="ts">
import { useVirtualList, useInfiniteScroll, watchDebounced, } from '@vueuse/core'; 
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { useCatImage } from '@/composables/useCatImage';

const catsNumberValue = ref([1])
const infiniteScrolling = ref(true)

const fact = ref('cat')
const wordNumber = computed(()=> fact.value.split(' ').length)
const { img } = useCatImage({ fact, wordNumber })

const { list, wrapperProps, containerProps }  = useVirtualList(
  catsNumberValue,  {
    itemHeight: 400,
  },
)

const spanRef = ref<HTMLSpanElement | null>(null)

watch(infiniteScrolling, (value) => {
  
  if (value) {
    useInfiniteScroll(containerProps.ref, () => {
        catsNumberValue.value = [...catsNumberValue.value, ...Array.from(Array(10).keys())];
      });
  } 

}, { immediate: true }
)


onMounted(() => {
  document.body.style.overflow = 'hidden';
})

onUnmounted(() => {
  document.body.style.overflow = 'visible';
})
// watchDebounced(
//   fact,
//   () => { console.log('changed!') },
//   { debounce: 2000, maxWait: 1000 },
// )
</script>

<template>
  <span ref="spanRef"></span>
  <section>
    <span> write something and view the change</span>
    <input type="text" v-model="fact"
    >  
    <span>this has infinite scrolling and list virtualization</span>
    <!-- <button 
      :class="{'selected': infiniteScrolling, 'no-selected': !infiniteScrolling }"
      @click="infiniteScrolling = !infiniteScrolling"> Infinite Scrolling </button>     -->
  </section>
  <div v-bind="containerProps"
    class="container-cats"
  >
        <div v-bind="wrapperProps" class="cats" ref="containerCat">
          <div  v-for="{ index } in list" :key="index" 
            class="cats-img"
          >
          <img 
            v-if="true"
            :src="`${img} ${index}`"
            alt="Imagen obtained by first word of cat'"
            title="Imagen obtained by first word of cat"
            />  
          </div>
        </div>
      </div>
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
<!-- <template>
  <span>
    {{ numberOfITEMS }}
  </span> 
  <div >
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.title }}</li>
    </ul>
    <div ref="scrollObserver" style="text-align: center; color: green;">    
      <span >
        loading ...
      </span> 
    </div>    
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted, computed, watch } from 'vue';

const items = ref([{title: 'aa', id: 0}])
let page = 1
let isLoading = false
let heightItem = 18
let header = 43

const numberOfITEMS = computed(()=>items.value.length)
const fetchItems = async (limit: number = 5) => {
  // Si ya se está cargando, no hagas nada
  if (isLoading) {
    return;
  }

  isLoading = true;

  try {
    // Simulación de una solicitud de API con datos paginados
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`);
    const newItems = await response.json();
    // items.value = [...items.value, ...newItems];
    items.value.push(...newItems)
    page++;
    console.log('PAGEEEEEE', page);
  } catch (error) {
    console.error('Error fetching items:', error);
  } finally {
      isLoading = false;
  }
};
const owo = (heighItem: number) => {
  const viewportHeight = window.innerHeight
  console.log(viewportHeight, header);
  
  const ITEM_NUMBERS = (viewportHeight - header)/heighItem
  fetchItems(ITEM_NUMBERS)
}
owo(heightItem)
const scrollObserver = ref(null);

watch(items, (value)=>{
  console.log(value);
})

const handleScroll = (e) => {  
  const scrollObservera = scrollObserver.value;
  // console.log(scrollObservera?.getBoundingClientRect().bottom, window.innerHeight);  

  if(scrollObservera?.getBoundingClientRect().bottom - window.innerHeight <= 50){
    // console.log('aaaaaaa');
    
  }

  if (scrollObservera?.getBoundingClientRect().bottom <= window.innerHeight) {
    fetchItems()
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

</script> -->

<script setup lang="ts">
import { useCatFact } from "./composables/useCatFact"
import { useCatImage } from "./composables/useCatImage"
import { ref, watch } from 'vue'
import InputAddSubs from './components/inputAddSubstract.vue'

const { fact, fetchCats } = useCatFact()

const wordNumber = ref(1)
const catsNumber = ref(1)

const catsNumberValue = ref(1)

const infiniteScrolling = ref(false)
const listsVirtualization = ref(false)

const { img } = useCatImage({ fact, wordNumber})

const resetData = () => {
  infiniteScrolling.value = false

  if (catsNumber.value === 1 && wordNumber.value === 1 ) return
  wordNumber.value = 1
  catsNumber.value = 1

  catsNumberValue.value = catsNumber.value
  console.log( catsNumberValue.value);
}

const getCats = async() => {
  await fetchCats()
  catsNumberValue.value = catsNumber.value
}

const scrollObserver = ref<HTMLDivElement | null>(null);


const debounceInterval = 30;
let lastExecution: null | number = null;

const handleScroll = () => {
  
  const distanceToBottom = scrollObserver.value?.getBoundingClientRect().bottom 
  if (!distanceToBottom) return;

  const currentExecution = Date.now();  

  if (lastExecution !=null && currentExecution - lastExecution < debounceInterval) return   

  lastExecution = currentExecution;

  if (distanceToBottom <= window.innerHeight) {    
    catsNumberValue.value += 5;    
  }
}

window.addEventListener('scroll', handleScroll);


let heighItemPX = 120

const adjustHeight = () => {
  if (window.innerWidth <= 390) {
    heighItemPX = 400
  } else {
    heighItemPX = 120;
  }
}

adjustHeight()
window.addEventListener('resize', adjustHeight)


const showItems = (heighItem: number) => {
  const viewportHeight = window.innerHeight

  const header = containerCat.value?.getBoundingClientRect().top ?? 0
  const ITEM_NUMBERS = Math.floor((viewportHeight - header) / heighItem)


  catsNumberValue.value += ITEM_NUMBERS;  
}

watch(infiniteScrolling, (value) => {
  if (value) {    
    showItems(heighItemPX)
  }
})

const containerCat = ref<HTMLDivElement | null>(null);

</script>

<template>

  <main>
      <h1>Gatos</h1>

      <section>
        <InputAddSubs text="Number of cats" 
          v-model="catsNumber"
          />
        <InputAddSubs text="Number of words" 
          v-model="wordNumber"
          :minmax-value="[1]"
          />
      </section>
      
      <section>
        <button 
          :disabled="infiniteScrolling"
          @click="getCats"> Get a cat </button>
        <button style="background-color: rgb(192, 47, 47);" 
          @click="resetData"> Reset </button>
        <button 
          :class="{'selected': infiniteScrolling, 'no-selected': !infiniteScrolling }"
          @click="infiniteScrolling = !infiniteScrolling"> Infinite Scrolling </button>
        <button 
        :class="{'selected': listsVirtualization, 'no-selected': !listsVirtualization }"
          @click="listsVirtualization = !listsVirtualization"> Lists Virtualization </button>
      </section>
      
      <p v-show="fact">{{fact}}</p>

      <div class="cats" ref="containerCat">
        <template v-for="item in catsNumberValue" :key="item">          
          <img 
            class="cats-img"
            v-show="img"
            :src="`${img}${item}`"
            :alt="`Imagen obtained by first word of '${fact}'`"
            :title="`Imagen obtained by first word of '${fact}'`"
            />         
        </template>
      </div>
      <div ref="scrollObserver" style="text-align: center; color: green;"
        class="scroll"
        v-if="infiniteScrolling"
      >    
        <span >
          loading ...
        </span> 
    </div> 

    </main>
</template>

<style scoped>

.scroll {
  margin-bottom: 60px !important;
  display: block;
}
.selected{
  background-color: rgb(242, 211, 37);
  color: #000;
  border: 2px solid rgb(225, 188, 4);
}
.no-selected {
  background-color: transparent;
  border: 2px solid #000;
  color: #a49f9f;
}
.no-selected:hover {
  background-color: rgba(255, 166, 0, 0.119);
}
.cats{
  max-width: 100vw;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-flow: dense;
  justify-items: center; 
  gap: 12px;
  margin: auto;
}
.cats img {
  object-fit: cover;
  width:100%; 
  height: 100%;
  border-radius:20px
}
.cats img:nth-child(odd) {
  grid-row: span 2;
}

section{
  background-color: transparent;
  display: flex;
  justify-content: center;
  gap: 20px ;
  margin: 10px 0 ;
  padding: 10px ;
}
/* 
@media screen and (max-width: 390px) {
  input {
    max-width: 10%;
  }
} */
@media screen and (max-width: 390px) {
  .cats-img  {
    /* margin-bottom: 5px; */
    width: 320px !important; 
    height: 400px !important;
  }
  /* .cats img:nth-child(odd) {
    grid-row: span 2;
  } */
}


</style>
<!-- .cats-img {
  width:  100%; 
    height: 100%;
  border-radius:20px;
  margin-bottom: 5px
}
.selected{
  background-color: rgb(242, 211, 37);
  color: #000;
  border: 2px solid rgb(225, 188, 4);
}
.no-selected {
  background-color: transparent;
  border: 2px solid #000;
  color: #a49f9f;
}
.no-selected:hover {
  background-color: rgba(255, 166, 0, 0.119);
}
.cats{
  max-width: 100vw;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-flow: dense;
  justify-items: center; 
  gap: 12px;
  margin: auto;
}
.cats img {  
  object-fit: cover;
}


section{
  background-color: transparent;
  display: flex;
  justify-content: center;
  gap: 20px ;
  margin: 10px 0 ;
  padding: 10px ;
}

@media screen and (min-width: 390px) {
  .cats-img  {
    margin-bottom: 2px;
    width:  100%; 
    height: 100%;
  }
  .cats img:nth-child(odd) {
    grid-row: span 2;
  }
} -->

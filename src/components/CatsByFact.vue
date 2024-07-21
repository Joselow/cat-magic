<script setup lang="ts">
import { onUnmounted , ref, watch } from 'vue';
import InputAddSubs from './inputAddSubstract.vue';
import { useCatFact } from '@/composables/useCatFact';
import { useCatImage } from '@/composables/useCatImage';
import { highlightWords } from "@/utils/highlightWords"
const { fact, fetchCats, responseValue, loading } = useCatFact()
fetchCats()

const wordNumber = ref(1)
const catsNumber = ref(1)
const catsNumberValue = ref([1])
const infiniteScrolling = ref(false)
const scrollObserver = ref<HTMLDivElement | null>(null);
const containerCat = ref<HTMLDivElement | null>(null);
const paragraph = ref<HTMLParagraphElement | null>(null);

const { img } = useCatImage({ fact, wordNumber})

const highlightColor = '#F1215D'

const resetData = () => {
  infiniteScrolling.value = false
  changeArrayCats(1)
  wordNumber.value = 1
  catsNumber.value = 1
  factHTML.value = highlightWords({ text: fact.value, color: highlightColor, wordNumber: wordNumber.value})
}

const getCats = async() => {
  await fetchCats()
  changeArrayCats(catsNumber.value)
}

const changeArrayCats = (number: number) => catsNumberValue.value = [...Array(number)].map((_, index) => index + 1)
const addToArrayCats = (number: number) => {
  const newLen = number + catsNumberValue.value.length
  catsNumberValue.value = [...Array(newLen)].map((_, index) => index + 1)
}

const debounceInterval = 15;
let lastExecution: null | number = null;

const handleScroll = () => {
  const distanceToBottom = scrollObserver.value?.getBoundingClientRect().bottom 
  if (!distanceToBottom) return;

  const currentExecution = Date.now();  

  if (lastExecution !=null && currentExecution - lastExecution < debounceInterval) return   

  lastExecution = currentExecution;

  if (distanceToBottom <= window.innerHeight) {        
    addToArrayCats(catsNumber.value)
  }
}

window.addEventListener('scroll', handleScroll);

let heighItemPX = 90

const adjustHeight = () => {
  if (window.innerWidth <= 390) {
    heighItemPX = 400
  } else {
    heighItemPX = 90;
  }
}

adjustHeight()

const showItems = (heighItem: number) => {
  const viewportHeight = window.innerHeight

  const header = containerCat.value?.getBoundingClientRect().top ?? 0
  console.log(header,  window.innerHeight);

  const ITEM_NUMBERS = Math.floor((viewportHeight - header) / heighItem)  
  addToArrayCats( ITEM_NUMBERS)
}

watch(infiniteScrolling, (value) => {
  if (value) {    
    showItems(heighItemPX)
  }
})

const factHTML = ref('')

watch(fact, (value) => {
  if (value) {
    factHTML.value = highlightWords({ text: value, color: highlightColor, wordNumber: wordNumber.value})
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

</script>

<template>

  <!-- <span v-show="loading">loading ... </span> -->
  <span class="msg" 
    v-if="responseValue.success === false"
  > {{ responseValue.msg }} </span>

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
      @click="getCats"> Get cats </button>
    <button 
      :class="{'selected': infiniteScrolling, 'no-selected': !infiniteScrolling }"
      @click="infiniteScrolling = !infiniteScrolling"> Infinite Scrolling </button>        
    <button style="background-color: rgb(192, 47, 47);" 
        @click="resetData"> Reset </button>
  </section>

  <p ref="paragraph" v-html="factHTML">  </p>

  <div style="text-align: center;">
    <span v-show="loading" style="color: rgb(226, 110, 43);">loading ... </span>
  </div>

  <div class="cats" ref="containerCat"
    v-show="!loading"
  >
        <template v-for="item in catsNumberValue" :key="item">          
          <img 
            class="cats-img"
            v-if="img"
            :src="`${img} ${item}`"
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

</template>

<style scoped>
.msg {
  background-color: aqua;
  text-align: center;
  padding: 10px 60px;
  border-radius: 20px;
  color: #221;
  font-weight: bolder;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);    
}

p {
  padding: 0 30px;
  text-align: starts;
  margin: auto;
}

.scroll {
  margin-bottom: 60px !important;
  display: block;
}
.cats{
  max-width: 100vw;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-flow: dense;
  justify-items: center; 
  gap: 12px;
  max-width: 60vw;
/* margin-top: 10px; */
  margin: 13px auto 0;

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

@media screen and (max-width: 390px) {
  .cats-img  {
    width: 320px !important; 
    height: 400px !important;
  }
  .msg {
    width: 90%;
    padding: 3px 60px;
  }

}
</style>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import CatsByFact from "./components/CatsByFact.vue"
import CatsImages from '@/components/CatsImages.vue'
import { useScrollToTop } from "@/composables/useScrollToTop.js"

const { scrollToTop, showScrollButton } = useScrollToTop()
const OPTIONS = {
  OPTION_ONE: 'optionOne',
  OPTION_TWO: 'optionTwo',
}

// const optionOne = ref(localStorage.getItem('option') === OPTIONS.OPTION_ONE)
// const optionTwo = ref(localStorage.getItem('option') === OPTIONS.OPTION_TWO)

const optionOne = ref(true)
const optionTwo = ref(false)

onBeforeMount(() => {
  optionOne.value = localStorage.getItem('option') === OPTIONS.OPTION_ONE
  optionTwo.value = localStorage.getItem('option') === OPTIONS.OPTION_TWO
  if (!optionOne.value && optionTwo.value) {
    optionOne.value = true
  }
})

const selectOption = (option: 'optionOne' | 'optionTwo') => {
  if (option === OPTIONS.OPTION_ONE) {
    optionOne.value = true
    optionTwo.value = false
    window.localStorage.setItem('option', OPTIONS.OPTION_ONE)
  }
  else {
    optionTwo.value = true
    optionOne.value = false
    window.localStorage.setItem('option', OPTIONS.OPTION_TWO)
  }
}
const optionOneClass = computed(() => optionOne.value ? 'option1-selected' : 'option1')
const optionTwoClass = computed(() => optionTwo.value ? 'option2-selected' : 'option2')

const componenetSelected = computed(() => {
  if (optionOne.value) return CatsByFact
  if (optionTwo.value) return CatsImages
  return null
})

</script>

<template>
  <header>
    <h1>Cats</h1>
  </header>
  <section class="options">
    <button :class="optionOneClass"
      title="obtaind images acording words"
      @click="selectOption('optionOne')"
    > Get images by fact </button>
    <button :class="optionTwoClass"
      title="this has infinite scrolling and list virtualization"
      @click="selectOption('optionTwo')"
    > Images</button>
  </section>

  <main>
    <component :is="componenetSelected"></component>
  </main>
  <button 
    class="toTopButton"    
    v-if="showScrollButton" @click="scrollToTop">↑</button>

</template>

<style scoped>
.options {
  flex-wrap: nowrap;
}
.options button {
  /* border-radius: 6px; */
  /* border: 1px solid transparent; */
  padding: 0.4em 4em; 
  /* font-size: 0.8em;  */
}
.option1-selected {
  background-color: rgb(65, 38, 218);
}
.option2-selected{
  background-color: rgb(29, 112, 229);
}
.option1 {
  background-color: transparent;
  border: 1px solid rgb(65, 38, 218);
}
.option2 {
  background-color: transparent;
  border: 1px solid rgb(29, 112, 229);
}
@media screen and (max-width: 390px) {
  .options button {
    width: 100%;
    padding: 0.2em ; 
    margin: 0;
  }
  .options {
    width: 95%;
    gap: 5px;
    margin: auto;
  }
}
</style> 

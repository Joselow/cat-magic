<script setup lang="ts">
import { ref, computed } from 'vue'
import CatsByFact from "./components/CatsByFact.vue"
import CatsImages from '@/components/CatsImages.vue'

const optionOne = ref(false)
const optionTwo = ref(false)

const selectOption = (option: 'optionOne' | 'optionTwo') => {
  if (option === 'optionOne') {
    optionOne.value = !optionOne.value
    optionTwo.value = false
  }
  else {
    optionTwo.value = !optionTwo.value
    optionOne.value = false
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
  <section>
    <button :class="optionOneClass"
      @click="selectOption('optionOne')"
    > Get images by fact </button>
    <button :class="optionTwoClass"
      @click="selectOption('optionTwo')"
    > Images </button>
  </section>

  <main>
    <component :is="componenetSelected"></component>
  </main>
</template>

<style scoped>
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
</style> 

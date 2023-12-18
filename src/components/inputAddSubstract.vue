<script setup lang="ts">
import {  computed, ref } from 'vue';

interface Props {
  text: string
  addValue?: number
  substractValue?: number
  value?: number
  minmaxValue?: number[]
  modelValue: number | ''
}

const props = withDefaults(defineProps<Props>(), {
  value: 1,
  minmaxValue: () => [0]
});

const emits = defineEmits<{
  '@enter': [value: number | string]
  'update:modelValue': [value: number | string]
}>()

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})

const eventEnter = ($e: KeyboardEvent) => {
  const inputElement = $e.target as HTMLInputElement;

  if (inputElement && inputElement.value) {
    emits('@enter', inputElement.value);
  }}


const addValue = computed(()=>props.addValue ?? props.value)
const substractValue = computed(()=>props.substractValue ?? props.value)

const substract = () => {
  
  if (props.minmaxValue) {
  

    if ((inputValue.value as number - substractValue.value) < props.minmaxValue[0] ) {
      inputValue.value = props.minmaxValue[0]
      return
    } 
    if (props.minmaxValue.length > 0) {
      if (inputValue.value as number <= props.minmaxValue[0]) return
    }
  }
  inputValue.value = inputValue.value as number - substractValue.value
}

const add = () => {
  if (props.minmaxValue && props.minmaxValue[1]) {
    if ((inputValue.value as number + addValue.value) > props.minmaxValue[1]) {
      inputValue.value = props.minmaxValue[1]
      return
    }
    if (props.minmaxValue[1]) {
      if (inputValue.value as number>= props.minmaxValue[1]) return
    }
  }
  inputValue.value = Number(inputValue.value) + Number(addValue.value);
}
const owo = ref(false)

</script>

<template>
    <h3 v-if="owo">wn</h3>
  <button id="test" @click="owo = !owo">a</button>
  <div style="text-align: center;">
    <label for=""> {{text}} </label>
      <div>
        <button @click="substract" data-test="btn-substract">-</button>
        <input 
          type="number"
          v-model="inputValue"
          @keyup.enter="eventEnter"
        >    
        <button @click="add" id="a" data-test="btnAdd">+</button>
      </div>
  </div>
</template>

<style scoped>
input{
  max-width: 50%;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.3em 1em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
  margin: 0 5px;
}

@media screen and (max-width: 390px) {
  input {
    max-width: 60%;
  }
}
</style>
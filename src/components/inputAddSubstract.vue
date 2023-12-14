<script setup lang="ts">
import {  computed } from 'vue';

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
  '@enter': [value: number]
  'update:modelValue': [value: number]
}>()

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})

const eventEnter = ($e) => emits('@enter', $e.target.value)


const addValue = computed(()=>props.addValue ?? props.value)
const substractValue = computed(()=>props.substractValue ?? props.value)

const substract = () => {
  
  if (props.minmaxValue) {
    if ((inputValue.value - substractValue.value) < props.minmaxValue[0] ) {
      inputValue.value = props.minmaxValue[0]
      return
    } 
    if (props.minmaxValue.length > 0) {
      if (inputValue.value <= props.minmaxValue[0]) return
    }
  }
  inputValue.value -= substractValue.value
}

const add = () => {
  if (props.minmaxValue) {
    if ((inputValue.value + addValue.value) > props.minmaxValue[1]) {
      inputValue.value = props.minmaxValue[1]
      return
    }
    if (props.minmaxValue[1]) {
      if (inputValue.value >= props.minmaxValue[1]) return
    }
  }
  inputValue.value +=  addValue.value  
}

</script>

<template>
   <div>
      <label for=""> {{text}} </label>
        <div>
          <button @click="substract">-</button>
          <input 
            type="number"
            v-model="inputValue"
            @keyup.enter="eventEnter"
          >    
          <button @click="add">+</button>
        </div>
    </div>
</template>

<style scoped>
input{
  /* max-width: 100px; */
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
    max-width: 10%;
  }
}
</style>
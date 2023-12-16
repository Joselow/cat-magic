import { ref, watch, type Ref} from "vue"
const IMAGE_CAT_ENPOINT = 'https://cataas.com/cat/says/'

export function useCatImage({ fact, wordNumber = ref(1) }: {fact:Ref<string>, wordNumber?: Ref<number>}){
  const img = ref('')
  
  watch(fact, () => {        
    if(!fact.value) return    
    
    const firstWordFact = fact.value.split(' ', wordNumber.value).join(' ')        
    img.value = `${IMAGE_CAT_ENPOINT}${firstWordFact}`
  },
    { immediate: true  }
  )

  return { img }
}

import { fetchRamdomFacts } from "../services/fetchHecho.js"
import { ref, type Ref } from "vue"

export function useCatFact()  {  
  const fact: Ref<string> = ref('')

  const fetchCats = async() => {
      const factValue = await fetchRamdomFacts()
    fact.value = factValue
  }

  fetchCats()

  return {
    fetchCats,
    fact
  }
}
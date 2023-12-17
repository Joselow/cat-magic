
import { fetchRamdomFacts } from "../services/fetchHecho.js"
import { ref, type Ref, reactive } from "vue"

export function useCatFact()  {  
  const fact: Ref<string> = ref('')
  const loading = ref(false)
  const responseValue: {msg: string , success: boolean | undefined} = reactive({
    msg: '',
    success: undefined 
  })

  const fetchCats = async() => {
    loading.value = true
    const { data, message, success } = await fetchRamdomFacts()
    loading.value = false

    if (data) fact.value = data
    if (success) responseValue.success = success
    responseValue.msg = message
  }

  // fetchCats()

  return {
    fetchCats,
    fact,
    responseValue,
    loading
  }
}
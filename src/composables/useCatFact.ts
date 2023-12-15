
import { fetchRamdomFacts } from "../services/fetchHecho.js"
import { ref, type Ref, reactive } from "vue"

export function useCatFact()  {  
  const fact: Ref<string> = ref('')
  const loading = ref(false)
  const responseValue = reactive({
    msg: '',
    success: false
  })

  const fetchCats = async() => {
    loading.value = true
    const { data, message, success } = await fetchRamdomFacts()
    loading.value = false

    if (data) fact.value = data
    responseValue.msg = message
    responseValue.success = success
  }

  // fetchCats()

  return {
    fetchCats,
    fact,
    responseValue,
    loading
  }
}
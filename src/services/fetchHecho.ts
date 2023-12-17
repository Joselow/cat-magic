const CAT_ENPOINT_FACT = 'https://catfact.ninja/fact'
type response = {
  success: boolean | undefined,
  data: string | undefined,
  message: string
}

export const fetchRamdomFacts = async(): Promise<response> => {
  let response;
  
  try {
    response = await fetch(CAT_ENPOINT_FACT)
    
    if (!response.ok) {
      throw new Error('something is wrong ')
    }

  } catch (error:any) {
    return { success: false, data: undefined, message: error.message }
  }

  const data = await response.json()
  const { fact } = data;
  return { success: true, data: fact, message: 'fact obtained' }
}
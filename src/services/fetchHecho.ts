const CAT_ENPOINT_FACT = 'https://catfact.ninja/fact'

export const fetchRamdomFacts = async(): Promise<string> => {
    const response = await fetch(CAT_ENPOINT_FACT)
    const data = await response.json()
    const { fact } = data;
    return fact
}
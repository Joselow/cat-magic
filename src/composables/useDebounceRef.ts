import { customRef  } from 'vue'

export function useDebounceRef ( value: any, delay = 300 ) {
  return customRef((track, trigger) => {
    let timeout: number

    return {
      get(){
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(()=> {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}
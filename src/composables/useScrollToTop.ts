import { ref, onUnmounted } from 'vue'

export function useScrollToTop (target: Window | Element = window, scrolled: number = 20) {
  const showScrollButton = ref(false)
  
  const handleScroll = () => {
    if ('scrollTop' in target) {
      showScrollButton.value = target.scrollTop > scrolled;
    } else if (target === window){
      showScrollButton.value = target.scrollY > scrolled;
    }
  }
  target.addEventListener("scroll", handleScroll );

  const scrollToTop = () => {
    target.scrollTo({ top: 0, behavior: 'smooth' });
  };
  onUnmounted(() => {    
    target.removeEventListener('scroll', handleScroll)
  })

  return {
    scrollToTop, showScrollButton
  }
}
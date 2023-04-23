import { onMounted, onUnmounted } from 'vue'

type CallbackFunction = (width: number, height: number) => void

export function useResize(callback: CallbackFunction): void {
  const handleResize = () => {
    callback(window.innerWidth, window.innerHeight)
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
}

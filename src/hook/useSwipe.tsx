import { computed, onMounted, onUnmounted, ref, Ref } from "vue"

type point ={
  x:number,
  y:number
}
interface Options {
  beforeStart?:(e:TouchEvent) => void
  afterStart?:(e:TouchEvent) => void
  beforeMove?:(e:TouchEvent) => void
  afterMove?:(e:TouchEvent) => void
  beforeEnd?:(e:TouchEvent) => void
  afterEnd?:(e:TouchEvent) => void
}

export const useSwipe = (element:Ref<HTMLElement | undefined>, Options?:Options) => {
  const start = ref<point>()
  const end = ref<point>()
  const swiping = ref(false)
  const distance = computed(()=>{
    if(!start.value || !end.value){
      return null
    }
    return {
      x:end.value.x - start.value.x,
      y:end.value.y - start.value.y
    }
  })
  const direction = computed (()=>{
    if(!distance.value){
      return ''
    }
    const {x,y} = distance.value
    if(Math.abs(x) > Math.abs(y)){
      return x > 0 ? 'right':'left'
    }else{
      return y > 0 ? 'down' : 'up'
    }
  })
  const onStart = (e:TouchEvent) => {
    Options?.beforeStart?.(e)
    swiping.value = true
    end.value = start.value = {
      x:e.touches[0].screenX,
      y:e.touches[0].screenY
    }
    Options?.afterEnd?.(e)
  }
  const onMove = (e:TouchEvent) => {
    Options?.beforeStart?.(e)
    if(!start.value){
      return
    }
    end.value = {
      x:e.touches[0].screenX,
      y:e.touches[0].screenY
    }
    Options?.afterEnd?.(e)
  }
  const onEnd = (e:TouchEvent) =>{
    Options?.beforeStart?.(e)
    swiping.value = false
    Options?.afterEnd?.(e)
  }
  onMounted(()=>{
    if(!element.value){
      return
    }
    element.value.addEventListener('touchstart',onStart)
    element.value.addEventListener('touchmove',onMove)
    element.value.addEventListener('touchend',onEnd)
  })
  onUnmounted(()=>{
    if(!element.value){
      return
    }
    element.value.addEventListener('touchstart',onStart)
    element.value.addEventListener('touchmove',onMove)
    element.value.addEventListener('touchend',onEnd)
  })
  return {
    swiping,
    direction,
    distance,
  }
}
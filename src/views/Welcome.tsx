import { defineComponent, ref, Transition, VNode, watchEffect } from 'vue';
import { RouteLocationNormalizedLoaded, RouterView, useRoute, useRouter } from 'vue-router';
import s from './Welcome.module.scss'
import { useSwipe } from '../hook/useSwipe';
import { throttle } from '../hook/throttle';

const pushMap:Record<string,string> = {
  'Welcome1': '/welcome/2',
  'Welcome2': '/welcome/3',
  'Welcome3': '/welcome/4',
  'Welcome4': '/items',
}
export const welcome = defineComponent({
  setup: (props, context) => {
    const main = ref<HTMLElement>()
    const { direction,swiping } = useSwipe(main,{
      beforeStart:e => e.preventDefault()
    })
    const router = useRouter()
    const route = useRoute()
    
    const push = throttle(()=>{
      //RouteRecordName有可能是string有可能是symbol
      const name = (route.name || 'Welcome1').toString()
      router.push(pushMap[name])
    },500)
    watchEffect(()=>{
      // console.log(swiping.value,direction.value);
      if(direction.value === "left"){
        push()
      }
    })
    return () => 
    <div class={s.wrapper}>
      <header>
        <svg class={s.logo}>
          <use xlinkHref='#blueberries'></use>
        </svg>
        <h1>蓝莓账本</h1>
      </header>
      <main class={s.main} ref={main}>
        <RouterView name="main">
          {({ Component: X, route: R }: { Component: VNode, route: RouteLocationNormalizedLoaded }) =>
            <Transition 
              enterFromClass={s.slide_fade_enter_from} 
              enterActiveClass={s.slide_fade_enter_active}
              leaveToClass={s.slide_fade_leave_to} 
              leaveActiveClass={s.slide_fade_leave_active}>
              {X}
            </Transition>
          }
        </RouterView>
      </main>
      <footer>
        <RouterView name="footer" />
      </footer>
    </div>
  }
})
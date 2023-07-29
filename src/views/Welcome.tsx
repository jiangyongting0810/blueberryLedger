import { defineComponent, ref, Transition, VNode, watch, watchEffect } from 'vue';
import { RouteLocationNormalizedLoaded, routerKey, RouterView, useRoute, useRouter } from 'vue-router';
import s from './Welcome.module.scss'
import blueberries from '../assets/icons/blueberries.svg'
import { useSwipe } from '../hook/useSwipe';
import { throttle } from '../hook/throttle';

export const welcome = defineComponent({
  setup: (props, context) => {
    const main = ref<HTMLElement>()
    const { direction,swiping } = useSwipe(main,{
      beforeStart:e => e.preventDefault()
    })
    const router = useRouter()
    const route = useRoute()
    // const 
    const push = throttle(()=>{
      if(route.name === 'Welcome1'){
        router.push('/welcome/2')
      }else if (route.name === 'Welcome2') {
        router.push('/welcome/3')
      }else if (route.name === 'Welcome3') {
        router.push('/welcome/4')
      }else if (route.name === 'Welcome4') {
        router.push('/start')
      }
    },500)
    watchEffect(()=>{
      console.log(swiping.value,direction.value);
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
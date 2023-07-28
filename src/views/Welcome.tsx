import { defineComponent, ref, Transition, VNode, watch, watchEffect } from 'vue';
import { RouteLocationNormalizedLoaded, RouterView } from 'vue-router';
import s from './Welcome.module.scss'
import blueberries from '../assets/icons/blueberries.svg'
import { useSwipe } from '../hook/useSwipe';

export const welcome = defineComponent({
  setup: (props, context) => {
    const main = ref<HTMLElement | null>(null)
    const { direction,swiping } = useSwipe(main)
    watchEffect(()=>{
      console.log(swiping.value,direction.value);
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
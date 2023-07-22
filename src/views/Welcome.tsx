import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import s from './Welcome.module.scss'
import logo from '../assets/icons/blueberries.svg'

export const welcome = defineComponent({
  setup: (props, context) => {
    return () => 
    <div class={s.wrapper}>
      <header>
        <img src={logo}/>
        <h1>蓝莓账本</h1>
      </header>
      <main>
        <RouterView/>
      </main>
    </div>
  }
})
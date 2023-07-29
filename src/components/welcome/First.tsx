import { FunctionalComponent, ref, watchEffect } from 'vue';
import { useSwipe } from '../../hook/useSwipe';
import s from './welcome.module.scss'

export const First:FunctionalComponent=()=>{
  return <div class={s.card}>
    <svg>
      <use xlinkHref='#intelliBooks'></use>
    </svg>
    <h2>智能记账<br/>财务轻松掌握</h2>,
  </div>
}
First.displayName = 'First'
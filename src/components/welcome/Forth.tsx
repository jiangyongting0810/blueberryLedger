import { defineComponent } from 'vue';
import s from './First.module.scss'
import worryLess from '../../assets/icons/worryLess.svg'
import { RouterLink } from 'vue-router';

export const Forth = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img class={s.icon} src={worryLess}/>
          <h2>省心记账<br/>轻松理财规划</h2>
        </div>
        <div class={s.actions}>
          <RouterLink class={s.fake} to="/start">跳过</RouterLink>
          <RouterLink class={s.next} to="/welcome/2">完成</RouterLink>
          <RouterLink class={s.fake} to="/start">跳过</RouterLink>
        </div>
      </div>
    )
  }
})
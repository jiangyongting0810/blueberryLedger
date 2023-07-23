import { defineComponent } from 'vue';
import s from './First.module.scss'
import intelliBooks from '../../assets/icons/intelliBooks.svg'
import { RouterLink } from 'vue-router';

export const First = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img class={s.icon} src={intelliBooks}/>
          <h2>智能记账<br/>财务轻松掌握</h2>
        </div>
        <div class={s.actions}>
          <RouterLink class={s.fake} to="/start">跳过</RouterLink>
          <RouterLink class={s.next} to="/welcome/2">下一页</RouterLink>
          <RouterLink to="/start">跳过</RouterLink>
        </div>
      </div>
    )
  }
})
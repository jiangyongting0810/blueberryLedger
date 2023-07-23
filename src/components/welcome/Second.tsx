import { defineComponent } from 'vue';
import s from './First.module.scss'
import easyBooks from '../../assets/icons/easyBooks.svg'
import { RouterLink } from 'vue-router';

export const Second = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img class={s.icon} src={easyBooks}/>
          <h2>简单易用<br/>收支一目了然</h2>
        </div>
        <div class={s.actions}>
          <RouterLink class={s.fake} to="/start">跳过</RouterLink>
          <RouterLink class={s.next} to="/welcome/3">下一页</RouterLink>
          <RouterLink to="/start">跳过</RouterLink>
        </div>
      </div>
    )
  }
})
import { defineComponent } from 'vue';
import s from './First.module.scss'
import onTheGo from '../../assets/icons/onTheGo.svg'
import { RouterLink } from 'vue-router';

export const Third = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img class={s.icon} src={onTheGo}/>
          <h2>随时随地<br/>理财得心应手</h2>
        </div>
        <div class={s.actions}>
          <RouterLink class={s.fake} to="/start">跳过</RouterLink>
          <RouterLink class={s.next} to="/welcome/4">下一页</RouterLink>
          <RouterLink to="/start">跳过</RouterLink>
        </div>
      </div>
    )
  }
})
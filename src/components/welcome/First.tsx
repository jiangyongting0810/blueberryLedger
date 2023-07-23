import { defineComponent } from 'vue';
import s from './WelcomeLayout.module.scss'
import intelliBooks from '../../assets/icons/intelliBooks.svg'
import {WelcomeLayout} from './WelcomeLayout'
import { RouterLink } from 'vue-router';

export const First = defineComponent({
  setup: (props, context) => {
    const slots = {
      icon:()=><img class={s.icon} src={intelliBooks}/>,
      title:()=><h2>智能记账<br/>财务轻松掌握</h2>,
      buttons:()=><>
        <RouterLink class={s.fake} to="/start">跳过</RouterLink>
        <RouterLink class={s.next} to="/welcome/2">下一页</RouterLink>
        <RouterLink to="/start">跳过</RouterLink>
      </>
    }
    return () => (
      <WelcomeLayout v-slots={slots}></WelcomeLayout>
    )
  }
})
import { defineComponent } from 'vue';
import s from './WelcomeLayout.module.scss'
import worryLess from '../../assets/icons/worryLess.svg'
import { RouterLink } from 'vue-router';
import { WelcomeLayout } from './WelcomeLayout';

export const Forth = defineComponent({
  setup: (props, context) => {
    return () => (
      <WelcomeLayout>
        {{
          icon:() => <img class={s.icon} src={worryLess}/>,
          title: () => <h2>省心记账<br/>轻松理财规划</h2>,
          buttons: () => <>
            <RouterLink class={s.fake} to="/start">跳过</RouterLink>
            <RouterLink class={s.next} to="/welcome/2">完成</RouterLink>
            <RouterLink class={s.fake} to="/start">跳过</RouterLink>
          </>
        }}
      </WelcomeLayout>
    )
  }
})

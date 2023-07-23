import { defineComponent } from 'vue';
import s from './WelcomeLayout.module.scss'
import easyBooks from '../../assets/icons/easyBooks.svg'
import { RouterLink } from 'vue-router';
import { WelcomeLayout } from './WelcomeLayout';

export const Second = defineComponent({
  setup: (props, context) => {
    return () => (
      <WelcomeLayout>
        {{
          icon:() => <img class={s.icon} src={easyBooks}/>,
          title: () => <h2>简单易用<br/>收支一目了然</h2>,
          buttons: () => <>
            <RouterLink class={s.fake} to="/start">跳过</RouterLink>
            <RouterLink class={s.next} to="/welcome/3">下一页</RouterLink>
            <RouterLink to="/start">跳过</RouterLink>
          </>
        }}
      </WelcomeLayout>
    )
  }
})


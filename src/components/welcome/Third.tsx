import { defineComponent } from 'vue';
import s from './WelcomeLayout.module.scss'
import onTheGo from '../../assets/icons/onTheGo.svg'
import { RouterLink } from 'vue-router';
import { WelcomeLayout } from './WelcomeLayout';

export const Third = () =>(
  <WelcomeLayout>
    {{
      icon:() => <img class={s.icon} src={onTheGo}/>,
      title: () => <h2>随时随地<br/>理财得心应手</h2>,
      buttons: () => <>
        <RouterLink class={s.fake} to="/start">跳过</RouterLink>
        <RouterLink class={s.next} to="/welcome/4">下一页</RouterLink>
        <RouterLink to="/start">跳过</RouterLink>
      </>
    }}
  </WelcomeLayout>
)
Third.displayName = 'Third'
import s from './welcome.module.scss'
import onTheGo from '../../assets/icons/onTheGo.svg'
import { FunctionalComponent } from 'vue'

export const Third:FunctionalComponent = () =>{
  return <div class={s.card}>
      <img class={s.icon} src={onTheGo}/>
      <h2>随时随地<br/>理财得心应手</h2>
    </div>
}

Third.displayName='Third'
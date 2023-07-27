import { FunctionalComponent } from 'vue';
import s from './welcome.module.scss'
import easyBooks from '../../assets/icons/easyBooks.svg'

export const Second:FunctionalComponent=()=>{
  return <div class={s.card}>
    <svg>
      <use xlinkHref='#easyBooks'></use>
    </svg>
    {/* <img class={s.icon} src={easyBooks}/> */}
    <h2>简单易用<br/>收支一目了然</h2>
  </div>
}

Second.displayName='Second'
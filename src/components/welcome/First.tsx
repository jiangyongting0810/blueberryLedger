import { FunctionalComponent } from 'vue';
import s from './welcome.module.scss'
import intelliBooks from '../../assets/icons/intelliBooks.svg'

export const First:FunctionalComponent=()=>{
  return <div class={s.card}>
    <img class={s.icon} src={intelliBooks}/>,
    <h2>智能记账<br/>财务轻松掌握</h2>,
  </div>
}
First.displayName = 'First'
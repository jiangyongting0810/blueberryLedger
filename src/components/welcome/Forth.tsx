import s from './welcome.module.scss'
import worryLess from '../../assets/icons/worryLess.svg'

export const Forth = ()=>{
  return <div class={s.card}>
    <svg>
      <use xlinkHref='#worryLess'></use>
    </svg>
    {/* <img class={s.icon} src={worryLess}/> */}
    <h2>省心记账<br/>轻松理财规划</h2>
  </div>
}
Forth.displayName = 'Forth'
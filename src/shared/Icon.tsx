import { defineComponent, PropType } from 'vue';
import s from './Icon.module.scss';

export type IconName = 'add'| 'blueberries' | 'easyBooks' 
| 'intelliBooks' |'onTheGo'| 'worryLess' | 'record' | 'menu'
| 'charts' | 'notify' | 'export'| 'left' | 'date'
export const Icon = defineComponent({
  props:{
    name:{
      type:String as PropType<IconName>,
      required:true,
    },
    onClick:{
      type:Function as PropType<(e:MouseEvent) => void>
    }
  },
  setup: (props, context) => {
     return () => (
      <svg class={s.icon} onClick={props.onClick}>
        <use xlinkHref={"#"+props.name}></use>
      </svg>
     )
  }
})
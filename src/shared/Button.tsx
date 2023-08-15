import { defineComponent, PropType } from 'vue';
import s from './Button.module.scss'

// interface Props{
//   onClick?:(e:MouseEvent)=>void
// }

export const Button = defineComponent({
  props:{
    onClick:{
      type:Function as PropType<(e:MouseEvent)=>void>
    },
    level:{
      type:String as PropType<"important"| "danger" | "normal">,
      //默认的为default
      default:"normal"
    }
  },
  setup: (props, context) => {
     return () => (
       <button class={[s.button,s[props.level]]}>
        {context.slots.default?.()}
       </button>
     )
  }
})
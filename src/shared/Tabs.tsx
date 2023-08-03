import { defineComponent, PropType } from 'vue';
import s from './Tabs.module.scss';
export const Tabs = defineComponent({
  props: {
    selected: {
      type: String as PropType<string>,
      required:false
    },
    onUpdateSelected:{
      type: Function as PropType<(name:string) => void>,
      required:false
    }
  },
  setup: (props, context) => {
    return ()=>{
        //如果是多个元素应该是个数组
      const array = context.slots.default?.()
      if(!array) return ()=> null
      for(let i = 0;i<array.length;i++){
        if(array[i].type !== Tab){
          throw new Error('<Tabs>仅接受<Tab>')
        }
      }
      return (
        <div class={s.Tabs}>
          <ol class={s.tabs_nav}>
            {array.map(item=>
              <li class={item.props?.name === props.selected ? s.selected : ''}
                  // onClick={()=>props.onUpdateSelected?.(item.props?.name)}
                  onClick={()=>context.emit('update:selected',item.props?.name)}
              >
                {item.props?.name}
              </li>)
            }
          </ol>
        </div>
      )
    }
  }
})

export const Tab = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div>
        {context.slots.default?.()}
      </div>
    )
  }
})
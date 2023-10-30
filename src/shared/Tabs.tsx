import { defineComponent, PropType } from 'vue';
import s from './Tabs.module.scss';
export const Tabs = defineComponent({
  props: {
    classPrefix:{
      type:String
    },
    selected: {
      type: String as PropType<string>,
      required:false
    },
    rerenderOnSelect: {
      type:Boolean as PropType<boolean>,
      required:true
    }
  },
  emits:['update:selected'],
  setup: (props, context) => {
    return ()=>{
        //如果是多个元素应该是个数组
      const tabs = context.slots.default?.()
      console.log(tabs);
      if(!tabs) return ()=> null
      for(let i = 0;i<tabs.length;i++){
        if(tabs[i].type !== Tab){
          throw new Error('<Tabs>仅接受<Tab>')
        }
      }
      const cp = props.classPrefix
      return (
        <div class={[s.Tabs,cp+'_tabs']}>
          <ol class={[s.tabs_nav, cp + '_tabs_nav']}>
            {tabs.map(item=>
              <li class={[
                item.props?.name === props.selected ? [s.selected,cp+'_selected'] : '',
                cp + '_tabs_nav_item'
              ]}
                  // onClick={()=>props.onUpdateSelected?.(item.props?.name)}
                  onClick={()=>{
                    context.emit('update:selected',item.props?.name)
                    console.log('Tabs的事件被触发')
                  }
                }
              >
                {item.props?.name}
              </li>)
            }
          </ol>
          {props.rerenderOnSelect ? 
            <div key={props.selected}>
              {tabs.find(item => item.props?.name === props.selected)}
            </div> :
            <div>
              {tabs.map(item =>
                <div v-show={item.props?.name === props.selected}>{item}</div>
              )}
            </div>
          }
          
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
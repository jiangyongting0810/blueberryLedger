import { defineComponent } from 'vue';
import { Button } from '../shared/Button';
import { Center } from '../shared/Center';
import { FloatButton } from '../shared/FloatButton';
import { Icon } from '../shared/Icon';
import s from './StartPage.module.scss'
export const StartPage = defineComponent({
  setup: (props, context) => {
    const onClick = ()=>{
      console.log("hi");
    }
     return () => (
      <div>
        <nav>menu</nav>
        <Center class={s.record_wrapper}>
          <Icon name='record' class={s.record}/>
        </Center>
        <div class={s.button_wrapper}>
          <Button class={s.button} onClick={onClick}>
          测试
          </Button>
          <FloatButton iconName='add'/>
        </div>
      </div>
     )
  }
})
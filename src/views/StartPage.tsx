import { defineComponent, ref } from 'vue';
import { Button } from '../shared/Button';
import { Center } from '../shared/Center';
import { FloatButton } from '../shared/FloatButton';
import { Icon } from '../shared/Icon';
import { Navbar } from '../shared/Navbar';
import { Overlay } from './Overlay';
import s from './StartPage.module.scss'
export const StartPage = defineComponent({
  setup: (props, context) => {
    const onClick = ()=>{
      console.log("hi");
    }
    const refOverlayVisible = ref(false)
    const onClickMenu =() =>{
      refOverlayVisible.value = !refOverlayVisible.value
      console.log(refOverlayVisible.value);
    }
     return () => (
      <div>
        <Navbar>
          {{
            title:()=>"蓝莓记账",
            icon:()=><Icon name='menu' class={s.navIcon} onClick={onClickMenu}/>
          }}
        </Navbar>
        <Center class={s.record_wrapper}>
          <Icon name='record' class={s.record}/>
        </Center>
        <div class={s.button_wrapper}>
          <Button class={s.button} onClick={onClick}>
            记一笔
          </Button>
          <FloatButton iconName='add'/>
          {
            refOverlayVisible.value && 
            <Overlay onClose ={()=>refOverlayVisible.value = false}/>
          }
        </div>
      </div>
     )
  }
})
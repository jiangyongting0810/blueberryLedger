import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../shared/Button';
import { Center } from '../shared/Center';
import { FloatButton } from '../shared/FloatButton';
import { Icon } from '../shared/Icon';
import { OverlayIcon } from './Overlay';
import s from './StartPage.module.scss'
export const StartPage = defineComponent({
  setup: (props, context) => {
    const onClick = ()=>{
      console.log("开始记账被点击");
    }
     return () => (
      <div>
        <MainLayout>
          {{
            title:()=>'蓝莓记账',
            icon:()=><OverlayIcon/>,
            default:()=><>
              <Center class={s.record_wrapper}>
              <Icon name='record' class={s.record}/>
              </Center>
              <div class={s.button_wrapper}>
                <RouterLink to='/items/create'>
                  <Button class={s.button} onClick={onClick}>
                    开始记账
                  </Button>
                  <FloatButton iconName='add'/>
                </RouterLink>
              </div>
            </>
          }}
        </MainLayout>
      </div>
     )
  }
})
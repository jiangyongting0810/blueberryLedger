import { defineComponent, PropType } from 'vue';
import { Center } from './Center';
import s from './ComingSoon.module.scss';
import { Icon } from '../shared/Icon';
import { MainLayout } from '../layouts/MainLayout';
import { RouterLink } from 'vue-router';
import { Button } from './Button';
import { FloatButton } from './FloatButton';
import { OverlayIcon } from '../views/Overlay';
export const ComingSoon = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <MainLayout>
        {{
          title:()=>'蓝莓记账',
          icon:()=><OverlayIcon/>,
          default:()=>
          <div>
            <Center class={s.blueberries_wrapper}>
              <Icon name="blueberries" class={s.blueberries} />
            </Center>
            <p class={s.text}>敬请期待</p>
          </div>
        }}
        
      </MainLayout>
    )
  }
})

export default ComingSoon
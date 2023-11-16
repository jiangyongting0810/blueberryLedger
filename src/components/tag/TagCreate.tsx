import { defineComponent, PropType, reactive, toRaw } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { BackIcon } from '../../shared/BackIcon';
import { Rules, validate } from '../../shared/validate';
import { TagForm } from './TagForm';
export const TagCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <MainLayout>
        {{
          title: ()=>'新建标签',
          icon:()=><BackIcon/>,
          default:()=><>
            <TagForm/>
          </>
        }}
      </MainLayout>
    )
  }
})

export default TagCreate
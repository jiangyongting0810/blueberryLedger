import { defineComponent, PropType, reactive, toRaw } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../shared/Button';
import { EmojiSelect } from '../../shared/EmojiSelect';
import { Icon } from '../../shared/Icon';
import { Rules, validate } from '../../shared/validate';
import s from './Tag.module.scss';
import { TagForm } from './TagForm';
export const TagEdit = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const formData = reactive({
      name:'',
      sign:'',
    })
    const errors = reactive<{[k in keyof typeof formData]?:string[]}>({})
    const onSumit = (e:Event) =>{
      console.log(toRaw(formData))
      const rules:Rules<typeof formData> = [
        { key: 'name', type: 'required', message: '必填' },
        { key: 'name', type: 'pattern', regex: /^.{1,4}$/, message: '只能填 1 到 4 个字符' },
        { key: 'sign', type: 'required', message: '必填' },
      ]
      console.log(toRaw(errors));
      Object.assign(errors, {
        name: undefined,
        sign: undefined
      })
      Object.assign(errors, validate(formData, rules))
      console.log(toRaw(errors));
      e.preventDefault()
    }
    return () => (
      <MainLayout>
        {{
          title: ()=>'编辑标签',
          icon:()=><Icon name='left'></Icon>,
          default:()=><>
            <TagForm/>
            <div class={s.actions}>
              <Button level='danger' class={s.removeTags}>删除标签</Button>
              <Button level='danger' class={s.removeTagsAndItems}>删除标签和记账</Button>
            </div>
          </>
        }}
      </MainLayout>
    )
  }
})
import { defineComponent, PropType, reactive, toRaw } from 'vue';
import { Button } from '../../shared/Button';
import { EmojiSelect } from '../../shared/EmojiSelect';
import { Form, FormItem } from '../../shared/Form';
import { Rules, validate } from '../../shared/validate';
import s from './Tag.module.scss';
export const TagForm = defineComponent({
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
      <Form onSubmit={onSumit}>
        <FormItem 
          label='标签名' 
          type='text' 
          v-model={formData.name} 
          error={errors['name']?errors['name'][0]:''}/>
        
      </Form>
    )
  }
})
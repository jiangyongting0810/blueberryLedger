import axios from 'axios';
import { defineComponent, PropType, reactive } from 'vue';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../shared/Button';
import { Form, FormItem } from '../shared/Form';
import { Icon } from '../shared/Icon';
import { validate } from '../shared/validate';
import s from './SignInPage.module.scss';
export const SignInPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const formData = reactive({
      email:'',
      code:''
    })
    const errors = reactive({
      email:[],
      code:[]
    })
    const onSubmit = (e:Event)=>{
      console.log('submit');
      e.preventDefault()
      Object.assign(errors, {
        email: [], code: []
      })
      Object.assign(errors,validate(formData,[
        {key:'email',type:"required",message:'必填'},
        {key:'email',type:"pattern",regex:/.+@.+/,message:'必须是邮箱地址'},
        {key:'code',type:"required",message:'必填'},
      ]))
    }
    const onClickSendValidationCode =async()=>{
      // const response = await axios.post('/api/v1/validation_codes',{email:formData.email})
      // console.log(response);
    }
    return () => (
      <MainLayout>
        {{
          title:()=>"登录",
          icon:()=><Icon name='left'/>,
          default:()=>(
            <div class={s.wrapper}>
              <div class={s.logo}>
                <Icon name='blueberries' />
                <h1 class={s.appName}>蓝莓记账</h1>
                |{formData.email} |
                |{formData.code} |
              </div>
              <Form onSubmit={onSubmit}>
                <FormItem error={errors.email?.[0]} v-model={formData.email} label='邮箱地址' type='text' placeholder='请输入邮箱'/>
                <FormItem 
                  error={errors.code?.[0]} 
                  v-model={formData.code} 
                  label='验证码'  
                  type='validationCode' 
                  onClick={onClickSendValidationCode}
                  placeholder='请输入验证码'/>
                <FormItem>
                  <Button type='submit' class={s.submitButton}>
                    登录
                  </Button>
                </FormItem>
              </Form>
            </div>
          ),
        }}
      </MainLayout>
    )
  }
})
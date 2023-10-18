import { defineComponent, PropType, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { routes } from '../config/routes';
import { useBool } from '../hook/useBool';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../shared/Button';
import { Form, FormItem } from '../shared/Form';
import { http } from '../shared/Http';
import { Icon } from '../shared/Icon';
import { hasError, validate } from '../shared/validate';
import s from './SignInPage.module.scss';
export const SignInPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const { ref:refDisabled,toggle,on:disabled,off:enable } = useBool(false)
    const formData = reactive({
      email:'792304256@qq.com',
      code:''
    })
    const errors = reactive({
      email:[],
      code:[]
    })
    const router = useRouter()
    const route = useRoute()
    const refValidationCode = ref<any>()
    const onSubmit = async (e:Event)=>{
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
      if(!hasError(errors)){
        const response = await http.post<{jwt:string}>('/session',formData)
        console.log(response);
        localStorage.setItem('jwt',response.data.jwt)       
        // router.push("/")
        const returnTo = route.query.return_to?.toString()
        console.log(route.query.return_to);
        router.push(returnTo || '/')
      }
    }
    const onError = (error:any)=>{
      if(error.response.status === 422){
        Object.assign(errors,error.response.data.errors)
      }
      throw error
    }
    const onClickSendValidationCode =async()=>{
      disabled()
      const response = await http.post('/validation_codes', { email: formData.email })
      .catch(onError)
      .finally(enable)
    // 成功
    refValidationCode.value.startCount()
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
                |{formData.code}|
              </div>
              <Form onSubmit={onSubmit}>
                <FormItem 
                  error={errors.email?.[0]} 
                  v-model={formData.email} 
                  label='邮箱地址' 
                  type='text' 
                  placeholder='请输入邮箱'/>
                <FormItem 
                  ref={refValidationCode}
                  error={errors.code?.[0]} 
                  v-model={formData.code} 
                  label='验证码'  
                  type='validationCode' 
                  countFrom={3}
                  onClick={onClickSendValidationCode}
                  placeholder='请输入六位数字'/>
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
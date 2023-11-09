import { AxiosError } from 'axios';
import { Dialog} from 'vant';
import { defineComponent, reactive, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { MainLayout } from '../../layouts/MainLayout';
import { http } from '../../shared/Http';
import { Icon } from '../../shared/Icon';
import { Tab, Tabs } from '../../shared/Tabs';
import { Tags } from './Tags';
import { InputPad } from './InputPad';
import s from './ItemCreate.module.scss';
import { BackIcon } from '../../shared/BackIcon';
import { hasError, Rules, validate } from '../../shared/validate';

export const ItemCreate = defineComponent({
  
  setup: (props, context) => {
    const formData = reactive<Partial<Item>>({
      kind:'expenses',
      tag_ids:[],
      happen_at:new Date().toISOString(),
      amount:0,
    })
    const router = useRouter()
    const onError = (error:AxiosError<ResourceError>) => {
      if(error.response?.status){
        Dialog.alert({
          title:'出错',
          message:Object.values(error.response.data.errors).join('\n')
        })
      }
      throw error
    }
    const errors = reactive<FormErrors<typeof formData>>({
      kind:[],
      tag_ids:[],
      amount:[],
      happen_at:[]
    })
    const onSubmit = async () => {
      Object.assign(errors,{kind:[],tag_ids:[],amount:[],happen_at:[]})
      const rules:Rules<typeof formData> = [
        { key: 'kind', type: 'required', message: '类型必填' },
        { key: 'tag_ids', type: 'required', message: '111必填' },
        { key: 'amount', type: 'required', message: '金额必填' },
        { key: 'amount', type: 'notEqual', value: 0, message: '金额不能1为零' },
        { key: 'happen_at', type: 'required', message: '时间必填' },
      ]
      Object.assign(errors, validate(formData,rules ))
      console.log(errors)
      if(hasError(errors)){
        Dialog.alert({
          title:'出错',
          message:Object.values(errors).filter(i=>i.length > 0).join('\n')
        })
        console.log(111);
        return
      }
      await http.post<Resource<Item>>('/items', formData,{_mock: 'itemCreate',_autoLoading:true}
      ).catch(onError)
      router.push("/items")
    }
    return () => (
      <MainLayout class={s.layout}>{{
        title: () => '记一笔',
        icon: () => <BackIcon/>,
        default: () => <>
          <div class={s.wrapper}>
          {/* {formData.tag_id}|
          {formData.happen_at}|
          {formData.amount}| */}
            <Tabs v-model:selected={formData.kind} class={s.tabs}>
              <Tab value='expenses' name="支出">
                <Tags kind='expenses' v-model:selected={formData.tag_ids![0]}/>
              </Tab>
              <Tab value='income' name="收入">
                <Tags kind='income' v-model:selected={formData.tag_ids![0]}/>
              </Tab>
            </Tabs>
            <div class={s.inputPad_wrapper}>
              <InputPad 
                v-model:happenAt={formData.happen_at} 
                v-model:amount={formData.amount}
                onSubmit={onSubmit}/>
            </div>
          </div>
        </>
      }}</MainLayout>
    )
  }
})
import { AxiosError } from 'axios';
import { Dialog} from 'vant';
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { MainLayout } from '../../layouts/MainLayout';
import { http } from '../../shared/Http';
import { Icon } from '../../shared/Icon';
import { Tab, Tabs } from '../../shared/Tabs';
import { Tags } from './Tags';
import { InputPad } from './InputPad';
import s from './ItemCreate.module.scss';
import { BackIcon } from '../../shared/BackIcon';
export const ItemCreate = defineComponent({
  setup: (props, context) => {
    const formData = reactive({
      kind:'支出',
      tag_id:[],
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
    const onSubmit = async () => {
      await http.post<Resource<Item>>('/items', formData,{_mock: 'itemCreate'}
      ).catch(onError)
      router.push("/items")
    }
    return () => (
      <MainLayout class={s.layout}>{{
        title: () => '记一笔',
        icon: () => <BackIcon/>,
        default: () => <>
          <div class={s.wrapper}>
          {formData.tag_id}|
          {formData.happen_at}|
          {formData.amount}|
            <Tabs v-model:selected={formData.kind} class={s.tabs}>
              <Tab name="支出">
                <Tags kind='expenses' v-model:selected={formData.tag_id[0]}/>
              </Tab>
              <Tab name="收入">
                <Tags kind='income' v-model:selected={formData.tag_id[0]}/>
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
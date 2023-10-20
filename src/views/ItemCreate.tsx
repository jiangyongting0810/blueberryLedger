import { AxiosResponse } from 'axios';
import { defineComponent, onMounted, ref } from 'vue';
import { InputPad } from '../components/item/InputPad';
import { MainLayout } from '../layouts/MainLayout';
import { http } from '../shared/Http';
import { Icon } from '../shared/Icon';
import { Tab, Tabs } from '../shared/Tabs';
import s from './ItemCreate.module.scss';
export const ItemCreate = defineComponent({
  setup: (props, context) => {
    const refKind = ref('支出')
    onMounted(async()=>{
        const response = await http.get<{resources:Tag[]}>('/tags',{
          kind:"expenses",
          _mock:'tagIndex'
        })
        
        refExpensesTags.value = response.data.resources
      }
    )
    const refExpensesTags = ref<Tag[]>([])
    onMounted(async () => {
      const response = await http.get<{ resources: Tag[] }>('/tags', {
        kind: 'income',
        _mock: 'tagIndex'
      })
      refIncomeTags.value = response.data.resources
    })
    const refIncomeTags = ref<Tag[]>([])
    return () =>(
      <MainLayout class={s.layout}>{
        {
          title:()=>'记一笔',
          icon:()=><Icon name='left' class={s.navIcon}/>,
          default: () => <>
          <div class={s.wrapper}>
            <Tabs 
              //直接传值是双向绑定的
              // v-model:selected={refKind.value} 
              selected={refKind.value}
              onUpdate:selected={(name)=>{ refKind.value = name; console.log('事件传递到外部')}}
              class={s.tabs}>
              <Tab name="支出" class={s.tags_wrapper}>
                <div class={s.tag}>
                  <div class={s.sign}>
                    <Icon name="add" class={s.createTag} />
                  </div>
                  <div class={s.name}>
                    新增
                  </div>
                </div>
                {refExpensesTags.value.map(tag =>
                  <div class={[s.tag, s.selected]}>
                    <div class={s.sign}>
                      {tag.sign}
                    </div>
                    <div class={s.name}>
                      {tag.name}
                    </div>
                  </div>
                )}
              </Tab>
              <Tab name="收入" class={s.tags_wrapper}>
                <div class={s.tag}>
                  <div class={s.sign}>
                    <Icon name="add" class={s.createTag} />
                  </div>
                  <div class={s.name}>
                    新增
                  </div>
                </div>
                {refIncomeTags.value.map(tag =>
                  <div class={[s.tag, s.selected]}>
                    <div class={s.sign}>
                      {tag.sign}
                    </div>
                    <div class={s.name}>
                      {tag.name}
                    </div>
                  </div>
                )}
              </Tab>
            </Tabs>
            <div class={s.inputPad_wrapper}>
              <InputPad />
            </div>
          </div>
        </>
      }}</MainLayout>
    )
  }
})
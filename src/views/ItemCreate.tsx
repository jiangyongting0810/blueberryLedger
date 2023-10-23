import { defineComponent, ref } from 'vue';
import { InputPad } from '../components/item/InputPad';
import { MainLayout } from '../layouts/MainLayout';
import { Icon } from '../shared/Icon';
import { Tab, Tabs } from '../shared/Tabs';
import s from './ItemCreate.module.scss';
import { Tags } from './Tags';
export const ItemCreate = defineComponent({
  setup: (props, context) => {
    const refKind = ref('支出')
    const refTagId = ref<number>()
    const refHappenAt = ref<string>(new Date().toISOString())
    const refAmount = ref<number>(0)
    return () => (
      <MainLayout class={s.layout}>{{
        title: () => '记一笔',
        icon: () => <Icon name="left" class={s.navIcon} />,
        default: () => <>
          <div class={s.wrapper}>
          {refTagId.value}|
          {refHappenAt.value}|
          {refAmount.value}
            <Tabs v-model:selected={refKind.value} class={s.tabs}>
              <Tab name="支出">
                <Tags kind='expenses' v-model:selected={refTagId.value}/>
              </Tab>
              <Tab name="收入">
                <Tags kind='income' v-model:selected={refTagId.value}/>
              </Tab>
            </Tabs>
            <div class={s.inputPad_wrapper}>
              <InputPad 
                v-model:happenAt={refHappenAt.value} 
                v-model:amount={refAmount.value}/>
            </div>
          </div>
        </>
      }}</MainLayout>
    )
  }
})
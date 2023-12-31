import { defineComponent, PropType } from 'vue';
import { TimeTabsLayout } from '../../layouts/TimeTabsLayout';
import { ItemSummary } from './ItemSummary';
export const ItemList = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    
    return () => (
      <TimeTabsLayout component={ItemSummary}/>
    )
  }
})
import { computed, defineComponent, onMounted, PropType, reactive, ref } from 'vue';
import { FormItem } from '../../shared/Form';
import s from './Charts.module.scss';
import * as echarts from 'echarts';
export const Charts = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: true
    },
    endDate:{
      type: String as PropType<string>,
      required:true
    }
  },
  setup: (props, context) => {
    const category = ref('expenses')
    const refdiv1 = ref<HTMLDivElement>() 
    const refdiv2 = ref<HTMLDivElement>() 
    const option1 = {
      grid: [
        { left: 0, top: 0, right: 0, bottom: 20 }
      ],
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    };
    const option2 = {
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    const data3 = reactive([
      { tag: { id: 1, name: '房租', sign: 'x' }, amount: 3000 },
      { tag: { id: 2, name: '吃饭', sign: 'x' }, amount: 1000 },
      { tag: { id: 3, name: '娱乐', sign: 'x' }, amount: 900 },
    ])
    const betterDate3 = computed(()=>{
      const total = data3.reduce((sum,item)=>sum + item.amount,0)
      return data3.map(item=>({
        ...item,
        percent:Math.round(item.amount/total * 100) + '%'
      }))
    })
    onMounted(()=>{
      if(refdiv1.value === undefined){
        return
      }
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(refdiv1.value);
      // 绘制图表
      myChart.setOption(option1);
    })
    onMounted(()=>{
      if(refdiv2.value === undefined){
        return
      }
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(refdiv2.value);
      // 绘制图表
      myChart.setOption(option2);
    })
    return () => (
      <div class={s.wrapper}>
        {/* |{category.value}| */}
        <FormItem label='类型' type='select' options={[
          {value:'expenses',text:'支出'},
          {value:'income',text:'收入'}
        ]} v-model={category.value}/>
        <div ref={refdiv1} class={s.demo}></div>
        <div ref={refdiv2} class={s.demo2}></div>
        <div class={s.demo3}>
          {betterDate3.value.map(({tag,amount,percent})=>{
            return (
              <div class={s.topItem}>
                <div class={s.sign}>
                  {tag.sign}
                </div>
                <div class={s.bar_wrapper}>
                  <div class={s.bar_text}>
                    <span> {tag.name} - {percent} </span>
                    <span> ￥{amount} </span>
                  </div>
                  <div class={s.bar}>
                    <div class={s.bar_inner}></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
})
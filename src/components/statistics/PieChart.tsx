import * as echarts from 'echarts';
import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import { getMoney } from '../../shared/Money';
import s from './PieChart.module.scss';
const defaultOption = {
  tooltip:{
    trigger:'item',
    formatter: (x: {name:string, value:number, percent: number})=>{
      const {name,value,percent} = x
      return `${name}: ￥${getMoney(value)} 占比 ${percent}%`
    }
  },
  grid: [
    { left: 0, top: 0, right: 0, bottom: 0 }
  ],
  series: [
    {
      type: 'pie',
      radius: '70%',
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
export const PieChart = defineComponent({
  props: {
    data: {
      type: Array as PropType<{name:string,value:number}[]>
    }
  },
  setup: (props, context) => {
    const refdiv2 = ref<HTMLDivElement>() 
    let chart:echarts.ECharts |undefined = undefined
    onMounted(()=>{
      if(refdiv2.value === undefined){
        return
      }
      // 基于准备好的dom，初始化echarts实例
      chart = echarts.init(refdiv2.value);
      // 绘制图表
      chart.setOption(defaultOption);
    })
    watch(()=>props.data,()=>{
      chart?.setOption({
        series: [
          {
            data:props.data
          }
        ]
      })
    })
    return () => (
      <div ref={refdiv2} class={s.demo2}></div>
    )
  }
})
import { defineComponent, onMounted, PropType, ref } from 'vue';
import s from './LineChart.module.scss';
import * as echarts from 'echarts';
export const LineChart = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const refdiv1 = ref<HTMLDivElement>() 
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
    onMounted(()=>{
      if(refdiv1.value === undefined){
        return
      }
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(refdiv1.value);
      // 绘制图表
      myChart.setOption(option1);
    })
    return () => (
      <div ref={refdiv1} class={s.demo}></div>
    )
  }
})
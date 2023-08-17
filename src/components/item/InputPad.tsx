import { DatetimePicker ,Popup } from 'vant';
import { defineComponent, PropType, ref } from 'vue';
import { Icon } from '../../shared/Icon';
import { Time } from '../../shared/time';
import s from './InputPad.module.scss';

export const InputPad = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const now = new Date()
    const refDate = ref<Date>(now)
    const appendText = (n:string | number) => {
      const nString = n.toString()
      const dotIndex = refAmount.value.indexOf('.')
      if(refAmount.value.length>=13){
        return
      }
      //如果有小数点，且小数点后长度大于2
      if(dotIndex >= 0 && refAmount.value.length - dotIndex>2){
        return
      }
      //如果输入的为. 
      if(nString === '.'){
        //如果输入的为. 且小数点位置
        if(dotIndex >= 0){
          return
        }
      //如果输入为0
      }else if(nString === "0"){
        //且小数点不存在
        if(dotIndex === -1){
          //输入0则return
          if(refAmount.value === '0'){
            return
          }
        }
      }else{
        //如果最后为0，则为空
        if(refAmount.value === '0'){
          refAmount.value = ''
        }
      }
      refAmount.value += nString
    }
    const buttons = [
      {text: '1', onClick: () => { appendText(1) }},
      { text: '2', onClick: () => { appendText(2) } },
      { text: '3', onClick: () => { appendText(3) } },
      { text: '4', onClick: () => { appendText(4) } },
      { text: '5', onClick: () => { appendText(5) } },
      { text: '6', onClick: () => { appendText(6) } },
      { text: '7', onClick: () => { appendText(7) } },
      { text: '8', onClick: () => { appendText(8) } },
      { text: '9', onClick: () => { appendText(9) } },
      { text: '.', onClick: () => { appendText('.') } },
      { text: '0', onClick: () => { appendText(0) } },
      { text: '清空', onClick: () => { refAmount.value='0' } },
      { text: '提交', onClick: () => { } },
    ]
    const refShowPop = ref(false)
    console.log(new Time(refDate.value).format())
    const showDatePicker = () =>refShowPop.value = true
    const hideDatePicker = () =>refShowPop.value = false
    const setDate = (date:Date)=>{refDate.value = date;hideDatePicker()}
    const refAmount = ref('0')
    return () => (<>
      <div class={s.dateAndAmount}>
        <span class={s.date}>
          <Icon name='date' class={s.icon}/>
          <span>
            <span onClick={showDatePicker}>{new Time(refDate.value).format()}</span>
            <Popup position='bottom' v-model:show={refShowPop.value}>
                <DatetimePicker value={refDate.value} type='date' title="选择年月日"
                  onConfirm={setDate} onCancel={hideDatePicker}/>
            </Popup>
          </span>
        </span>
        <span class={s.amount}>
          {refAmount.value}
        </span>
      </div>
      <div class={s.buttons}>
        {buttons.map(button=>
          <button onClick={button.onClick}>
            {button.text}
          </button>
        )}
      </div>
      </>
    )
  }
})
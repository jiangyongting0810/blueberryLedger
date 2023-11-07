import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

export const SkipFeatures = defineComponent({
  props:{
    name:{
      type:String,
      default:'跳过'
    }
  },
  setup: (props, context) => {
    const onClick = () =>{
      localStorage.setItem('skipFeatures','yes')
    }
    return () => (
      <div onClick={onClick}>
        <RouterLink to="/items">{props.name}</RouterLink>
      </div>
    )
  }
})
import { FunctionalComponent } from "vue";
import { RouterLink } from "vue-router";
import { SkipFeatures } from "../../shared/SkipFeatures";
import s from './welcome.module.scss'

export const ForthActions:FunctionalComponent=()=>{
  return <div class={s.actions}>
    <SkipFeatures class={s.fake} />
      <RouterLink to="/items">完成</RouterLink>
      {/* <SkipFeatures name='完成' /> */}
    <SkipFeatures class={s.fake} />
  </div>
}
ForthActions.displayName='ForthActions'
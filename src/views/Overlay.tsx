import { Dialog } from 'vant';
import { defineComponent, onMounted, PropType, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { Icon } from '../shared/Icon';
import { mePromise } from '../shared/mePromise';
import s from './Overlay.module.scss';
export const Overlay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<()=>void>
    },
  },
  setup: (props, context) => {
    const close = () =>{
      props.onClose?.()
    }
    const route = useRoute()
    const router = useRouter()
    const me = ref<User>()
    onMounted(async ()=>{
      const response = await mePromise
      // console.log(1)
      // console.log(response)
      // console.log(2)
      me.value = response?.data.resource
    })
    const onSignOut =async () => {
      await Dialog.confirm({
        title:'确认',
        message:'确认退出吗？'
      })
      localStorage.removeItem('jwt')
      window.location.reload();
    }

    return () => (
      <>
      <div class={s.mask} onClick={close}></div>
      <div class={s.overlay}>
        <section class={s.currentUser}>
          { me.value ? (<>
          <h2 class={s.email}>{me.value.email}1111111</h2>
          <p onClick={onSignOut}>点击退出</p>
          </>
          ):(
          <RouterLink to={`/sign_in?return_to=${route.fullPath}`}>
            <h2>未登录用户</h2>
            <p>点击这里登录</p>
          </RouterLink>
          )}
          </section>
          <nav>
            <ul class={s.action_list}>
              <li>
                <RouterLink to="/statistics" class={s.action}>
                  <Icon name="charts" class={s.icon} />
                  <span>统计图表</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/export" class={s.action}>
                  <Icon name="export" class={s.icon}/>
                  <span>导出数据</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/notify" class={s.action}>
                  <Icon name="notify" class={s.icon}/>
                  <span>记账提醒</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
      </div>
      </>
    )
  }
})

export const OverlayIcon = defineComponent({
  setup: (props, context) => {
    const refOverlayVisible =ref(false)
    const onClickMenu =() =>{
      refOverlayVisible.value = !refOverlayVisible.value
      // console.log(refOverlayVisible.value);
    }
    return () => <>
      <Icon name='menu' class={s.navIcon} onClick={onClickMenu}/>
      {
        refOverlayVisible.value && 
        <Overlay onClose ={()=>refOverlayVisible.value = false}/>
      }
    </>
  }
})
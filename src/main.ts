import { createApp } from 'vue'
import { App }  from './App'
import {createRouter} from 'vue-router'
import {routes} from './config/routes'
import { history } from './shared/history'
import '@svgstore';
import { fetchMe, mePromise } from './shared/mePromise'

const router = createRouter({
  history,
  routes, 
})

fetchMe()

router.beforeEach(async (to,from) => {
  if(to.path === '/' || to.path.startsWith('/welcome') || to.path.startsWith('/sign_in') || to.path === '/items'){
    return true
  }else {
    const path = await mePromise!.then(
      () => true,
      () => '/sign_in?return_to=' + to.path
    )
    return path
  }
})

const app = createApp(App)
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router)

app.mount('#app')

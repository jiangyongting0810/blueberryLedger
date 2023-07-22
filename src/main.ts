import { createApp } from 'vue'
import { App }  from './App'
import {createRouter} from 'vue-router'
import {routes} from './config/routes'
import { history } from './shared/history'


const router = createRouter({
  history,
  routes, 
})

const app = createApp(App)
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router)

app.mount('#app')

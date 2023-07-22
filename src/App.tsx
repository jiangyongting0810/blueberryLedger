import { defineComponent, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";

export const App = defineComponent({
  setup(){
    return () => <>
      <header>
        <ul>
          <li><RouterLink to='/'>Foo</RouterLink></li>
          <li><RouterLink to='/bar'>Bar</RouterLink></li>
        </ul>
        <RouterView/>
      </header>
      </>
  }
})
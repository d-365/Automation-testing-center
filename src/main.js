import router from './router'
import store from './store'
import ElementPlus, {ElMessage} from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/css/global.css'
import { Expand } from '@element-plus/icons'
import { createApp } from 'vue'
import App from './MyApp'
import JsonViewer from "vue3-json-viewer"



const app= createApp(App)
app.use(store)
app.use(JsonViewer)
app.use(router)
app.use(ElementPlus,{size:'small'})
app.component('expand',Expand)
app.mount('#app')


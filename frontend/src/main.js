import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入Vant组件库
import { 
  Button, 
  NavBar, 
  Tabbar, 
  TabbarItem, 
  Card, 
  Grid, 
  GridItem, 
  Tag, 
  Progress, 
  Cell, 
  CellGroup, 
  Form, 
  Field, 
  Picker, 
  Popup, 
  DatetimePicker, 
  Switch, 
  Dialog, 
  Toast, 
  Loading,
  PullRefresh,
  List,
  Tab,
  Tabs,
  Divider,
  Badge,
  ActionSheet,
  Rate,
  Empty,
  Checkbox,
  CheckboxGroup,
  Row,
  Col,
  Icon
} from 'vant'

// 引入Vant样式
import 'vant/lib/index.css'

// 移动端适配
import '@vant/touch-emulator'

const app = createApp(App)

// 注册Vant组件
app.use(Button)
app.use(NavBar)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Card)
app.use(Grid)
app.use(GridItem)
app.use(Tag)
app.use(Progress)
app.use(Cell)
app.use(CellGroup)
app.use(Form)
app.use(Field)
app.use(Picker)
app.use(Popup)
app.use(DatetimePicker)
app.use(Switch)
app.use(Dialog)
app.use(Toast)
app.use(Loading)
app.use(PullRefresh)
app.use(List)
app.use(Tab)
app.use(Tabs)
app.use(Divider)
app.use(Badge)
app.use(ActionSheet)
app.use(Rate)
app.use(Empty)
app.use(Checkbox)
app.use(CheckboxGroup)
app.use(Row)
app.use(Col)
app.use(Icon)

app.use(store).use(router).mount('#app') 

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//mintUi
import { Header,Button,Picker,IndexList, IndexSection,Cell,Tabbar,TabItem,Indicator
,CellSwipe,Checklist,Swipe, SwipeItem} from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Picker.name, Picker);
Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);
Vue.component(Cell.name, Cell);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(CellSwipe.name, CellSwipe);
Vue.component(Checklist.name, Checklist);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
//vuex
import store from './components/vuex/store'
// axios
import Axios from 'axios'
Axios.defaults.withCredentials=true;
Vue.prototype.$axios = Axios;
Axios.defaults.withCredentials = false;
Axios.defaults.baseURL='http://13.231.212.214';
//jquery
import $ from "jquery";
Vue.prototype._$ = $;

Axios.interceptors.request.use(function(config){
  // 显示图标
  Indicator.open({
    text: '加载中...',
    spinnerType: 'fading-circle'
  });
  return config;
});
Axios.interceptors.response.use(function(config){
  //隐藏图标
  Indicator.close();
  //获取到config中的data，进行加工
  return config;
});


//自定义的全局组件
import TopNav from '@/components/common/topNav'
Vue.component('topNav',TopNav);
import SearchMan from '@/components/common/searchMan'
Vue.component('searchMan',SearchMan)
import List from '@/components/common/list'
Vue.component('list',List)
import Friend from '@/components/common/friend'
Vue.component('friend',Friend)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})

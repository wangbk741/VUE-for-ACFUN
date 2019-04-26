// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Axios from 'axios'
import Toast from 'vue-easy-toast'
import axios from './utils/diyaxios';
import { Loadmore } from 'mint-ui';
// import { InfiniteScroll } from 'mint-ui';

// import 'assets/theme.less'
Vue.use(MuseUI)
Vue.use(Toast)
Vue.use(MintUI)
// Vue.use(InfiniteScroll);
Vue.component(Loadmore.name, Loadmore);

Vue.prototype.$axios = Axios
// Axios.defaults.baseURL = '/api'
Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.headers['udid'] = '7F9FBD8F-7CBE-4093-8225-71FA65B28AAE'
// Axios.defaults.headers['User-Agent'] = 'AcFun/5.7.0 (iPhone; iOS 8.4; Scale/2.00)'
Axios.defaults.headers['uid'] = ''
Axios.defaults.headers['resolution'] = '640x960'
Axios.defaults.headers['deviceType'] = '0'
Axios.defaults.headers['acPlatform'] = 'IPHONE'
Axios.defaults.headers['mod'] = 'iPhone4,1'
Axios.defaults.headers['appVersion'] = '5.7.0'
Axios.defaults.headers['market'] = 'appstore'
Axios.defaults.headers['productId'] = '2000'
Vue.config.productionTip = false
router.afterEach((to,from,next) => {
  // console.log("to:" + to.path)
  var pathTo = to.path
  // console.log("from:"+from.path)
  // console.log('next:'+next.path)

  switch (pathTo) {
    case "/SRvideo":
      window.scrollTo(0,0);
      break;
    case "/SRvideo1":
      window.scrollTo(0,0);
      break;
    case "/SRanime":
      window.scrollTo(0,0);
      break;
    case "/SRanime1":
      window.scrollTo(0,0);
      break;
    case "/SRcomprehensive":
      window.scrollTo(0,0);
      break;
    case "/SRcomprehensive1":
      window.scrollTo(0,0);
      break;
    case "/SRUP":
      window.scrollTo(0,0);
      break;
    case "/SRUP1":
      window.scrollTo(0,0);
      break;
    case "/SRarticle":
      window.scrollTo(0,0);
      break;
    case "/SRarticle1":
      window.scrollTo(0,0);
      break;
    case "/articlePage":
      window.scrollTo(0,0);
      break;

    default:
      break;
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

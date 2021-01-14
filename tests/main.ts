//这个文件是所有文件的入口
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 使用ElementUI的UI设计
Vue.use(ElementUI);

// 阻止启动生产消息，现在使用的是开发模式（前端自己开发用的），不是生产模式
Vue.config.productionTip = false;

// 创建一个Vue实例
new Vue({
  router,
  store,
  render: h => h(App),  // render函数是vue通过js渲染dom结构的函数createElement，约定可以简写为h
                        // 完整版是       render: function (createElement){
                        //                   return createElement(App);
                        //               }
}).$mount('#app');      // Vue构造函数时，需要配置一个el属性，如果没有，需要手动挂载
                        // el属性        el:"#app",

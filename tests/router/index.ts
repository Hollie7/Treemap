import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

// VueRouter是Vue.js官方的路由管理器
// 这里是Router的注册
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'bar-chart',
    component: () => import('../views/bar-chart/bar-chart.vue'),
    // meta元素可提供有关页面的元信息，比如针对搜索引擎和更新频度的描述和关键词
    // 这个title为左侧列表里显示的标题
    meta: {
      title: 'bar-chart',
    },
  },
  {
    path: '/tree',
    name: 'tree',
    component: () => import('../views/tree/tree.vue'),
    meta: {
      title: 'tree',
    },
  },
  {
    path: '/tree-map',
    name: 'tree-map',
    component: () => import('../views/tree-map/tree-map.vue'),
    meta: {
      title: 'tree-map',
    },
  },
  {
    path: '/sunburst',
    name: 'sunburst',
    component: () => import('../views/sunburst/sunburst.vue'),
    meta: {
      title: 'sunburst',
    },
  }
];

const router = new VueRouter({
  routes,
});

export default router;

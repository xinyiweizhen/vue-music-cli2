import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//  路由懒加载组件
const Rank = () => import('views/rank/Rank')
const Recommend = () => import('views/recommend/Recommend')
const Search = () => import('views/search/Search')
const Singer = () => import('views/singer/Singer')

//  路由映射
const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend
  },
  {
    path: '/rank',
    component: Rank
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/singer',
    component: Singer
  }
]

export default new Router({
  routes,
  mode: 'history'
})

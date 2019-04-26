import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index'
import live from '@/components/live'
import anime from '@/components/anime'
import recommend from '@/components/recommend'
import pageamine from '@/components/pageamine'
import comment from '@/components/comment'
import allAnimeList from '@/components/allAnimeList'
import tagPage from '@/components/tagPage'
import search from '@/components/search'
import searchResult from '@/components/searchResult'
import SRvideo from '@/components/searchRes/SRvideo'
import SRanime from '@/components/searchRes/SRanime'
import SRcomprehensive from '@/components/searchRes/SRcomprehensive'
import SRUP from '@/components/searchRes/SRUP'
import SRarticle from '@/components/searchRes/SRarticle'
import articlePage from '@/components/Page/articlePage'
import comprehensivePage from '@/components/Page/comprehensivePage'
import userSpace from '@/components/userSpace/userSpace'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
      path: '/',
      component: index,
      children: [
        {
          name: 'live',
          path: 'live',
          component: live
        },
        {
          name: 'recommend',
          path: 'recommend',
          component: recommend
        },
        {
          name: 'anime',
          path: 'anime',
          component: anime
        }
      ]
    },

    {
      name: 'pageamine',
      path: '/pageamine/:id',
      component: pageamine      
    },
    {
      name: 'comment',
      path: 'comment/:id',
      component: comment
    },
    {
      name: 'allAnimeList',
      path: 'allAnimeList/:id',
      component: allAnimeList
    },
    {
      name: 'tagPage',
      path: 'tagPage/:id/:name',
      component: tagPage
    },
    {
      name: 'search',
      path: '/search/',
      component: search
    },
    {
      name: 'articlePage',
      path: '/articlePage/:id',
      component: articlePage
    },
  
    {
      name: 'comprehensivePage',
      path: '/comprehensivePage/:id',
      component: comprehensivePage
    },
    {
      name: 'userSpace',
      path: '/userSpace/:id',
      component: userSpace
    },
    {
      name: 'searchResult',
      path: 'searchResult/:title',
      component: searchResult,
      children: [
        {
          name: 'SRvideo',
          path: '/SRvideo/',
          component: SRvideo,
          meta: {keepAlive: false}
        },
        {
          name: 'SRvideo1',
          path: '/SRvideo1/',
          component: SRvideo,
          meta: {keepAlive: false}
        },
        {
          name: 'SRanime',
          path: '/SRanime/',
          component: SRanime,
          meta: {keepAlive: false}
        },
        {
          name: 'SRanime1',
          path: '/SRanime1/',
          component: SRanime,
          meta: {keepAlive: false}
        },
        {
          name: 'SRcomprehensive',
          path: '/SRcomprehensive/',
          component: SRcomprehensive,
          meta: {keepAlive: false}
        },
        {
          name: 'SRcomprehensive1',
          path: '/SRcomprehensive1/',
          component: SRcomprehensive,
          meta: {keepAlive: false}
        },
        {
          name: 'SRUP',
          path: '/SRUP/',
          component: SRUP
        },
        {
          name: 'SRUP1',
          path: '/SRUP1/',
          component: SRUP
        },
        {
          name: 'SRarticle',
          path: '/SRarticle/',
          component: SRarticle,
          meta: {keepAlive: false}
        },
        {
          name: 'SRarticle1',
          path: '/SRarticle1/',
          component: SRarticle,
          meta: {keepAlive: false}
        }
      ]
    },

  ]
})
export default router
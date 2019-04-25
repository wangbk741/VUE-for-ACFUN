<template>
    <div >
      <div class="nav-bar">
      <div class="select">
        <mu-tabs style="background:rgb(225, 15, 15);indicator-color:green" :value.sync="activeTab"  @change="handleTabChange" class="view-tabs" > 
          <mu-tab value="live" title="热门"/>
          <mu-tab value="recommend" title="推荐"/>
          <mu-tab value="anime" title="分区"/>
        </mu-tabs>
      </div>
      <div class="searchBtn">
        <mu-icon-button icon='search' @click="searchClick" slot="right"/>
      </div>
  
    </div>

      <div class="default-view" >
        <!-- <keep-alive> -->
         <router-view></router-view>
        <!-- </keep-alive> -->
      </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import search from './search'
export default {
    data () {
        return {
            activeTab: 'recommend',
            showSearch: false
        }
    },
    components: {
      search
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
          vm.handleTabChange('recommend')
        })
    },
    methods: {
        handleTabChange (val) {
          this.activeTab = val
          // console.log(val)
          this.$router.push({ path: '/' + val })
        },
        searchClick () {
          this.showSearch = true
          this.$router.push({path: '/search/'})
        }

    },
     created () {
      // 当created函数时监测路由信息,防止页面刷新tab高亮错误
      var tmpArr = this.$route.path.split('/')
      if (tmpArr[1] === 'index') {
        this.handleTabChange(tmpArr[2])
      }
    },
    watch: {
      '$route' (to, from) {
        const path = to.path
        var tmpArr = path.split('/')
        if (tmpArr[1] === 'index') {
          this.handleTabChange(tmpArr[2])
        }
      }
    },
    computed: {
        ...mapGetters([
            'recommend'
        ])
    }
}
</script>
<style lang='less' scoped>
  // @import "../assets/theme.less";

.view-tabs {

    >.mu-tab-link {
      color: white;
      font-weight: normal;
    }
    >.mu-tab-active{
      color: white;
      font-weight: bold;
    }

  }

  .nav-bar {
    position: fixed;
    width: 100%;
    top:0;
    left: 0;
    z-index: 15;
    text-align: center;
  }
  .nav-bar .select{
    position: absolute;
    width: 100%;
    z-index: 4;
  }
  .nav-bar .searchBtn {
    z-index: 6;
    position: relative;
    width: 40px;
    height: 40px;
    overflow: hidden;
    float: right;
  }
  .default-view {
    margin-top: 50px;
  }
  
</style>


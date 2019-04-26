<template>
    <div class="searchResult">
        <div class="search-part">
            <div class="search-input">
                <img src="./../assets/icon-search.png" alt="搜索">
                <form @submit.prevent="search(key)">
                <input class="from-text" type="text"
                        placeholder="AC号"
                        v-model="key"
                        @focus="focus()">
                </form>
            </div>
            <div class="search-cancel"
                :class="{ 'search-cancel-show' : searchShow }"
                @touchend.prevent="searchCancel()"
                @click.prevent="searchCancel()">
                取消
            </div>
        </div>
        <div class="select">
             <mu-tabs style="background:rgb(255, 255, 255);" :value.sync="activeTab"  @change="handleTabChange" class="view-tabs" >
                <mu-tab value="SRvideo" :title="videoCount"/>
                <mu-tab value="SRanime" :title="animeCount"/>
                <mu-tab value="SRarticle" :title="articleCount"/>
                <mu-tab value="SRcomprehensive" :title="comprehensiveCount"/>
                <mu-tab value="SRUP" :title="UPCount"/>
            </mu-tabs>
        </div>

        <div class="default-view" >
            <!-- <keep-alive> -->
            <router-view v-if="showRouterView"></router-view>
            <!-- </keep-alive> -->
        </div>
  
    </div>  
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    inject: ['reload'],
    data () {
        return {
            key: '',
            searchShow: false,
            hotkey: null,
            searchRes: null,
            searchHistory: [],
            searchDone: false,
            searchHotkeyData: [],
            activeTab: 'SRvideo',
            mianVideoData: [],
            videoCount: '视频0',
            videoDataCan: [],
            animeCount: '番剧0',
            articleCount: '文章0',
            comprehensiveCount: '合辑0',
            UPCount: 'UP主0',
            showRouterView: false
        }
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            if (to.params.title !== vm.title) {
                // console.log(to.params.title)
                // console.log(vm.title)
                // vm.typeID = to.params.title
                vm.key = to.params.title
                vm.showRouterView = true
                vm.getData(to.params.title)
            }
        })
    },
    methods: {
        searchCancel () {
            this.searchShow = false
            this.key = ''
            this.searchRes = null
            this.searchDone = false
            this.$router.push({ path: '/'  })
            // console.log('cancel')
        },
        focus () {
            this.searchShow = true
        },
        search (key) {
            this.key = key
            this.showRouterView = false
            // this.searchDone = true
            // this.showRouterView = true
            this.getData(key)
            // console.log(this.searchHistory)
        },
        handleTabChange (val) {
            this.showRouterView = true
            this.activeTab = val
            if (this.searchDone) {
                this.$router.push({name: val + "1", params: {data: this.mianVideoData,key: this.key,name: val}})
                this.searchDone = false
            }else{
                this.$router.push({name: val, params: {data: this.mianVideoData,key: this.key,name: val}})
                this.searchDone = true
            }
            
       },
       getCount (count) {
           if (count>999){
               return 999
           }else {
               return count
           }
       },
       getData (title) {
           this.$axios.get("/search/mobileSearch?aiCount=1&app_version=5.7.0&greenCount=2&listCount=20&market=appstore&origin=ios&q=" + title +"&resolution=640x960&sortField=score&spCount=1&sys_name=ios&sys_version=8.4&userCount=0")
            .then(res=>{
                // console.log(res)
            })
            .catch(err=>{
                // console.log(err.data.data)
                this.mianVideoData = err.data.data
                this.videoCount = "视频" + this.getCount(err.data.data.page.videoCount)
                this.videoDataCan = err.data.data.page.list
                this.animeCount = "番剧" + this.getCount(err.data.data.page.aiCount)
                this.articleCount = "文章" + this.getCount(err.data.data.page.greenCount)
                this.comprehensiveCount = "合辑" + this.getCount(err.data.data.page.spCount)
                this.UPCount = "UP主" + this.getCount(err.data.data.page.userCount)
                // console.log('data')
                this.handleTabChange('SRvideo')
            })
       }
    },
    filters: {
        listenViews: views => {
            if (views < 9999) {
                return views
            } else {
                return (views / 10000).toFixed(1) + '万'
            }
        }
    },
    computed: {
        ...mapGetters([
            'SRanime'
        ])
    }
}
</script>

<style scoped>

.search-part {
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    position: fixed;
    top: 0;
    background: rgb(225, 25, 25);
    z-index: 10;
  }
.search-input {
    width: 100%;
    border-radius: 5px;
    margin: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.search-input .from-text {
    padding-left: 30px;
}
.search-input img {
    position: absolute;
    height: 30px;
    width: 30px;
}
  .search-input form,
  .search-input input {
    width: 100%;
    height: 100%;
    border: none;
    background: #eee;
    font-size: medium;
    flex-grow: 1;
    border-radius: 5px;
    outline: none;
  }
.search-cancel {
    height: 40px;
    width: 0px;
    margin: 10px auto;
    line-height: 40px;
    overflow: hidden;
    transition: width 0.3s;
    cursor:pointer;
    color: #fff;
}
.search-cancel-show {
    width: 55px;
}
.searchResult {
    width: 100%;
    min-height: 100%;
    position: absolute;
}
.select {
    width: 100%;
    position: fixed;
    top: 60px;
    z-index: 10;
}
 .mu-tab-link {
    color: rgb(220, 220, 220);
    font-weight: normal;
    font-size: 12px;
}
.mu-tab-active{
    color: rgb(225, 25, 25);
    font-weight: bold;
    font-size: 13px;
}
.search-video {
    display: flex;
    flex-direction: row;
    position: relative;
    top: 60px;
}
.search-video .text-part {
    display: flex;
    flex-direction: column;
    margin: 5px 5px;
}
.search-video img {
    width: 150px;
    height: 70px;
}
.search-video .text-part .title {
    font-weight: bold;
    font-size: 13px;
}
.search-video .text-part .UPtitle {
    color: gray;
    font-size: 12px;
    margin-bottom: 5px;
}
.image-part p {
    position: absolute;
    top: 35px;
    padding-left: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
}
.default-view {
    margin-top: 50px;
  }
</style>


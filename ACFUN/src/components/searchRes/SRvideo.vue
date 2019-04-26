<template>
    <div class="SRvideo">
        <div class="search-sp">
        </div> 
        <mt-loadmore :top-method="loadTop" :bottom-method="loadMore" :bottom-all-loaded="allLoaded" ref="loadmore">
            <div class="box">
                <div class="search-video" v-if="videoDataCan.length!=0" v-for="item in videoDataCan">
                    <div class="image-part">
                        <img :src="item.titleImg">
                        <p>{{item.views | listenViews}}</p>
                    </div>
                    <div class="text-part">
                        <div class="title">
                            {{item.title}}
                        </div>
                        <div class="UPtitle">
                            UP:{{item.username}}
                        </div>
                    </div>
                </div>
            </div> 
        </mt-loadmore>
         <!-- <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" v-if="showLoadMore"/> -->
    </div>  
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    inject: ['reload'],

    data () {
        return {
            videoDataCan: [],
            scroller: null,
            refreshing: false,
            loading: false,
            pageNO: 2,
            question: '',
            dataEnd: false,
            allLoaded: false
        }
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            console.log("videobefore")
            
        })
    },
    methods: {
        loadTop() {
            this.videoDataCan = []
            this.getData(this.question)
            this.$refs.loadmore.onTopLoaded()
        },
       getData (data) {
            // this.refreshing = true
            // this.showLoadMore = true
            // this.videoDataCan = data.page.list
            // this.refreshing = false
            if (!this.loading){
            this.loading = true
            this.$axios.get("/search/search?app_version=5.7.0&fqChannelId=63&market=appstore&origin=ios&pageNo=1&pageSize=20&q=" + data + "&resolution=640x960&sortField=score&spCount=0&sys_name=ios&sys_version=8.4&userCount=0")
                .then(res=>{
                    // console.log(res)
                    this.loading = false
                })
                .catch(err=>{
                    // console.log(err.data.data.page.list)
                    this.videoDataCan = err.data.data.page.list
                    this.$refs.loadmore.onBottomLoaded();
                    this.loading = false
                })
           }
       },
       loadMore () {
        //    console.log(this.videoDataCan.length%5)
        //    console.log(this.dataEnd)
        //    console.log(this.loading)
           if (!this.loading&&this.dataEnd==false&&this.videoDataCan.length%5==0){
            this.loading = true
            this.$axios.get("/search/search?app_version=5.7.0&fqChannelId=63&market=appstore&origin=ios&pageNo=" + this.pageNO + "&q=" + this.question + "&resolution=640x960&sortField=score&spCount=0&sys_name=ios&sys_version=8.4&userCount=0")
                .then(res=>{
                    // console.log(res)
                    this.loading = false
                })
                .catch(err=>{
                    console.log('videomore')
                    var list = err.data.data.page.list
                    if (list.length!=0){
                        for (var i = 0; i<list.length;i++){
                            this.videoDataCan.push(list[i])
                        }
                    }else{
                        this.dataEnd = true
                    }
                    this.loading = false
                    this.pageNO ++
                })
           }else{
               this.allLoaded = true
           }
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
    mounted () {
    this.scroller = this.$el
   },
   created () {
        // console.log(this.$route.params.data)
        // console.log(this.$route.params.key)
        this.question = this.$route.params.key
        this.getData(this.question)
   },
   destroyed () {
       this.videoDataCan = []
       this.$forceUpdate();
       console.log('videover')
   }
}
</script>

<style scoped>


.SRvideo {
    width: 100%;
    min-height: 100%;
    position: absolute;
    top: 110px;
}

.search-video {
    display: flex;
    flex-direction: row;
    position: relative;
    border-bottom: 1px solid gray;
}
.search-video .text-part {
    display: flex;
    flex-direction: column;
    margin-top: 1.5rem;
    margin-left: 10px;
}
.search-video img {
    width: 9rem;
    height: 5rem;
    padding: 5px 0px;
}
.search-video .text-part .title {
    font-weight: bold;
    font-size: 13px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.search-video .text-part .UPtitle {
    color: gray;
    font-size: 12px;
    margin-bottom: 5px;
}
.image-part p {
    position: absolute;
    top: 2.5rem;
    padding-left: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
}
.box {
    display: scroll;
    padding-left: 10px;
    padding-right: 10px;
}

</style>


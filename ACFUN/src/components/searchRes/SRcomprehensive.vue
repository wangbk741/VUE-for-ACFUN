<template>
    <div class="SRcomprehensive">
        <mt-loadmore :top-method="null" :bottom-method="loadMore" :bottom-all-loaded="allLoaded" ref="loadmore">
        <div class="comprehensive-part">
            <div class="head-btn">

            </div>
            <div class="main-title">
                合辑
            </div>
            <div class="detail-part" v-if="comprehensiveDataCan.length!=0" v-for="item in comprehensiveDataCan" @click="jump(item.contentId)">
                <div class="icon-part">
                    <img :src="item.titleImg">
                </div>
                <div class="article-title">
                    <span class="title">{{item.title}}</span>
                    <span class="up">up:{{item.username}}</span>
                    <span class="detail">{{item.description}}</span>
                </div> 
            </div>
            <div class="none-image" v-if="comprehensiveDataCan.length==0">

            </div>
            <!-- <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/> -->
        </div>
        </mt-loadmore>
    </div>
</template>
<script>
export default {
    data () {
        return {
            comprehensiveDataCan: [],
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
            // vm.getData(to.params.key)
            // vm.question = to.params.key
        })
    },
    created () {
        this.question = this.$route.params.key
        this.getData(this.question)
   },
    methods: {
       getData (data) {
            if (!this.loading){
            this.loading = true
            this.$axios.get("/search/search?app_version=5.7.0&market=appstore&origin=ios&pageNo=1&pageSize=20&q=" + data + "&resolution=640x960&sortField=score&spCount=20&sys_name=ios&sys_version=8.4&type=1&userCount=0")
                .then(res=>{
                    // console.log(res)
                    this.loading = false
                })
                .catch(err=>{
                    // console.log(err.data)
                    this.comprehensiveDataCan = err.data.data.page.list
                    this.loading = false
                })
           }
       },
       loadMore () {
           if (!this.loading&&this.dataEnd==false&&this.comprehensiveDataCan.length%5==0){
            this.loading = true
            this.$axios.get("/search/search?app_version=5.7.0&market=appstore&origin=ios&pageNo" + this.pageNO + "&q=" + this.question + "&resolution=640x960&sortField=score&spCount=20&sys_name=ios&sys_version=8.4&type=1&userCount=0")
                .then(res=>{
                    // console.log(res)
                    this.loading = false
                })
                .catch(err=>{
                    console.log('videomore')
                    var list = err.data.data.page.list
                    if(list.length!=0){
                        for (var i = 0; i<list.length;i++){
                            this.videoDataCan.push(list[i])
                        }
                    }else{
                        this.dataEnd =true
                    }
                    this.loading = false
                    this.pageNO ++
                })
           }else{
               this.allLoaded = true
           }
       },
       jump(ACid){
        //    console.log(ACid)
           this.$router.push({name: "comprehensivePage", params: {id: ACid}})
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
    }
}
</script>
<style scoped>
.SRcomprehensive {
    width: 100%;
    min-height: 100%;
    position: absolute;
    top: 110px;
}
.detail-part {
    position: relative;
    display: flex;
    flex-direction: row;
    border-bottom: 1px gray solid;
    padding-bottom: 5px;
    margin-top: 10px;
}
.detail-part img {
    height: 90px;
    width: 50px;
}
.detail-part .article-title {
    display: flex;
    flex-direction: column;
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 5px;
}
.detail-part .article-title .title {
    font-weight: bold;
    font-size: 1rem;
}
.detail-part .article-title .up {
    font-size: 0.5rem;
    color: gray;
    margin-top: 5px;
}
.detail-part .article-title .detail {
    font-size: 0.5rem;
    color: gray;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.comprehensive-part {
    padding-left: 10px;
    padding-right: 10px;
}
</style>
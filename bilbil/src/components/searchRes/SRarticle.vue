<template>
    <div class="SRarticle">
        <div class="article-part">
            <div class="head-btn">

            </div>
            <div class="main-title">
                文章
            </div>
            <mt-loadmore :top-method="loadTop" :bottom-method="loadArticleMore" :bottom-all-loaded="allLoaded" ref="loadmore">
                <div>
                    <div class="detail-part" v-if="articleDataCan.length!=0" v-for="item in articleDataCan"  @click="jump(item.contentId)">
                    <div class="from-part">
                        /来自channelId:{{item.channelId}}
                    </div>
                    <div class="article-title">
                        <span class="num">{{item.comments}}</span>
                        <span class="title">{{item.title}}</span>
                    </div>
                    <div class="article-comment">
                        <span>评论{{item.comments}}&nbsp&nbsp&nbsp</span>
                        <span class="num">点击{{item.views | listenViews}}</span>
                        <span class="UP">UP:{{item.username}}</span>
                    </div>  
                </div>
            </div>
            </mt-loadmore>
            <!-- <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadArticleMore"/> -->
        </div>
    </div>
</template>
<script>

export default {
    data () {
        return {
            articleDataCan: [],
            scroller: null,
            refreshing: false,
            loading: false,
            pageNO: 2,
            question: '',
            dataEnd: false,
            change: false,
            allLoaded: false     
        }
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            // vm.question = to.params.key
            // vm.getData(to.params.key)

            console.log('arcenter')
        })
    },

    methods: {
        loadTop() {
            this.articleDataCan = []
            this.getData(this.question)
            this.$refs.loadmore.onTopLoaded()
        },
       getData (data) {
            if (!this.loading){
            this.loading = true
            this.$axios.get("/search/search?aiCount=0&app_version=5.7.0&channelIds=63&market=appstore&origin=ios&pageNo=1&pageSize=20&q=" + data + "&resolution=640x960&sortField=score&spCount=0&sys_name=ios&sys_version=8.4&userCount=0")
                .then(res=>{
                    // console.log(res)
                    this.loading = false
                })
                .catch(err=>{
                    // console.log(err.data.data.page.list)
                    this.articleDataCan = err.data.data.page.list
                    this.$refs.loadmore.onBottomLoaded();
                    this.loading = false
                })
           }
       },
       loadArticleMore () {
           if (this.loading!=true&&this.dataEnd==false&&this.articleDataCan.length%5==0){
            this.loading = true
            this.$axios.get("/search/search?aiCount=0&app_version=5.7.0&channelIds=63&market=appstore&origin=ios&pageNo=" + this.pageNO + "&pageSize=20&q=" + this.question + "&resolution=640x960&sortField=score&spCount=0&sys_name=ios&sys_version=8.4&userCount=0")
                .then(res=>{
                    // console.log(res)
                    this.loading = false
                })
                .catch(err=>{
                    console.log("artilcmore")
                    var list = err.data.data.page.list
                    if (list.length!=0){
                        for (var i = 0; i<list.length;i++){
                            this.articleDataCan.push(list[i])
                        }
                    }else{
                        this.dataEnd = true
                    }

                    this.loading = false
                    this.pageNO ++
                    this.$refs.loadmore.onBottomLoaded();
                })
           }
       },
       jump (data) {
           var num = data.substr(2,data.length-1)
        //    console.log('sss'+num)
        //    if (this.switch){
            //    this.$router.push({name: 'articlePage', params: {id: num}})
            //    this.change = false
            //    this.switch = false
        //    }else {
                this.loading = false
                this.$router.push({name: 'articlePage', params: {id: num}})
        //    }
       },
       getACiD (id) {
           var num = id.substr(2,data.length-1)
           return num
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
 
   created () {
        this.question = this.$route.params.key
        this.getData(this.question)
        // console.log('arcreate')
   },
   destroyed () {
       console.log('ardestroyed')
   },
   beforeRouterLeave (to, from, next) {
        to.meta.keepAlive = false
        console.log('serachleave')
        next()
    }
}
</script>
<style scoped>
.SRarticle {
    width: 100%;
    min-height: 100%;
    position: absolute;
    top: 110px;

}
.detail-part {
    position: relative;
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    padding-right: 10px;
}

.detail-part .article-title {
    display: flex;
    flex-direction: row;
    padding-left: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
}
.article-title .num {
    color: red;
    font-weight: bold;
}
.article-title .title {
    font-weight: bold;
    padding-left: 10px;
}
.detail-part .article-comment {
    padding-left: 8px;
    height: 21px;
    color: gray;
    position: relative;
    font-size: 10px;
    border-bottom: 0.5px solid gray;
}

.detail-part .article-comment .num {
    padding-left: 5px;
}
.detail-part .article-comment .UP {
    float: right;
    width: 8rem;
    text-align: right;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.article-part {
    /* padding-left: 10px;
    padding-right: 10px; */
    overflow: scroll;
}
.main-title {
    padding-left: 10px;
}
.detail-part .from-part{
    font-size: 5px;
    color: gray;

}

</style>
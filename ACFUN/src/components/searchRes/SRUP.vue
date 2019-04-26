<template>
    <div class="SRUP">
        <mt-loadmore :top-method="null" :bottom-method="loadMore" :bottom-all-loaded="allLoaded" ref="loadmore">
            <div class="">
                <div class="content-part" v-if="UPDataCan.length!=0" v-for="item in UPDataCan">
                    <div class="box" @click="jump(item.userId)">
                        <div class="icon">
                            <img :src="item.avatar">
                        </div>
                        <div class="inner-text">
                            <div class="title">
                                <div class="title">{{item.username}}</div>
                                <div class="num">&nbsp&nbsp&nbsp&nbsp&nbsp投稿{{item.contributes}}</div>
                                <div class="fans">粉丝{{item.followedCount}}</div>
                            </div>
                            <div class="des">
                                {{item.signature | ListenDes}}
                            </div>
                
                        </div>
                    </div>
                </div>
            </div>
        </mt-loadmore>
        <!-- <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/> -->
    </div>
</template>
<script>
export default {
    data () {
        return {
            UPDataCan: [],
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
            console.log('beforeRouteEnter')
        })
    },
    created () {
        this.question = this.$route.params.key
        this.getData(this.question)
        console.log('created')
   },
    methods: {
       getData (data) {
            if (!this.loading){
            this.loading = true
            this.$axios.get("/search/search?app_version=5.7.0&market=appstore&origin=ios&pageNo=1&pageSize=20&q=" + data + "&resolution=640x960&sortField=score&sys_name=ios&sys_version=8.4&userCount=10")
                .then(res=>{
                    // console.log(res)
                    this.loading = false
                })
                .catch(err=>{
                    // console.log(err.data)
                    this.UPDataCan = err.data.data.page.user
                    this.loading = false
                })
           }
       },
       loadMore () {
           console.log('loadMore')
           if (!this.loading&&this.dataEnd==false&&this.UPDataCan.length%5==0){
            this.loading = true
            this.$axios.get("/search/search?app_version=5.7.0&market=appstore&origin=ios&pageNo=" + this.pageNO + "&q=" + this.question + "&resolution=640x960&sortField=score&sys_name=ios&sys_version=8.4&userCount=10")
                .then(res=>{
                    // console.log(res)
                    this.loading = false
                })
                .catch(err=>{
                    console.log('videomore')
                    var list = err.data.data.page.user
                    if(list.length!=0){
                        for (var i = 0; i<list.length;i++){
                            this.UPDataCan.push(list[i])
                        }
                    }else{
                        this.dataEnd =true
                    }
                    this.loading = false
                    this.pageNO ++
                })
           }else{
               console.log('end')
               this.allLoaded = true
           }
       },
       jump(userId) {
           this.$router.push({name: 'userSpace', params: {id: userId}})
       }
    },
    filters: {
        listenViews: views => {
            if (views < 9999) {
                return views
            } else {
                return (views / 10000).toFixed(1) + '万'
            }
        },
        ListenDes: words => {
            if(words){
                return words
            }else {
                return "才不是懒得签名只是在思考"
            }
        }
    },
    destroyed () {
       
       this.UPDataCan = []
       console.log('UPover')
   }
}
</script>
<style scoped>
.SRUP {
    width: 100%;
    min-height: 100%;
    position: absolute;
    top: 110px;
}
.content-part {
    display: flex;
    flex-direction: row;
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
}
.content-part img {
    width: 60px;
    height: 60px;
    border: 1px black solid;
    border-radius: 50%;
}
.inner-text{
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    position: relative;
}
.inner-text .title .title{
    position: relative;
    font-weight: bold;
    font-size: 1rem;
    width: 100px;
    height: 1.5rem;
    overflow : hidden;
    text-overflow: ellipsis;
    display: inline-block;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
}
.inner-text .title .num {
    position: relative;
    font-size: 5pt;
    color: gray;
    float: right;
    margin-top: 5px;
}
.inner-text .title .fans {
    position: relative;
    font-size: 5pt;
    color: gray;
    float: right;
    margin-top: 5px;
}
.inner-text .des {
    color: gray;
    padding-bottom: 2rem;
    width: 14rem;
    border-bottom:0.1px grey solid;
    overflow: hidden;/*超出部分隐藏*/
    white-space: nowrap;/*不换行*/
    text-overflow:ellipsis;/*超出部分文字以...显示*/
}

.box {
    display: flex;
    width: 100%;
}
</style>
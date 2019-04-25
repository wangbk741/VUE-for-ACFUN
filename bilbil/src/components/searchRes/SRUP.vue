<template>
    <div class="SRUP">
        <mt-loadmore :top-method="null" :bottom-method="loadMore" :bottom-all-loaded="allLoaded" ref="loadmore">
            <div class="content-part" v-if="UPDataCan.length!=0" v-for="item in UPDataCan">
                <div class="box">
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
                            {{item.signature}}
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
            vm.getData(to.params.key)
            vm.question = to.params.key
        })
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
    overflow: scroll;
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
    font-size: 15pt;
    width: 100px;
    height: 25pt;
    overflow : hidden;
    text-overflow: ellipsis;
    display: inline-block;
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
    padding-bottom: 10px;
    border-bottom:0.1px grey solid;
}

.box {
    display: flex;
    width: 100%;
}
</style>
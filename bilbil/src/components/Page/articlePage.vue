<template>
    <div class="articlePage">
        <div class="NavBar"> 
            <div class="back-icon" @click="back">
                <img src="../../assets/icon-back-white.svg">
            </div>
            <div class="title">
                AC{{this.$route.params.id}}
            </div>
        </div>
        <div class="content-part" v-if="articleDataCan.length!=0">
            <div class="header-part">
                <div class="title">
                    {{articleDataCan.title}}
                </div>
                <div class="user">
                    <img :src="articleDataCan.owner.avatar">
                    <div class="text">
                        <div class="username">
                            {{articleDataCan.owner.name}}
                        </div>
                        <div class="time">
                            {{dataTime}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="article">
                <div v-html="articleDataCan.article.content"></div>
            </div>
            <div class="user-support">
                <div class="user-image">
                    <img :src="articleDataCan.owner.avatar">
                </div>
                <div class="user-btn">
                    食我大蕉
                </div>
                <div class="des">
                    给UP主投蕉
                </div>
            </div>
            <div class="comment-part">
                <div class="comment-hot" v-if="hotCommentsCan.length!=0">
                    <span class="title">
                        热门评论
                    </span>
                    <div class="comment-floor" v-for="item in hotCommentsCan">
                        <img class="hair" :src="item.avatarImage">
                        <img class="image" :src="item.headUrl[0].url">
                        <div class="box">
                            <div class="user-name">
                                <span class="left">{{item.userName}}</span>
                                <span class="right">#{{item.floor}}</span>
                            </div>
                            <div class="user-text" v-html="item.content">
                            
                            </div>
                            <div class="follow-text">
                                followtext
                            </div>
                            <div class="user-function">
                                <span class="left">
                                    {{item.timestamp|listenViews}}
                                </span>
                                <span class="right">
                                    👍{{item.likeCount}}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <mt-loadmore :top-method="null" :bottom-method="loadMore" :bottom-all-loaded="allLoaded" ref="loadmore">
                    <div class="comment-normal">
                            <span class="title">
                                全部评论
                            </span>
                            <div class="comment-floor" v-if="rootCommentsCan.length!=0" v-for="(item,index) in rootCommentsCan" >
                                <img class="hair" :src="item.avatarImage">
                                <img class="image" :src="item.headUrl[0].url">
                                <div class="box">
                                    <div class="user-name">
                                        <span class="left">{{item.userName}}</span>
                                        <span class="right">#{{item.floor}}</span>
                                    </div>
                                    <div class="user-text" v-html="item.content">
                                    
                                    </div>
                                    <div class="follow-text">
                                        followtext
                                    </div>
                                    <div class="user-function">
                                        <span class="left">
                                            {{item.timestamp|listenViews}}
                                        </span>
                                        <span class="right">
                                            👍{{item.likeCount}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                    </div>
                </mt-loadmore>
                 
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            articleDataCan: [],
            subCommentsMapCan: {},
            rootCommentsCan: [],
            hotCommentsCan: [],
            pcursor: '0',
            dataTime: '',
            loading: false,
            ACid: '',
            showRefresh: false,
            allLoaded: false
        }
    },
    methods: {
        getData (data) {
            // console.log(data)
            this.$axios.get("/article/v2/articles/" + data )
                .then(res=>{
                    // console.log(res)
                })
                .catch(err=>{
                    // console.log(err.data.vdata)
                    this.articleDataCan = err.data.vdata
                    this.dataTime = this.formatDate(this.articleDataCan.releaseDate)
                    // console.log(this.dataTime)
                })
        },
        getComments (data){
            // console.log('l'+this.pcursor)
            this.loading = true
            this.$axios.get("/comment/rest/app/comment/list?access_token=&app_version=5.7.0&count=20&market=appstore&origin=ios&pcursor=" + this.pcursor + "&resolution=640x960&showHotComments=1&sourceId=" + data + "&sourceType=1&sys_name=ios&sys_version=8.4" )
                .then(res=>{
                    this.loading = false
                    // console.log(res)
                })
                .catch(err=>{
                    
                    this.subCommentsMapCan = err.data.subCommentsMap
                    this.rootCommentsCan = err.data.rootComments
                    this.hotCommentsCan = err.data.hotComments
                    this.pcursor = err.data.pcursor
                    this.loading = false
                    // console.log('s'+err.data.pcursor)
                })
        },
        loadMore () {
            console.log('l'+this.pcursor)
            if (this.pcursor!='no_more'){
                this.loading = true
                this.$axios.get("/comment/rest/app/comment/list?access_token=&app_version=5.7.0&count=20&market=appstore&origin=ios&pcursor=" + this.pcursor + "&resolution=640x960&showHotComments=1&sourceId=" + this.ACid + "&sourceType=1&sys_name=ios&sys_version=8.4" )
                    .then(res=>{
                        this.loading = false
                        // console.log(res)
                    })
                    .catch(err=>{
                        for (var i=0; i<err.data.rootComments.length;i++) {
                            this.rootCommentsCan.push(err.data.rootComments[i])
                        }
                        this.pcursor = err.data.pcursor
                        this.loading = false
                        this.$refs.loadmore.onBottomLoaded();
                        // console.log('s'+err.data.pcursor)
                    })
            }
        },
        back () {
            this.pcursor = 0
            this.articleDataCan = []
            this.$router.go(-1) 
        },
        formatDate (timeDate) {
            let date = new Date(timeDate);
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? ('0' + MM) : MM;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;
            let s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;
            return y + '-' + MM + '-' + d ;
        }
    },
    filters: {
        listenViews: views => {
            let date = new Date(views);
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? ('0' + MM) : MM;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;
            let s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;
            return y + '-' + MM + '-' + d ;
        }
    },
    created () {
        // this.getData(this.$route.params.id)
        // this.getComments(this.$route.params.id)
        // console.log('createeee'+this.$route.params.id)
   },
   destroyed () {
        console.log('实例已销毁')
    },
    beforeRouterLeave(to, from, next) {
        console.log('leave')
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.showRefresh = true
            vm.ACid = to.params.id
            vm.showRefresh = true
            vm.getData(to.params.id)
            vm.getComments(to.params.id)
            // console.log('eee'+to.params.id)
        })
    }
}
</script>

<style scoped>
.NavBar {
    position: fixed;
    top: 0;
    height: 50px;
    width: 100%;
    max-width: 68vh;
    z-index: 10;
    background-color:rgb(215, 25, 25);
    /* display: flex;
    flex-direction: row; */
    text-align: center;
 }
 .NavBar .title {
     display: inline-block;
     /* margin: 0 auto; */
     color: #fff;
     font-size: 1.5rem;
     line-height: 50px;
  }
 .back-icon {
      width: 50px;
      height: 50px;
      float: left; 
      position: absolute;    
  }
  .back-icon img{
      width: 50px;
  }
  .articlePage {
      position: absolute;
      width: 100%;
      min-height: 100%;
  }
  .content-part {
      position: relative;
      top: 65px;
      padding: 5px 10px;
  }
  .content-part .header-part .title {
      font-size: 1.2rem;
      font-weight: bold;
  }
  .content-part .header-part .user {
      display: flex;
      flex-direction: row;
  }
  .content-part .header-part .user .text {
        padding:5px 5px;
  }
  .content-part .header-part .user img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
  }
  .content-part .header-part .user .time {
      color: gray;
      font-size: 0.1rem;
  }
  .content-part .article {
        overflow: hidden;
  }
 .content-part .article >>> img {
        width: 100%;
        height: 100%;
 }
 .content-part .user-support {
     text-align: center;
     margin-top: 50px;
 }
 .content-part .user-support img {
     width: 5rem;
     height: 5rem;
     border-radius: 50%;
     border: 2px rgba(248, 121, 1, 0.705) solid;
 }
 .content-part .user-support .user-btn {
    width: 60%;
    display: inline-block;
    padding-top: 8px;
    padding-bottom: 8px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 20px;
    background-color: rgba(248, 121, 1, 0.705);
    font-size: 1.2rem;
 }
 .content-part .user-support .des {
     color: gray;
     font-size: 0.1rem;
 }
 /* .comment-normal {
     position: relative;
     top: 60px;
     width: 100%;

 } */
 .comment-normal .title,
 .comment-part .comment-hot .title {
     font-weight: bold;
     font-size: 1.2rem;
 }
 .comment-normal .comment-floor,
 .comment-part .comment-hot .comment-floor {
     display: flex;
     flex-direction: row;
     position: relative;
 }

  .comment-normal .comment-floor .hair,
 .comment-part .comment-hot .comment-floor .hair {
     position: absolute;
     z-index: 9;
     width: 4.1em;
     height: 4em;
     left: -0.5em;
 }
 .comment-normal .comment-floor .image,
 .comment-part .comment-hot .comment-floor .image {
     border-radius: 50%;
     position: relative;
     top: 1em;
     z-index: 8;
     width: 3em;
     height: 3em;
 }
 .comment-normal .comment-floor .box,
 .comment-part .comment-hot .comment-floor .box {
     width: 100%;
     padding-left: 15px;
     padding-bottom: 15px;
 }
 .comment-floor .box .user-name {

     overflow: hidden;
 }
 .comment-floor .box .user-name .left {
     float: left;
     color:gray;
 }
 .comment-floor .box .user-name .right {
     float: right;
     color: gray;
 }
.comment-floor .box .follow-text {
    background-color: rgb(220, 220, 220);
    padding: 5px 5px;
}
.comment-floor .box .user-function {
    overflow: hidden;   
}
.comment-floor .box .user-function .left {
    float: left;
    color:gray;
}
.comment-floor .box .user-function .right {
    float: right;
    color: gray;
}
.comment-part {
    padding:5px 2px;
}
.mint-loadmore {
    overflow: visible;
    height: 100%;
}
</style>

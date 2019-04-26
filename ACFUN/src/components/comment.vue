<template>
    <div class="comment">
        <div class="NavBar"> 
            <div class="back-icon" @click="back">
                <img src="../assets/icon-back-white.svg">
            </div>
            <div class="title">
                评论
            </div>
        </div>
        <div class="comment-part" v-if="commentDataCan.length!=0">
            <div class="mian-title">
                <span class="title">全部评论 </span>
                <span class="num">{{commentDataLength}}</span>
            </div>
            <div class="user-part"  v-for="item in commentDataCan" :key="item.commentId">
                <div class="user-image">
                    <img class="head" :src="item.avatarImage" v-if="item.avatarImage">
                    <img class="icon" :src="item.headUrl[0].url">
                </div>
                <div class="user-text">
                    <div class="part1">
                        <div class="name">{{item.userName}}</div>
                        <div class="floor">#{{item.floor}}</div>
                    </div>
                    <div class="part2" v-html="item.content">
            
                    </div>
                    <div class="part3" v-if="!!subCommentsMapDataCan[item.commentId]">
                        <div class="follow-comment">
                            <div class="user-name">
                                {{subCommentsMapDataCan[item.commentId].subComments[0].userName}}:
                            </div>  
                            <div class="user-comment" v-html="subCommentsMapDataCan[item.commentId].subComments[0].content">

                            </div>
                        </div>
                    </div>
                    <div class="part4">
                        <div class="time">{{item.postDate}}</div>
                        <div class="btn">👍{{item.likeCount}}</div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            mainDataCan: [],
            commentDataCan: [],
            commentDataLength: 0,
            subCommentsMapDataCan: {}
        }
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            if (parseInt(to.params.id) !== parseInt(vm.id)) {
                // console.log(to.params.id)
                vm.getData(to.params.id)
            }
        })
    },
    methods: {
        back () {
           this.$router.go(-1) 
        },
        getData (typeID) {
            // console.log(typeID)
            this.$axios.get("/comment/rest/app/comment/list?access_token=&app_version=5.7.0&count=20&market=appstore&origin=ios&pcursor=0&resolution=640x960&showHotComments=1&sourceId=" + typeID +"&sourceType=2&sys_name=ios&sys_version=8.4")
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                // console.log(err)
                // this.mainDataCan = err.subCommentsMap
                this.commentDataCan = err.data.rootComments
                this.commentDataLength = err.data.commentCount
                this.subCommentsMapDataCan = err.data.subCommentsMap
                // console.log(this.subCommentsMapDataCan['698113'])
            })
        }
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
    background-color: rgb(215, 25, 25);
    /* display: flex;
    flex-direction: row; */
    text-align: center;
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
 .NavBar .title {
     display: inline-block;
     /* margin: 0 auto; */
     color: #fff;
     font-size: 19px;
     line-height: 50px;
  }
  .comment {
      position: relative;
      width: 100%;
      min-height: 100%;
      background: #fff;
  }
  .comment-part {
     top: 60px;
     position: relative;
     color: black;
     z-index: 3;
     /* height: 1000px; */
     width: 100%;
     padding-left: 10px;
     padding-right: 10px;
 }
 .mian-title .title {
     font-weight: bold;
     font-size: 18px;
 }
 .mian-title .num {
     font-size: 18px;
 }
 .user-part {
     display: flex;
     flex-direction: row;
     margin-top: 20px;
     border-bottom: 1px gray solid;
     border-bottom-width: 60%;
 }
 /* .user-image img {
     position: relative;
 } */
 .user-image .head {
     width: 60px;
     height: 60px;
     position: absolute;
     left: 5px;
 }
 .user-image .icon {
     width: 50px;
     height: 50px;
     border-radius: 50%; 
     top: 15px;   
     position: relative;
 }
 .user-text {
     padding-left: 10px;
     padding-right: 10px;
     width: 100%;
     margin-top: 5px;

 }
 .part1 {
    display: flex;
    flex-direction: row;
 }
 .part4 {
    display: flex;
    flex-direction: row; 
 }
 .part2 {
     color: black;
     white-space: pre-line;
 }
 .part3 {
     background-color: gray;
     padding: 5px 5px;
 }
 .part1 .floor {
     text-align: right;
     width: 50%;
     font-size: 15px;
     color: grey;
 }
 .part1 .name {
     width: 50%;
     font-size: 15px;
     color: grey;
 }
 .part4 .time {
     width: 50%;
     font-size: 15px;
     color: grey;
 }
 .part4 .btn {
     text-align: right;
     width: 50%;
     font-size: 15px;
     color: grey;
 }
 .follow-comment .user-comment {
     white-space: pre-line;
 }
 
</style>

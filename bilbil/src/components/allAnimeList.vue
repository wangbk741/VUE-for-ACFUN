<template>
    <div class="allAnimeList">
        <div class="NavBar"> 
            <div class="back-icon" @click="back">
                <img src="../assets/icon-back-white.svg">
            </div>
            <div class="title">
                全部视频
            </div>
        </div>

         <div class="title-list" v-if="mainDataCan.length!=0">
                <mu-flexbox wrap="wrap" justify="space-around" class="box" :gutter="0">
                        <mu-flexbox-item basis="40%" class="list-item" v-for="item in mainDataCan" :key="item.videoId">
                            <div class="animepage-name">{{item.title}}</div>
                        </mu-flexbox-item>
                </mu-flexbox>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            mainDataCan: []
        }
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            if (parseInt(to.params.id) !== parseInt(vm.id)) {
                // console.log(to.params.id)
                vm.typeID = to.params.id
                vm.getData(to.params.id)
            }
        })
    },
    methods: {
        back () {
           this.$router.go(-1) 
        },
        getData (resID) {
            this.$axios.get("/api/v3/bangumis/video?albumId=" + resID +"&groupId=32666&pageNo=1&pageOrder=0&pageSize=50")
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err.data)
                this.mainDataCan = err.data.vdata.list
                this.isloading = false
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
    background-color:rgb(215, 25, 25);
    /* display: flex;
    flex-direction: row; */
    text-align: center;
 }
 .NavBar .title {
     display: inline-block;
     /* margin: 0 auto; */
     color: #fff;
     font-size: 19px;
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
  .allAnimeList {
      position: absolute;
      width: 100%;
      min-height: 100%;
      background: #fff;
  }
  .allAnimeList .title-list {
      position: relative;
      top: 60px;
      display: flex;
      flex-direction: row;
  }

  .animepage-name {
      width: 90%;
      margin-top: 12px;
      margin-left: 8px;
      padding: 5px 5px;
      border: 1px solid rgb(220, 220, 220);
      border-radius: 5px;
      height: 28px;
      background-color: rgb(220, 220, 220);
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
  }
  
</style>

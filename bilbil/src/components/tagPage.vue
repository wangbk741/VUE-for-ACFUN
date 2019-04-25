<template>
    <div class="tagPage">
        <div class="NavBar"> 
            <div class="back-icon" @click="back">
                <img src="../assets/icon-back-white.svg">
            </div>
            <div class="title" v-if="titleName">
                {{titleName}}
            </div>
        </div>
        <div class="content-list" v-if="mainDataCan.length!=0">
            <div class="box" v-for="item in mainDataCan" :key="item.id" @click="jump(item.id)">
                <img class="pic" :src="item.coverImageV">
                <div class="content">
                    <div class="title-name">
                        <div class="title">
                            {{item.title}}
                        </div>
                        <div class="updataIcon">
                            {{item.status | listenStatus}}
                        </div>
                    </div>
                    <div class="star">
                        {{item.avgScore | listenStar}}
                    </div>
                    <div class="updata">
                        {{item.lastVideoName}}
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
            titleName: '',
            mainDataCan: []
        }
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            if (parseInt(to.params.id) !== parseInt(vm.id)) {
                // console.log(to.params.name)
                
                vm.titleName = to.params.name
                vm.getData(to.params.id)
            }
        })
    },
    methods: {
        back () {
            this.$router.go(-1)
        },
        getData (resID) {
            this.$axios.get("/api/v3/bangumis/tags?app_version=5.7.0&market=appstore&origin=ios&pageNo=1&pageSize=20&resolution=640x960&sys_name=ios&sys_version=8.4&tagId=" + resID)
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                // console.log(err.data)
                this.mainDataCan = err.data.vdata.list
            })
        },
        jump (param) {
            this.$router.push({name: 'pageamine', params: {id: param}})
        }
    },
    filters: {
        listenStatus: status => {
            if(status==0){
                return '完结'
            }else if (status==1){
                return '更新'
            }
        },
        listenStar: star => {
            switch (star) {
                case 1:
                    return '✨'
                    break;
                case 2:
                    return '✨✨'
                    break;
                case 3:
                    return '✨✨✨'
                    break;
                case 4:
                    return '✨✨✨✨'
                    break;
                case 5:
                    return '✨✨✨✨✨'
                    break;
                default:
                    break;
            }
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
  
  .tagPage {
      position: absolute;
      width: 100%;
      min-height: 100%;
      background: #fff;
  }
  .content {
      width: 100%;
      padding-left: 5px;
  }
  .content-list {
      position: relative;
      top: 60px;
      margin-left: 10px;
  }
  .content-list .box {
      display: flex;
      flex-direction: row;
  }
  .content-list .box .pic {
      width: 40px;
      height: 65px;
      padding-bottom: 5px;
      padding-top: 5px;
  } 
  .content .title-name {
      display: flex;
      flex-direction: row;
  }
  .content .title-name .title {
      font-weight: bold;
      font-size: 14px;
      width: 50%;
      padding-top: 5px;
  }
  .content .title-name .updataIcon {
      width: 50%;
      text-align: right;
  }
  .updata {
      border-bottom:1px gray solid;
      font-size: 12px;
      color: gray;
  }
  .content .star {
      overflow: hidden;
      width: 100px;
  }
</style>


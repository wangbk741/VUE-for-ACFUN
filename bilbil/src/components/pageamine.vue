<template>
    <div class="main-view">
        <div class="NavBar" id="Bar" :style="{background:background}"> 
            <div class="back-icon" @click="back">
                <img src="../assets/icon-back-white.svg" v-show="opacity!=0">
            </div>
            <div class="title">
                {{mainDataCan.title}}
            </div>
        </div>
        <div class="bg-view"  v-if="mainDataCan.length!=0">
            <img :src="mainDataCan.coverImageV">
        </div>

        <div class="playlist-holder" v-if="mainDataCan.length!=0">
            <div class="holder-top">
                <div class="mian-title">
                    <div class="name">{{mainDataCan.title}}</div>
                    <div class="">简介></div>
                </div>
                <div class="detail">
                    <div class="playNum">播放:{{mainDataCan.viewsCount}}</div>
                    <div class="watchNum">追番:{{mainDataCan.stowCount}}</div>
                    <div class="upDateTime">追番:{{mainDataCan.updateContent}}</div>
                </div>
                <div class="function">
                    <div class="comment" @click="jump('comment','')">
                        评论:{{mainDataCan.comments}}
                    </div>
                </div>
            </div>
            <div class="holder-bottom">
              <div class="enterList">
                    <mu-flexbox wrap="wrap" justify="space-around" class="box" :gutter="0">
                        <mu-flexbox-item basis="45%" class="list-item" :key="item.videoId" v-for="item in nameTitleCan">
                            <div class="animepage-name">{{item.title}}</div>
                        </mu-flexbox-item>
                    </mu-flexbox>
                 <div class="findAll" @click="allList">
                     查看全部>
                 </div>
              </div>
              <div class="tagArea">
                  <div class="title">
                      相关标签
                  </div>
                  <div class="tag">
                      <div v-for="item in tagDataCan[0]" :key="item.id" @click="jump('tagPage',item.id,item.name)">{{item.name}}</div> 
                      <br>
                      <div v-for="item in tagDataCan[1]" :key="item.id" @click="jump('tagPage',item.id,item.name)">{{item.name}}</div>
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
            isloading: false,
            mainDataCan: [],
            tagDataCan: [],
            nameTitleCan: [],
            value: 0,
            opacity: 0,
            typeID: 0
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
  
    created:function () {
        let that = this
        window.onscroll = function () {
            if (document.getElementById('Bar')) {
                that.opacity = window.pageYOffset / document.getElementById('Bar').offsetHeight
                // console.log(that.opacity)
            } else {
                that.opacity = 0
                // console.log(that.opacity)
            }
        }
    },
    methods: {

        back () {
           this.$router.go(-1) 
        },
        getData (nameID) {
            this.loading = true
            this.$axios.get("/api/v3/bangumis/" + nameID +"?channelId=0&app_version=5.7.0&market=appstore&origin=ios&resolution=640x960&sys_name=ios&sys_version=8.4")
            .then(res=>{
                // console.log(res)
            })
            .catch(err=>{
                // console.log(err.data.vdata)
                this.mainDataCan = err.data.vdata
                this.tagDataCan = this.getTagArr(err.data.vdata.tags)
                this.nameTitleCan = err.data.vdata.videoGroupContent[0].list
                // console.log(this.nameTitleCan)
                this.isloading = false
            })
        },
        getTagArr (data) {
            var count = data.length
            var arr1 = []
            var arr2 = []
            for (var i = 0; i<3;i++){
                arr1.push(data[i])
            }
            for (var i = 3;i<data.length;i++){
                arr2.push(data[i])
            }
            var arr3 = []
            arr3.push(arr1)
            arr3.push(arr2)
            return arr3
        },
        change (val) {
            this.value = val
        },
        jump (type,data,des) {
            // console.log(this.typeID)
             switch (type) {
                 case 'comment':
                     this.$router.push({name: 'comment', params: {id: this.typeID}})
                     break;
                 case 'tagPage':
                     this.$router.push({name: 'tagPage', params: {id: data,name: des}})
                     break
                 default:
                     break;
             }
        },
        allList () {
            this.$router.push({name: 'allAnimeList', params: {id: this.typeID}})
        }
    },
    computed: {

      background: function () {
        // console.log(this.opacity)
        return 'rgba(215, 25, 25, '+ this.opacity + ')'
      }

    },
    destroyed () {
       console.log('pageover')
   }
}
</script>

<style scoped>
 
 .NavBar {
    position: fixed;
    height: 50px;
    width: 100%;
    max-width: 68vh;
    z-index: 10;
    text-align: center;
 }
 .bg-view{
     position: fixed;
     width: 100%;
     height: 500px;
 }
 .bg-view img {
     width: 100%;
     height: 100%;
 }
 
 .playlist-holder {
     position: absolute;
     top: 300px;
     z-index: 3;
     /* height: 1000px; */
     width: 100%;

 }

  .main-view {
      position: absolute;
      width: 100%;
      min-height: 100%;
      background: #fff;
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
  .holder-top {
      display: flex;
      flex-direction: column;
      background: transparent;
      /* background-color:rgba(255,255,255,0.15); */
      color: #fff;
      padding-left: 15px;
      padding-right: 15px;
  }
  .holder-top .mian-title {
      display: flex;
      flex-direction: row;
  }
  .holder-top .detail {
      display: flex;
      flex-direction: row;
  }
  .holder-top .detail div {
      width: 33%;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
  }
  .NavBar .title {
     display: inline-block;
     /* margin: 0 auto; */
     color: #fff;
     font-size: 19px;
     line-height: 50px;
  }
  .findAll {
      text-align: center;
      color: red;
  }
  .tagArea {
      padding-left: 10px;
      padding-right: 10px;
  }
  .tagArea .title {
      font-size: 20px;
      font-weight: bold;
  }

  .tagArea .tag div {
        line-height: 40px;
        padding: 5px 15px;
        margin-right: 20px;
        display: inline;
        border: 0.5px solid gray;
        border-radius: 10px;
  }
  .holder-bottom {
      background-color: #fff;
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

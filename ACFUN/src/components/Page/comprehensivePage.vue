<template>
        <div class="comprehensivePage"  >
            <div class="inner" ref="mainBox">
                <div class="NavBar" id="Bar" :style="{background:background}"> 
                    <div class="back-icon" @click="back">
                        <img src="../../assets/icon-back-white.svg">
                    </div>
                    <div class="title">
                        AC{{this.ACid}}
                    </div>
                </div>
                <div class="view-part" v-if="comprehensiveDataCan.length!=0">
                    
                    <div class="mask-view">
                        <span>{{comprehensiveDataCan.title}}</span>
                    </div>
                    
                    <div class="white-view">
                        <div class="inner-box">
                            <span>更新于:{{comprehensiveDataCan.lastUpdateTime | changeTime}}</span><br>
                            <span>收藏:{{comprehensiveDataCan.visit.stows}}</span><br>
                            <span>共{{comprehensiveDataCan.contentSize}}个稿件</span>
                        </div>
                        <div class="white-view-bottom">
                            <span >{{comprehensiveDataCan.intro}}</span>
                        </div>
                        <div class="btn-part">
                            <span>收藏</span>
                            <span>分享</span>
                        </div>
                    </div>
                    <img class="big-image" :src="comprehensiveDataCan.cover">
                    <div class="line-part"></div>
                    <div class="up-view">
                        <img :src="comprehensiveDataCan.owner.avatar">
                        <div class="text-part">
                            <div class="usename">{{comprehensiveDataCan.owner.name}}</div>
                            <div class="des">{{comprehensiveDataCan.owner.signature}}</div>
                            <div class="helper"></div>
                        </div>
                    </div>
                    
                </div > 
                <div class="nextview-part"  :class="{'is_fixed': isFixed}"> 
                    <mu-tabs :value="activeTab"  @change="handleTabChange">
                    <mu-tab :value="index"  :title="item" v-for="(item,index) in titleDataArr" :key="index"/>
                    </mu-tabs>
    
                    <div class="slider-view"  id="viewBox" ref="viewBox">
                        <div v-for="item in groupsDataCan[groupIndex]" >{{item.subtitle}}</div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
export default {
    data () {
        return {
            comprehensiveDataCan: [],
            groupsDataCan: [],
            groupIndex: 0,
            titleDataArr: [],
            loading: false,
            question: '',
            dataEnd: false,
            ACid: '',
            activeTab: 0,
            isFixed: false,
            opacity: 0
        }
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            vm.getData(to.params.id)
            vm.question = to.params.id
        })
    },
    methods: {
       getData (data) {
            this.ACid = this.getACiD(data) 
            if (!this.loading){
            this.loading = true
//https://apipc.app.acfun.cn/v3/album/5007988?app_version=5.7.0&market=appstore&origin=ios&resolution=640x960&sys_name=ios&sys_version=8.4
            this.$axios.get("/article/v3/album/" + this.ACid + "?app_version=5.7.0&market=appstore&origin=ios&resolution=640x960&sys_name=ios&sys_version=8.4")
                .then(res=>{
                    // console.log(res)
                    this.loading = false
                })
                .catch(err=>{
                    // console.log(err.data.vdata.groups[0].contents)
                    this.comprehensiveDataCan = err.data.vdata
                    var groupNum = err.data.vdata.groups.length
                    // this.groupsDataCan.push(err.data.vdata.groups)
                    for (var i=0;i<groupNum;i++){
                        // console.log(this.groupsDataCan)
                        // console.log(err.data.vdata.groups[i].contents)
                        this.groupsDataCan.push(err.data.vdata.groups[i].contents)
                        this.titleDataArr.push(err.data.vdata.groups[i].groupName)
                    }
                    // console.log(this.groupsDataCan)
                    this.loading = false
                })
           }
       },
       getACiD (id) {
           var num = id.substr(2,id.length-1)
           return num
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
        back () {
            this.titleDataArr = []
            this.groupsDataCan = []
            this.$router.go(-1) 
        },
        handleTabChange (val) {
            this.activeTab = val
            this.groupIndex = val
        }
    },
    filters: {
        changeTime: time => {
            let date = new Date(time);
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
    mounted(){
        this.box = this.$refs.viewBox
          // 监听这个dom的scroll事件
        this.box.addEventListener('scroll', () => {
            //滚动距离
            let scrollTop = this.$refs.viewBox.scrollTop
            
            let offsetTop = this.$refs.viewBox.offsetTop
            this.isFixed = scrollTop > 0 ? true : false;
            if(!this.isFixed){
                this.opacity = 0
            }else{
                this.opacity = 1
            }

            // console.log("scrollTop" + scrollTop)
            // console.log("offsetTop" + offsetTop)
 
        }, false)
        this.main = this.$refs.mainBox
        this.main.addEventListener('scroll', () => {
            console.log("mainBox" + this.$refs.mainBox.scrollTop)
        })
    },
    created:function () {
        let that = this
        window.onscroll = function () {
            
            if (document.getElementById('Bar')) {
                // console.log(that.isFixed)
                if(that.isFixed){
                    return
                }
                that.opacity = window.pageYOffset / document.getElementById('Bar').offsetHeight
            } else {
                that.opacity = 0
            }
        }
    },
    computed: {

      background: function () {
        // console.log(this.isFixed)
        return 'rgba(215, 25, 25, '+ this.opacity + ')'
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
  .comprehensivePage {
      position: absolute;
      width: 100%;
      min-height: 100%;
  }
  .view-part {
      width: 100%;
      height: 30rem;
      position: relative;
      border-bottom: 1px solid rgba(220, 220, 220, 1);
  }
  .slider-view {
      height: 30rem;
      width: 100%;
      overflow: auto;
  }
  .slider-view div {
      height: 2rem;
      line-height: 2rem;
      font-weight: bold;
      width: 100%;
      text-align: center;
      background-color: rgba(220, 220, 220, 0.5);
      margin: 10px 5px;
      overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
  }
 .mu-tabs {
     background-color: white;
     border-bottom: 1px solid rgba(220, 220, 220, 1);
 }
 .mu-tab-link {
     color: black;
 }
 .mu-tab-active {
     color: rgb(215, 25, 25);
 }
 .nextview-part {
     width: 100%;
     height: 100%;
     position: relative;
 }
 .is_fixed{
    position:fixed;
    top: 2.5rem;
    background-color: white;
    transition:all 0.5s;
  }
  .mask-view {
      width: 100%;
      background: rgba(220, 220, 220, 1);
      height: 11rem;
      position: relative;
  }
  .mask-view span {
      font-size: 1.2rem;
      color: white;
      position: absolute;
      top: 8rem;
      left: 6rem;
      font-weight: bold;
  }
  .white-view {
      width: 100%;
      background: white;
      height: 11rem;
      position: relative;
  }
  .line-part {
      position: relative;
      width: 100%;
      height: 2rem;
      background-color: rgba(220, 220, 220, 1);
  }
  .white-view .btn-part {
      display: flex;
      width: 100%;
      flex-direction: row;
  }
  .white-view .btn-part span {
      width: 50%;
      text-align: center;
  }
  .white-view .inner-box span {
      position: relative;
      font-size: 0.5rem;
      left: 5.8rem;
  }
  .white-view-bottom {
        margin: 1rem 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
  }
 
  .big-image {
      top: 7rem;
      left: 1rem;
      width: 4rem;
      height: 8rem;
      position: absolute;
      /* z-index: 1; */
  }
  .up-view {
      padding: 1rem 1rem;
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 5rem;
      width: 100%;
      background: white;
      position: relative;
  }
  .up-view .usename {
      font-weight: bold;
  }
  .up-view .des {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
        color: gray;
  }
  .up-view img {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
  }
</style>

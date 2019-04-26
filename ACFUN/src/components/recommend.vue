<template>
    <div class="recommend">
        <div class="loading-wrapper" v-if="isloading" >
          <div class="loading"></div>
          <div class="loading-txt">正在加载中</div>
      </div>
        <div class="banner-list" v-show="!isloading">
            <swiper :option='swiperOption'>
                <swiper-slide v-for="item in bannerData" :key="item.href">
                    <img :src="item.img[0]" class="banner-item"/>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper-slide>
            </swiper>
        </div>
        <div class="content-list">
            <div class="content-videos">
                <div class="rank_title" v-if="mainDataList.length!=0">
                    <img class="rank_title_img" :src="mainDataList[1].img">
                    <span class="rank_main_title">{{mainDataList[1].title}}</span>
                </div>
                <mu-flexbox wrap="wrap" justify="space-around" class="box" :gutter="0">
                    <mu-flexbox-item basis="40%" class="list-item" :key="item.href" v-for="item in videosData">
                        <img class="list-img img-response" :src="item.img[0]">
                        <div class="list-name">{{item.title}}</div>
                    </mu-flexbox-item>
                </mu-flexbox> 
            </div>
            <div class="connet-banner">
                <swiper :option='swiperOption'>
                    <swiper-slide v-for="item in connetBannerData" :key="item.id">
                        <img :src="item.img[0]" class="connet-banner-item"/>
                        <div class="swiper-pagination" slot="pagination"></div>
                    </swiper-slide>
                </swiper>
            </div>
            <div class="videos_rank">
                <div class="rank_title" v-if="mainDataList.length!=0">
                    <img class="rank_title_img" :src="mainDataList[3].img">
                    <span class="rank_main_title">{{mainDataList[3].title}}</span>
                    <span class="rank_h2_title">{{mainDataList[3].headerText[0].title}}</span>
                </div>
                <mu-flexbox wrap="wrap" justify="center" class="box" :gutter="0" orient="vertical">
                    <mu-flexbox-item class="list-item" :key="item.href" v-for="item in videosRankData">
                        <div class="rank_content_box">
                            <img class="videos_rank-img img-response" :src="item.img[0]">
                            <div class="videos-rank-title">
                                <div class="list-name">{{item.title}}</div>
                                <div class="banana-area">
                                    <div class="list-name">{{item.user.name}}</div>
                                    <div class="list-banana">{{item.visit.banana}}</div>
                                </div>
                            </div>
                        </div>
                    </mu-flexbox-item>
                </mu-flexbox> 
                <div class="all_rank_part" v-if="mainDataList.length!=0">
                    <span>{{mainDataList[3].bottomText.title}}→</span>
                </div>
            </div>

            <div class="all_web_ranks_banner" v-if="mainDataList.length!=0">
                <img :src="mainDataList[4].bodyContents[0].img[0]">
            </div>

            <div class="fun_part">
                <div class="fun_title" v-if="mainDataList.length!=0">
                    <img class="fun_title_img" :src="mainDataList[5].img">
                    <span class="fun_main_title">{{mainDataList[5].title}}</span>
                </div>
                <div class="big_banner_part" v-if="mainDataList.length!=0">
                    <img :src="mainDataList[5].topContent.img">
                    <span>{{mainDataList[5].topContent.title}}</span>
                    <div class="image-area">
                        <span class="message-detail">{{mainDataList[5].topContent.visit.views}} | {{mainDataList[5].topContent.visit.danmakuSize}}</span>
                    </div>
                </div>
                <div class="small_fun_part">
                    <mu-flexbox wrap="wrap" justify="space-around" class="box" :gutter="0">
                        <mu-flexbox-item basis="40%" class="list-item" :key="item.href" v-for="item in funDataList">
                            <img class="list-img img-response" :src="item.img[0]">
                            <div class="list-name">{{item.title}}</div>
                        </mu-flexbox-item>
                    </mu-flexbox>
                    <div class="function_area">
                        <div class="change_btn" @click="change_fun_content()">
                            换一换
                        </div>
                        <div class="enter_channel">
                            进入频道
                        </div>
                    </div>
                </div>
            </div>

            <div class="game_part">
                <div class="fun_title" v-if="mainDataList.length!=0">
                    <img class="fun_title_img" :src="mainDataList[7].img">
                    <span class="fun_main_title">{{mainDataList[7].title}}</span>
                </div>
                <div class="big_banner_part" v-if="mainDataList.length!=0">
                    <img :src="mainDataList[7].topContent.img">
                    <span>{{mainDataList[7].topContent.title}}</span>
                    <div class="image-area">
                        <span class="message-detail">{{mainDataList[7].topContent.visit.views}} | {{mainDataList[7].topContent.visit.danmakuSize}}</span>
                    </div>
                </div>
                <div class="small_fun_part">
                    <mu-flexbox wrap="wrap" justify="space-around" class="box" :gutter="0">
                        <mu-flexbox-item basis="40%" class="list-item" :key="item.href" v-for="item in gameDataList">
                            <img class="list-img img-response" :src="item.img[0]">
                            <div class="list-name">{{item.title}}</div>
                        </mu-flexbox-item>
                    </mu-flexbox>
                    <div class="function_area">
                        <div class="change_btn" @click="change_game_content()">
                            换一换
                        </div>
                        <div class="enter_channel">
                            进入频道
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="anime_part">
                <div class="fun_title" v-if="mainDataList.length!=0">
                    <img class="fun_title_img" :src="mainDataList[9].img">
                    <span class="fun_main_title">{{mainDataList[9].title}}</span>
                </div>
                <div class="big_banner_part" v-if="mainDataList.length!=0">
                    <img :src="mainDataList[9].topContent.img">
                    <span>{{mainDataList[9].topContent.title}}</span>
                    <div class="image-area">
                        <span class="message-detail">{{mainDataList[9].topContent.visit.views}} | {{mainDataList[9].topContent.visit.danmakuSize}}</span>
                    </div>
                </div>
                <div class="small_fun_part">
                    <mu-flexbox wrap="wrap" justify="space-around" class="box" :gutter="0">
                        <mu-flexbox-item basis="40%" class="list-item" :key="item.href" v-for="item in animeDataList">
                            <img class="list-img img-response" :src="item.img[0]">
                            <div class="list-name">{{item.title}}</div>
                        </mu-flexbox-item>
                    </mu-flexbox>
                    <div class="function_area">
                        <div class="change_btn" @click="change_anime_content()">
                            换一换
                        </div>
                        <div class="enter_channel">
                            进入频道
                        </div>
                    </div>
                </div>

                
            </div>

            <div class="animepage_part">
                <div class="fun_title" v-if="mainDataList.length!=0">
                    <img class="fun_title_img" :src="mainDataList[11].img" >
                    <span class="fun_main_title">{{mainDataList[11].title}}</span>
                </div>
                <div class="big_banner_part" v-if="mainDataList.length!=0">
                    <img :src="mainDataList[11].topContent.img" @click="jump(mainDataList[11].topContent.href,mainDataList[11].topContent.action)">
                    <span>{{mainDataList[11].topContent.title}}</span>
                    <div class="animepage_image">
                        更新至<span class="message-detail">{{mainDataList[11].topContent.lastUpdate}}</span>
                    </div>
                </div>
                <div class="animepage_small_part">
                    <mu-flexbox wrap="wrap" justify="space-around" class="box" :gutter="0">
                        <mu-flexbox-item basis="30%" class="list-item" :key="item.href" v-for="item in animepageDataList">
                            <img class="animepage-img img-response" :src="item.img[0]">
                            <div class="animepage-name">{{item.title}}</div>
                            <div class="animepage_image">
                                更新至<span class="message-detail">{{item.lastUpdate}}</span>
                            </div>
                        </mu-flexbox-item>
                    </mu-flexbox>
                    <div class="function_area">
                        <div class="change_btn" @click="change_animepage_content()">
                            换一换
                        </div>
                        <div class="enter_channel">
                            进入频道
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    </div>
</template>
<script>
import api from '../api'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import Vue from 'vue'
var funDataIndex = 0
export default {
    data () {
        return {
            swiperOption: {
                pagination: '.swiper-pagination',
                paginationClickable: true
            },
            animepageDataList: [],
            animepageDataLenght: 0,
            animepageDataCan: [],
            animeDataList: [],
            animeDataLenght: 0,
            animeDataCan: [],
            gameDataList: [],
            gameDataLenght: 0,
            gameDataCan: [],
            funDataLenght: 0,
            funDataList: [],
            funDataCan: [],
            mainDataList: [],
            bannerData: [],
            videosData: [],
            connetBannerData: [],
            videosRankData: [],
            isloading: false
        }
    },
    components: {
        swiper,
        swiperSlide
    },
    created () {
        this.getData()
    },
    methods: {
        getDataList (data) {
            var mainArr = []
            var count = data.length/4 
            for (var i = 0;i<count;i++) {
                var arr = []
                for (var j=0;j<4;j++) {
                    arr.push(data[i*4 + j])
                }
                mainArr.push(arr)
            }
            return mainArr
        },
        getPageDataList (data) {
            var mainArr = []
            var count = data.length/6 
            for (var i = 0;i<count;i++) {
                var arr = []
                for (var j=0;j<6;j++) {
                    arr.push(data[i*6 + j])
                }
                mainArr.push(arr)
            }
            return mainArr
        },
        getData () {
            this.loading = true
            this.$axios.get("api/v3/regions?channelId=0&app_version=5.7.0&market=appstore&origin=ios&resolution=640x960&sys_name=ios&sys_version=8.4")
            .then(res=>{

            })
            .catch(err=>{
                this.mainDataList = err.data.vdata
                this.videosData = err.data.vdata[1].bodyContents
                this.bannerData = err.data.vdata[0].bodyContents
                this.connetBannerData = err.data.vdata[2].bodyContents
                this.videosRankData = err.data.vdata[3].bodyContents
                this.funDataLenght = err.data.vdata[5].bodyContents.length
                this.funDataCan = this.getDataList(err.data.vdata[5].bodyContents)
                this.funDataList = this.funDataCan[0]
                
                this.gameDataLenght = err.data.vdata[7].bodyContents.length
                this.gameDataCan = this.getDataList(err.data.vdata[7].bodyContents)
                this.gameDataList = this.gameDataCan[0]

                this.animeDataLenght = err.data.vdata[9].bodyContents.length
                this.animeDataCan = this.getDataList(err.data.vdata[9].bodyContents)
                this.animeDataList = this.animeDataCan[0]

                this.animepageDataLenght = err.data.vdata[11].bodyContents.length
                this.animepageDataCan = this.getPageDataList(err.data.vdata[11].bodyContents)
                this.animepageDataList = this.animepageDataCan[0]
                this.isloading = false
            })
        },
        
        loadMore () {
            this.getData()
        },
        change_fun_content () {
   
            funDataIndex = funDataIndex + 1
            this.funDataList = this.funDataCan[funDataIndex]
            if (funDataIndex == this.funDataCan.length-1){
                funDataIndex = -1
            }
        },
        change_game_content () {
   
            funDataIndex = funDataIndex + 1
            this.gameDataList = this.gameDataCan[funDataIndex]
            if (funDataIndex == this.gameDataCan.length-1){
                funDataIndex = -1
            }
        },
        change_anime_content () {
   
            funDataIndex = funDataIndex + 1
            this.animeDataList = this.animeDataCan[funDataIndex]
            if (funDataIndex == this.animeDataCan.length-1){
                funDataIndex = -1
            }
        },
        change_animepage_content () {
   
            funDataIndex = funDataIndex + 1
            this.animepageDataList = this.animepageDataCan[funDataIndex]
            if (funDataIndex == this.animepageDataCan.length-1){
                funDataIndex = -1
            }
        },
        jump (href, action) {
            // console.log(href)
            // console.log(action)
            this.$router.push({name: 'pageamine', params: {id: href}})
        }
    },
    mounted: function () {
        window.canvasdom = this
    }
}
</script>


<style scoped>
.list-bar {
      position: absolute;
      top: 0;
      left: 0;
      color: #fff;
      width: 100%;
      text-align: right;
      padding: 2px 5px;
      background-color: rgba(0,0,0,.2); 
}
.list-img {
    width: 9rem;
    height: 5rem;
}
.videos_rank {
    padding: 0px 10px;
}
.content-list {
    padding: 0px 10px;
}
.videos_rank-img {
    width: 8rem;
    height: 5rem;

}
.banana-area {
    display: flex;
    flex-direction: row;
}
.banana-area .list-banana {
    width: 50%;
    color: black;  
    overflow: hidden;
    text-align: right; 
    margin-top: 10px;
    -webkit-line-clamp: 1;
    padding-right: 15px;
    /* margin-left: 12px;     */
}
.banana-area .list-name {
    width: 50%;
    overflow: hidden;
    text-align: left;
    -webkit-line-clamp: 1;
    /* margin-right: 12px;  */
}
.videos-rank-title {
    display: flex;
    flex-direction: column;
}
.videos-rank-title .list-name {
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    text-align: left;
    overflow: hidden;
}
.rank_content_box {
    display: flex;
    flex-direction: row;
    padding-top: 10px;
}
.list-item {
    text-align: center;
}
.list-name {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

  .banner-item {
    width: 100%;
    height: 8.0rem;
    /* background: url('../../static/banner-item-load.png') no-repeat;
    background-size: cover; */
  }
  .connet-banner-item {
    width: 100%;
    height: 8.0rem;
  }
  
  .recommend {
      overflow: hidden;
  }
  .rank_title_img {
      width: 20px;
      height: 20px;
  }
  .rank_main_title {
      font-size: 20px;
      line-height: 20px;
      font-weight: bold;
  }
  .rank_h2_title {
      float: right;
      line-height: 30px;
  }
  .all_rank_part {
      width: 100%;
      color: red;
      text-align: center;
  }
  .all_web_ranks_banner img{
      width: 100%;
  }
  .fun_title_img {
      width: 20px;
      height: 20px;    
  }
  .fun_main_title {
      font-size: 20px;
      line-height: 20px;
      font-weight: bold;  
  }
  .big_banner_part img{
      width: 100%;
  }

  .image-area {
      position: relative;
      width: 100%;
      background-color: yellow;
      top: -48px;
  }
  .function_area {
     display: flex;
     flex-direction: row;
  }
  .function_area .change_btn {
      text-align: center;
      width: 50%;
  }
  .function_area .enter_channel {
      text-align: center;
      width: 50%;
  }
  .animepage-img {
      width: 6rem;
      height: 8rem;
  }
  .animepage-name {
      font-size: 15px;
      height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
  }
  .animepage_image {
      color: grey;
      text-align: left;
  }
  .message-detail {
      color: red;
  }
</style>


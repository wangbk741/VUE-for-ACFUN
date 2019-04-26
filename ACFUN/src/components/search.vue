<template>
    <div class="search">
        <div class="search-part">
            <div class="search-input">
                <img src="./../assets/icon-search.png" alt="搜索">
                <form @submit.prevent="search(key)">
                <input class="from-text" type="text"
                        placeholder="AC号"
                        v-model="key"
                        @focus="focus()">
                </form>
            </div>
            <div class="search-cancel"
                :class="{ 'search-cancel-show' : searchShow }"
                @touchend.prevent="searchCancel()"
                @click.prevent="searchCancel()">
                取消
            </div>
        </div>
        <div class="hot-title">
            热门搜索
        </div>
        <div class="hotkey-part" v-if="searchHotkeyData.length!=0">
            <div class="key-part-box" v-for="(item, index) in mainKeyData">
                <p v-for="title in mainKeyData[index]" @click="jump(title)">{{title}}</p>
            </div>
        </div>
        <div class="line">

        </div>
        <div class="history-key"
                :class="{'search-Done': searchDone}"
                v-if="searchRes==null">
            <div class="search-history">
                <div class="search-history-item" v-for="item in searchHistory" :key="item" @click="search(item)">{{item}}</div>
            </div>
        </div>
        <div class="clean-part" @click="clean()" v-show="searchHistory.length!=0">
            清空搜索记录
        </div>
    </div>
</template>
<script>
//https://apipc.app.acfun.cn/v2/hotwords?app_version=5.7.0&market=appstore&origin=ios&resolution=640x960&sys_name=ios&sys_version=8.4
export default {
    data () {
        return {
            key: '',
            searchShow: false,
            hotkey: null,
            searchRes: null,
            searchHistory: [],
            searchDone: false,
            searchHotkeyData: [],
            mainKeyData: []
        }
    },
    created () {
        this.getData()
        // console.log('search')
    },
    methods: {
        searchCancel () {
            this.searchShow = false
            this.key = ''
            this.searchRes = null
            this.searchDone = false
            // this.$emit('searchhide')
            this.$router.go(-1)
        },
        focus () {
            this.searchShow = true
            // this.$emit('searchshow')
        },
        search (key) {
            var index = this.searchHistory.indexOf(key)
            if (index !== -1) {
            this.searchHistory.splice(index, 1)
            }
            this.searchHistory.unshift(key)
            this.searchHistory = this.searchHistory.slice(0, 10)
            localStorage.searchHistory = JSON.stringify(this.searchHistory)
            this.searchDone = true
            // console.log(this.searchHistory)
        },
        getData () {
            this.$axios.get("api/v2/hotwords?app_version=5.7.0&market=appstore&origin=ios&resolution=640x960&sys_name=ios&sys_version=8.4")
            .then(res=>{

            })
            .catch(err=>{
                this.searchHotkeyData = err.data.vdata
                this.parseData()
                // console.log(err.data.vdata)
            })
        },
        parseData () {
            var arr = []
            var lengthCount = 0
            for (var i = 0;i<this.searchHotkeyData.length;i++){
                var lengt = this.searchHotkeyData[i].value
                lengthCount = lengthCount + lengt.length
                arr.push(this.searchHotkeyData[i].value)
                if (lengthCount>=16||i==this.searchHotkeyData.length-1){
                    // console.log(i)
                    this.mainKeyData.push(arr)
                    arr = []
                    lengthCount = 0
                    // console.log(this.mainKeyData)
                }
            }
        },
        clean () {

        },
        jump (data) {
            this.$router.push({name: 'searchResult', params: {title: data}})
        }
    }
}
</script>
<style  scoped>
.search {
    position: absolute;
    width: 100%;
    min-height: 100%;
    background-color: #eee;
}
.search-part {
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    position: fixed;
    top: 0;
    background: rgb(225, 25, 25);
    z-index: 10;
  }
.search-input {
    width: 100%;
    border-radius: 5px;
    margin: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.search-input .from-text {
    padding-left: 30px;
}
.search-input img {
    position: absolute;
    height: 30px;
    width: 30px;
}
  .search-input form,
  .search-input input {
    width: 100%;
    height: 100%;
    border: none;
    background: #eee;
    font-size: medium;
    flex-grow: 1;
    border-radius: 5px;
    outline: none;
  }
.search-cancel {
    height: 40px;
    width: 0px;
    margin: 10px auto;
    line-height: 40px;
    overflow: hidden;
    transition: width 0.3s;
    cursor:pointer;
    color: #fff;
}
.search-cancel-show {
    width: 55px;
}
.hotkey-part {
    top: 70px;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #eee;
    z-index: 9;
    display: flex;
    flex-direction: column;
}

.key-part-box p {
    float: left;
    margin: 5px 5px;
    border: 0.5px gray solid;
    padding: 5px 5px;
}
.search-Done {
   display: none;    
 }
 .history-key {
    top: 70px;
    position: relative;
    background: #eeeeee;
    display: flex;
    flex-direction: column;
    z-index: 10;
 }
 .line {
     top: 70px;
     position: relative;
     width: 100%;
     height: 1px;
     background-color: gray;
     z-index: 10;
 }
 .hot-title {
     top: 70px;
     position: relative;
     font-size: 20px;
     line-height: 30px;
 }
 .search-history {
     font-size: 18px;
     margin: 0px 10px;
 }
 .clean-part{
     position: relative;
     top: 70px;
     color: red;
     text-align: center;
     z-index: 10;
 }
</style>

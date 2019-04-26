<template>
    <div class="SRamine">
        <span>asdasdasdasdas<br>adsd<br>sad<br>ASda</span>
    </div>
</template>
<script>
export default {
    data () {
        return {
            animeDataCan: []
        }
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
                vm.getData(to.params.data)
        })
    },
    methods: {
       getData (data) {
                // this.mianVideoData = data
                // console.log(data)
                // this.videoCount = "视频" + this.getCount(data.page.videoCount)
                this.animeDataCan = data.page.ai
                // this.animeCount = "番剧" + this.getCount(err.data.data.page.aiCount)
                // this.articleCount = "文章" + this.getCount(err.data.data.page.greenCount)
                // this.comprehensiveCount = "合辑" + this.getCount(err.data.data.page.spCount)
                // this.UPCount = "UP主" + this.getCount(err.data.data.page.userCount)
            
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
    }
}
</script>
<style scoped>
.SRamine {
    width: 100%;
    min-height: 100%;
    position: absolute;
    top: 110px;

}
</style>


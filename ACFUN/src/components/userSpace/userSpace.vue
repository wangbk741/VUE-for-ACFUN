<template>
    <div class="userSpace">
        <div class="NavBar" id="Bar" > 
            <div class="back-icon" @click="back">
                <img src="../../assets/icon-back-white.svg">
            </div>
            <div class="title">
                AC
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            userId: '',
            loading: false,
            mainDataCan: [],
            mainDataCount: 0
        }
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            vm.getData(to.params.id)
            vm.userId = to.params.id
            console.log(vm.userId)
        })
    },
    created () {
        // this.userId = this.$route.params.id
        // // console.log(this.userId)
        // this.getData(this.userId)
   },
    methods: {
        back () {
            this.$router.go(-1)
        },
        getData (data){
            if (!this.loading){
            this.loading = true
            this.$axios.get("/api/v2/user/content?app_version=5.7.0&market=appstore&origin=ios&pageNo=1&pageSize=20&resolution=640x960&sort=0&status=2&sys_name=ios&sys_version=8.4&type=0&userId=" + this.userId )
                .then(res=>{
                    this.loading = false
                })
                .catch(err=>{
                    console.log(err.data.vdata)
                    if(err.data.vdata.totalCount!=-1){
                        this.mainDataCan.push()
                    }
                    this.loading = false
                })
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
</style>

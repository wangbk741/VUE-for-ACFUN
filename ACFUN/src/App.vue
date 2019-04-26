<template>
  <div>
      <keep-alive>
          <router-view v-if="isRouterAlive"></router-view>
      </keep-alive>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isRouterAlive: true
    }
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  },
  computed: {
    ...mapGetters([
      'recommend',
      'anime',
      'live'
    ])
  }
}
</script>

<style>

</style>

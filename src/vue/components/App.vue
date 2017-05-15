<template>
  <div class="section">
    <div v-if="!isHome">
      <router-link class="button" to="/">Back</router-link>
      <hr>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    computed: {
      isHome () {
        return this.$route.path === '/'
      }
    }
  }
</script>

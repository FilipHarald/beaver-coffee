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
    },

    created() {
      this.getStores()
    },

    methods: {
      getStores() {
        this.$router.stores = fetch('/api/stores', { method: 'get' })
        .then(result => result.json())
        .then(json => Promise.resolve(json))
        .catch(err => console.log(err))
      }
    }
  }
</script>

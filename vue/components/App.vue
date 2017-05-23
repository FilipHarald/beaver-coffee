<template>
  <div class="section">
    <div v-if="!isHome">
      <div class="space-between">
        <router-link class="button" to="/">Back</router-link>
        <div>{{ this.$router.store && this.$router.store.name }}</div>
      </div>
      <hr>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Store from '../mixins/store'

  export default {
    data() {
      return {
      }
    },
    computed: {
      isHome() {
        return this.$route.path === '/'
      },
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

<style lang="stylus">
  .space-between
    display: flex
    justify-content: space-between
  .back-button
    background-color: #ffb0b0;
    float: right
</style>

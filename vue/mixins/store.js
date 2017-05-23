export default {
  data() {
    return {
      store: {}
    }
  },

  mounted() {
    if (!!this.$router.store)
      this.store = this.$router.store
    else
      this.$router.stores.then(res => this.$router.store = res[0])
  }
}

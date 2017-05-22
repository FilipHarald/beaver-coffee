export default {
  data() {
    return {
      store: null
    }
  },

  mounted() {
    if (this.$router.store != null)
      this.store = this.$router.store
    else
      this.$router.stores.then(res => this.store = res[0])
  }
}

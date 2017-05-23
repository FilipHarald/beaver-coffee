export default {
  methods: {
    checkValidity(c, key) {
      if (c[key] === Object(c[key]))
        return Object.keys(c[key]).every(k => this.checkValidity(c[key], k))
      else if (Array.isArray(c[key])) {
        return c[key].every(i => Object.keys(i).every(kk => this.checkValidity(i, kk)))
      }
      else
        return c[key] != ''
    }
  }
}

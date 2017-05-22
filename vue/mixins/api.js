export default {
  methods: {
    api (method, url, body) {
      return fetch(url, { method, body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })
    }
  }
}

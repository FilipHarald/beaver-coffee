export default {
  methods: {
    api (method, url, body) {
      if (method == 'get') {
        return fetch(url, {method, headers: { 'Content-Type': 'application/json' } })
      } else {
        return fetch(url, { method, body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })
      }
    }
  }
}

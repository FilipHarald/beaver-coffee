<template>
  <div>
    <h1 class="title">Select a store</h1>
    <div class="select is-fullwidth">
      <select v-model="selectedStore" @change="setStore">
        <option v-for="store in stores" :key="store._id" :value="store._id">{{ store.name }}</option>
      </select>
    </div>

    <hr>

    <h1 class="title">Day-to-day</h1>
    <div class="field"><router-link to="/add_order" class="button is-primary">Add new order</router-link></div>
    <div class="field"><router-link to="/add_customer" class="button is-info">Add new customer</router-link></div>
    <div class="field"><router-link to="/generate_report" class="button is-warning">Generate new report(s)</router-link></div>

    <hr>

    <h1 class="title">Management</h1>
    <div class="field"><router-link to="/manage_stock" class="button is-default">Manage stock</router-link></div>
    <div class="field"><router-link to="/manage_customers" class="button is-default">Manage customer</router-link></div>
    <div class="field"><router-link to="/manage_employees" class="button is-default">Manage employees</router-link></div>

    <hr>

    <h1 class="title">Global</h1>
    <div class="field"><router-link to="/manage_products" class="button is-default">Manage products</router-link></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        selectedStore: null,
        stores: [],
      }
    },

    methods: {
      setStore () {
        this.$router.store = this.selectedStore
      }
    },

    created () {
      fetch('/api/stores', {
        method: 'get',
      })
      .then(result => {
        result.json().then(x => {
          this.stores = x

          this.selectedStore = this.stores[0]
        })
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
</script>

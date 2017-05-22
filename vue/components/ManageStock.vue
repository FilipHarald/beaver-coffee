<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header-title">Manage stock</div>
    </div>
    <div class="card-content">
      <div class="field">
        <label for="" class="label">Select a product</label>
        <div class="control">
          <span class="select is-fullwidth">
            <select v-model="selectedProduct">
              <option v-for="product in products" :key="product._id" :value="product">{{ product.name }}</option>
            </select>
          </span>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <div class="field">
            <label for="" class="label">ID</label>
            <input type="text" class="input control" v-model="selectedProduct._id">
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label for="" class="label">Name</label>
            <input type="text" class="input control" v-model="selectedProduct.name">
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <div class="field">
            <label for="" class="label">Unit</label>
            <input type="text" class="input control" v-model="selectedProduct.unit">
          </div>
        </div>
        <div class="column"></div>
      </div>

      <hr>

      <div class="columns">
        <div class="column">
          <button class="button is-danger is-fullwidth">Delete product</button>
        </div>
        <div class="column">
          <button class="button is-success is-fullwidth" @click="save">Save</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Store from '../mixins/store'

  export default {
    mixins: [Store],

    data() {
      return {
        selectedProduct: {},
        products: []
      }
    },

    created() {
      this.getProducts()
    },

    methods: {
      getProducts() {
        fetch('/api/products', { method: 'get' })
        .then(result => result.json())
        .then(productsJson => this.products = productsJson.filter(x => x.productType === 'Ingredient'))
        .catch(err => console.log(err))
      },

      save() {
        fetch(`/api/stores/${this.store._id}/products/${this.selectedProduct._id}`, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.selectedProduct)
        })
        .then(result => {
          if (!result.ok) {
            result.json().then(x => {
              this.errors = result.status < 500 ? x.message : x.errmsg
            })
          } else { this.reset() }
        })
        .catch(err => console.log(err))
      },
    }
  }
</script>
